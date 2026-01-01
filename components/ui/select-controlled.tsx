"use client"

import * as React from "react"
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type BaseProps<T> = {
    /** Search controlled by parent; you provide results via `items` */
    onSearch: (query: string) => void
    items: T[]
    isLoading?: boolean
    error?: string | null

    /** Identity + labeling */
    getId: (item: T) => string
    getLabel: (item: T) => string
    renderItem?: (item: T, selected: boolean) => React.ReactNode

    searchable?: boolean
    /** UI options */
    showPrompt?: boolean
    placeholder?: string
    searchMinChars?: number
    debounceMs?: number
    buttonClassName?: string
    popoverClassName?: string
    disabled?: boolean
}

type MultiProps<T> = BaseProps<T> & {
    mode?: "multiple"                // default
    value: T[]
    onChange: (next: T[]) => void
    /** Limit selection (multiple mode only) */
    maxSelected?: number
    onLimitReached?: (limit: number) => void
    /** How many chips to preview on the trigger */
    chipPreviewCount?: number
}

type SingleProps<T> = BaseProps<T> & {
    mode: "single"
    value: T | null | undefined
    onChange: (next: T | null) => void
}

export function SelectControlled<T>(props: SingleProps<T>): React.JSX.Element
export function SelectControlled<T>(props: MultiProps<T>): React.JSX.Element
export function SelectControlled<T>(
    props: SingleProps<T> | MultiProps<T>
) {
    const {
        onSearch,
        items,
        isLoading,
        error,
        getId,
        getLabel,
        renderItem,
        searchable = true,
        showPrompt = false,
        placeholder = "Select…",
        searchMinChars = 2,
        debounceMs = 300,
        buttonClassName,
        popoverClassName,
        disabled,
    } = props

    const isSingle = (props as SingleProps<T>).mode === "single"
    const multi = props as MultiProps<T>

    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")

    // Debounce the search emission to parent
    React.useEffect(() => {
        const id = setTimeout(() => {
            // If we have a min chars requirement, only search if met OR if search is empty (to reset?)
            // Usually you might want to reset if empty, but here let's follow the logic:
            if (search && search.length >= searchMinChars) {
                onSearch(search)
            } else if (search.length === 0 && !showPrompt) {
                // optionally handle empty search if you want default results
                onSearch("")
            }
        }, debounceMs)
        return () => clearTimeout(id)
    }, [search, searchMinChars, debounceMs, onSearch, showPrompt])

    // Selection helpers
    const selectedArray: T[] = isSingle
        ? ((props as SingleProps<T>).value ? [(props as SingleProps<T>).value as T] : [])
        : (props as MultiProps<T>).value

    const isSelected = React.useCallback(
        (id: string) => selectedArray.some((it) => getId(it) === id),
        [selectedArray, getId]
    )

    const atLimit =
        !isSingle &&
        typeof (multi.maxSelected) === "number" &&
        selectedArray.length >= (multi.maxSelected as number)

    const addItem = (item: T) => {
        if (isSingle) {
            (props as SingleProps<T>).onChange(item)
            setOpen(false)
            return
        }
        if (atLimit) {
            multi.onLimitReached?.(multi.maxSelected as number)
            return
        }
        multi.onChange([...selectedArray, item])
    }

    const removeById = (id: string) => {
        if (isSingle) {
            (props as SingleProps<T>).onChange(null)
            return
        }
        multi.onChange(selectedArray.filter((v) => getId(v) !== id))
    }

    const toggle = (item: T) => {
        const id = getId(item)
        if (isSelected(id)) {
            removeById(id)
        } else {
            addItem(item)
        }
    }

    const clearAll = () => {
        if (isSingle) (props as SingleProps<T>).onChange(null)
        else multi.onChange([])
    }
    const nothingFound = !isLoading && !error && !showPrompt && items.length === 0

    // Trigger label(s)
    const chipPreviewCount = !isSingle ? (multi.chipPreviewCount ?? 3) : 1

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between overflow-hidden",
                        selectedArray.length === 0 && "text-muted-foreground",
                        buttonClassName
                    )}
                    disabled={disabled}
                >
                    <div className="flex flex-1 items-center gap-2 truncate">
                        {selectedArray.length === 0 ? (
                            <span className="truncate">{placeholder}</span>
                        ) : (
                            <div className="flex flex-wrap gap-1 min-w-0">
                                {selectedArray.slice(0, chipPreviewCount).map((it) => {
                                    const id = getId(it)
                                    const label = getLabel(it)
                                    return (
                                        <Badge key={id} variant="secondary" className="font-medium">
                                            {label}
                                            <span
                                                role="button"
                                                aria-label={`Remove ${label}`}
                                                tabIndex={0}
                                                className="ml-1 grid h-4 w-4 place-items-center rounded hover:bg-muted cursor-pointer"
                                                onPointerDownCapture={(e) => e.stopPropagation()}
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeById(id)
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        removeById(id)
                                                    }
                                                }}
                                            >
                                                <X className="h-3 w-3" />
                                            </span>
                                        </Badge>
                                    )
                                })}
                                {!isSingle && selectedArray.length > chipPreviewCount && (
                                    <Badge variant="secondary" className="font-normal">
                                        +{selectedArray.length - chipPreviewCount}
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className={cn("p-2 w-md sm:w-lg", popoverClassName)}
                align="start"
            >
                {/* Search */}
                {searchable && <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                    <Input
                        placeholder={placeholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8"
                        autoFocus
                    />
                    {isLoading && (
                        <Loader2 className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin opacity-70" />
                    )}
                </div>}

                {/* Results */}
                <div className="mt-2">
                    <ScrollArea className="max-h-64 sm:max-h-80 overflow-y-scroll! pr-1">
                        {showPrompt ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                Type at least {searchMinChars} characters…
                            </div>
                        ) : error ? (
                            <div className="py-6 text-center text-sm text-red-500">{error}</div>
                        ) : nothingFound ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">No results.</div>
                        ) : (
                            <ul className="space-y-1">
                                {items.map((it) => {
                                    const id = getId(it)
                                    const label = getLabel(it)
                                    const checked = isSelected(id)
                                    const disableThis =
                                        !isSingle && !!multi.maxSelected && !checked && selectedArray.length >= (multi.maxSelected as number)

                                    return (
                                        <li
                                            key={id}
                                            aria-disabled={disableThis}
                                            className={cn(
                                                "flex select-none items-center gap-2 rounded-md px-2 py-2",
                                                disableThis
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : "cursor-pointer hover:bg-accent"
                                            )}
                                            onClick={() => {
                                                if (!disableThis) toggle(it)
                                                else multi.onLimitReached?.(multi.maxSelected as number)
                                            }}
                                        >
                                            <Checkbox
                                                checked={checked}
                                                className="pointer-events-none"
                                                disabled={disableThis}
                                            />
                                            <span className="flex-1 truncate text-sm">
                                                {renderItem ? renderItem(it, checked) : label}
                                            </span>
                                            {checked && <Check className="h-4 w-4 opacity-70" />}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </ScrollArea>
                </div>

                {/* Footer */}
                <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {isSingle
                            ? (selectedArray.length ? "1 selected" : "None selected")
                            : `${selectedArray.length}${typeof multi.maxSelected === "number" ? ` / ${multi.maxSelected}` : ""} selected`}
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedArray.length > 0 && (
                            <Button size="sm" variant="ghost" onClick={clearAll}>
                                Clear
                            </Button>
                        )}
                        <Button size="sm" onClick={() => setOpen(false)}>
                            Done
                        </Button>
                    </div>
                </div>

                {!isSingle && !!multi.maxSelected && selectedArray.length >= multi.maxSelected! && (
                    <div className="mt-2 text-xs text-muted-foreground">
                        You’ve reached the maximum of {multi.maxSelected}.
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

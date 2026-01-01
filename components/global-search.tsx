"use client";

import * as React from "react"
import { Search } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <div className="relative w-full" onClick={() => setOpen(true)}>
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Button
                    variant="outline"
                    className="w-full justify-start pl-8 text-xs font-normal text-muted-foreground h-8 border-none shadow-none bg-muted/40 hover:bg-muted/60 relative"
                >
                    <span className="inline-flex">Search all resources...</span>
                    <kbd className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-3.5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all resources..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <span className="mr-2">🚀</span>
                            <span>Launch Project</span>
                        </CommandItem>
                        <CommandItem>
                            <span className="mr-2">👤</span>
                            <span>Search Users</span>
                        </CommandItem>
                        <CommandItem>
                            <span className="mr-2">⚙️</span>
                            <span>Settings</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}

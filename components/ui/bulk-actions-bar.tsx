"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    X,
    Trash2,
    Download,
    Archive,
    FolderOpen,
    MoreHorizontal
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export interface BulkActionBarAction<T> {
    label: string;
    icon?: React.ReactNode;
    onClick: (selected: T[]) => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    disabled?: boolean;
}

interface BulkActionsBarProps<T> {
    selectedRows: Map<string, T>;
    setSelectedRows: React.Dispatch<React.SetStateAction<Map<string, T>>>;
    actions?: BulkActionBarAction<T>[];
    onClearSelection?: () => void;
}

function BulkActionsBar<T>({
    selectedRows,
    setSelectedRows,
    actions = [],
    onClearSelection
}: BulkActionsBarProps<T>) {

    const handleClearSelection = useCallback(() => {
        setSelectedRows(new Map());
        onClearSelection?.();
    }, [setSelectedRows, onClearSelection]);

    const count = selectedRows.size;
    const selectedList = Array.from(selectedRows.values());

    if (count === 0) return null;

    return (
        <TooltipProvider>
            <div className="fixed z-50 w-auto px-5 -translate-x-1/2 bottom-6 left-1/2">
                <div className="
                    bg-foreground/95 text-background
                    border border-border/20
                    backdrop-blur-sm
                    rounded-full
                    pl-5 pr-2 py-2
                    flex items-center 
                    gap-4 
                    shadow-xl
                ">
                    {/* LEFT: Selected Count */}
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="font-semibold text-sm">
                            {count}
                        </span>
                        <span className="text-sm text-background/70 hidden sm:inline">
                            {count === 1 ? "item" : "items"} selected
                        </span>
                    </div>

                    {/* SEP */}
                    <div className="h-6 w-[1px] bg-background/20" />

                    {/* CENTER: Actions */}
                    <div className="flex items-center gap-2">
                        {actions.map((action, idx) => (
                            <Tooltip key={idx}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={action.variant || "secondary"}
                                        size="icon"
                                        onClick={() => action.onClick(selectedList)}
                                        disabled={action.disabled}
                                        className="rounded-full w-9 h-9"
                                    >
                                        {action.icon}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{action.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>

                    {/* RIGHT: Close Button */}
                    <button
                        onClick={handleClearSelection}
                        className="p-1.5 hover:bg-background/20 rounded-full transition-colors duration-200 ml-1"
                        aria-label="Clear selection"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </TooltipProvider>
    );
}

export default BulkActionsBar;

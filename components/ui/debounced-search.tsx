"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DebouncedSearchProps extends Omit<React.ComponentProps<"input">, "onChange"> {
    onSearch: (value: string) => void;
    debounceMs?: number;
    initialValue?: string;
    wrapperClassName?: string;
}

export function DebouncedSearch({
    onSearch,
    debounceMs = 500,
    initialValue = "",
    wrapperClassName,
    className,
    placeholder = "Search...",
    ...props
}: DebouncedSearchProps) {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [searchTerm, debounceMs, onSearch]);

    return (
        <div className={cn("relative flex-1 md:max-w-sm", wrapperClassName)}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className={cn("pl-9", className)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                {...props}
            />
        </div>
    );
}

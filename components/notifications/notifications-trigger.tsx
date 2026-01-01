"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function NotificationsTrigger() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
                <div className="p-4 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="rounded-full bg-muted p-3">
                            <Bell className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                    </div>
                    <p className="text-sm font-medium text-foreground">No new notifications</p>
                    <p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
                </div>
            </PopoverContent>
        </Popover>
    );
}

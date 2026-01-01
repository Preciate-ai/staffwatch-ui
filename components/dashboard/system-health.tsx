"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SystemHealth() {
    return (
        <Card className="shadow-sm border-none bg-background/50 backdrop-blur-sm py-0 gap-0 rounded-sm">
            <CardHeader className="px-4 py-3 border-b">
                <CardTitle className="text-base font-semibold">System Health</CardTitle>
                <CardDescription className="text-xs">
                    Operational metrics.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">API Latency</span>
                        <span className="font-medium font-mono">45ms</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-[25%] bg-green-500 rounded-full" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Database Load</span>
                        <span className="font-medium font-mono">12%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-[12%] bg-blue-500 rounded-full" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Storage Usage</span>
                        <span className="font-medium font-mono">68%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-[68%] bg-amber-500 rounded-full" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

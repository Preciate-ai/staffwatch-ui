"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderGit2 } from "lucide-react";

export function PendingApprovals() {
    return (
        <Card className="shadow-sm border-none bg-background/50 backdrop-blur-sm py-0 gap-0 rounded-sm">
            <CardHeader className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">Pending Approvals</CardTitle>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">0</Badge>
                </div>
                <CardDescription className="text-xs">
                    Requests requiring your attention.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">

                <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                    <div className="rounded-full bg-muted p-3">
                        <FolderGit2 className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">All caught up!</p>
                        <p className="text-xs text-muted-foreground/70">No pending requests at this time.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

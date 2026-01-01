"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IActivityLog } from "@/interfaces/activities";
import Table, { TableColumn } from "@/components/ui/data-table";
import { useFetchLatestActivityLogs } from "@/services/activity-logs";

const columns: TableColumn<IActivityLog & { createdAt?: string, id?: string }>[] = [
    {
        header: "Type",
        key: "type",
        width: "140px",
        render: (value) => (
            <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wider text-muted-foreground">
                {value}
            </Badge>
        ),
    },
    {
        header: "Description",
        key: "description",
        width: "250px",
        render: (value) => (
            <span className="text-sm text-foreground/80 truncate block max-w-[300px]" title={value}>
                {value}
            </span>
        ),
    },
    {
        header: "User",
        key: "actor.name",
        width: "150px",
        align: "left",
        render: (_, row) => (
            <div className="flex items-center justify-start gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={(row.actor as any)?.avatar} alt={row.actor.name} />
                    <AvatarFallback className="text-[9px]">{row.actor.name?.slice(0, 2)?.toUpperCase() || "CN"}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground font-medium">{row.actor.name}</span>
            </div>
        ),
    },
    {
        header: "Time",
        key: "createdAt",
        align: "left",
        width: "100px",
        render: (value) => <span className="text-xs text-muted-foreground whitespace-nowrap">{value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</span>,
    },
];

export function RecentActivity() {
    const { data: activityData, isLoading } = useFetchLatestActivityLogs();

    return (
        <Card className="col-span-2 shadow-sm border-none bg-background/50 backdrop-blur-sm py-0 gap-0 rounded-sm">
            <CardHeader className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                        <CardDescription className="text-xs">
                            Real-time platform events.
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                        View All
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table
                    data={activityData || []}
                    columns={columns}
                    loading={isLoading}
                    className="border-none shadow-none rounded-none w-full"
                    headerClassName="bg-transparent border-b-muted/50"
                    rowClassName="hover:bg-muted/30 border-b-muted/50"
                    tableClassName="w-full"
                />
            </CardContent>
        </Card>
    );
}

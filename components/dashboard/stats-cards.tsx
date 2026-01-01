"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Building, Activity, FolderGit2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useGetInternalStats } from "@/services/analytics.services";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
    title: string;
    value: string | number;
    change: string;
    trend: "up" | "down";
    icon: any;
    loading?: boolean;
}

function StatCard({ title, value, change, trend, icon: Icon, loading }: StatCardProps) {
    if (loading) {
        return (
            <Card className="shadow-sm border-none bg-background/50 backdrop-blur-sm py-0 gap-0 rounded-sm">
                <div className="px-4 py-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3.5 w-3.5 rounded-full" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                        <Skeleton className="h-7 w-16" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border-none bg-background/50 backdrop-blur-sm py-0 gap-0 rounded-sm">
            <div className="px-4 py-3 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">{title}</span>
                    <Icon className="h-3.5 w-3.5 text-muted-foreground/50" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-bold tracking-tight">{value}</span>
                    <div className="flex items-center text-[10px] text-muted-foreground">
                        {trend === "up" ? (
                            <ArrowUpRight className="mr-0.5 h-2.5 w-2.5 text-emerald-500" />
                        ) : (
                            <ArrowDownRight className="mr-0.5 h-2.5 w-2.5 text-rose-500" />
                        )}
                        <span className={trend === "up" ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
                            {change}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export function StatsCards() {
    const { data: stats, isLoading } = useGetInternalStats();

    const formatGrowth = (growth: number) => {
        const sign = growth >= 0 ? "+" : "";
        return `${sign}${growth}% since last month`;
    };

    const getTrend = (growth: number): "up" | "down" => {
        return growth >= 0 ? "up" : "down";
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Organizations"
                value={stats?.organizations.total.toLocaleString() || "0"}
                change={formatGrowth(stats?.organizations.growth || 0)}
                trend={getTrend(stats?.organizations.growth || 0)}
                icon={Building}
                loading={isLoading}
            />
            <StatCard
                title="Active Projects"
                value={stats?.projects.total.toLocaleString() || "0"}
                change={formatGrowth(stats?.projects.growth || 0)}
                trend={getTrend(stats?.projects.growth || 0)}
                icon={FolderGit2}
                loading={isLoading}
            />
            <StatCard
                title="Total Users"
                value={stats?.users.total.toLocaleString() || "0"}
                change={formatGrowth(stats?.users.growth || 0)}
                trend={getTrend(stats?.users.growth || 0)}
                icon={Users}
                loading={isLoading}
            />
            <StatCard
                title="Total Hours Logged"
                value={stats?.hours.total.toLocaleString() || "0"}
                change={formatGrowth(stats?.hours.growth || 0)}
                trend={getTrend(stats?.hours.growth || 0)}
                icon={Activity}
                loading={isLoading}
            />
        </div>
    );
}

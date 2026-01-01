"use client";

import React from "react";
import { ToolsPanel } from "@/components/internal/tools-panel";
import { PageHeader } from "@/components/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/activities";
import { PendingApprovals } from "@/components/dashboard/pending-approvals";
import { SystemHealth } from "@/components/dashboard/system-health";

export default function InternalDashboardPage() {
    return (
        <>
            <PageHeader
                title="Overview"
                breadcrumbs={[
                    { label: "Dashboard", href: `/internal`, active: true }
                ]}
            />
            <div className="flex h-[calc(100vh-4rem)] flex-1 overflow-hidden bg-muted/5">
                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Stats Grid */}
                    <StatsCards />

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-full">
                        <RecentActivity />

                        <div className="space-y-6">
                            <PendingApprovals />
                            <SystemHealth />
                        </div>
                    </div>
                </div>

                {/* Right Side Tools Panel */}
                <ToolsPanel />
            </div>
        </>
    );
}



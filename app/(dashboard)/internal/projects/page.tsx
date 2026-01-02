"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { useGetInternalProjects } from "@/services/projects.services";
import Table, { TableColumn } from "@/components/ui/data-table";
import TablePagination from "@/components/ui/table-pagination";
import { Input } from "@/components/ui/input";
import { DebouncedSearch } from "@/components/ui/debounced-search";
import { Search, FolderGit2, CalendarClock, Archive } from "lucide-react";
import { InternalStatCard } from "@/components/internal/stat-card";
import { Project, ProjectMemberRole } from "@/interfaces/projects.interfaces";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import BulkActionsBar, { BulkActionBarAction } from "@/components/ui/bulk-actions-bar";
import { Trash2 } from "lucide-react";

export default function InternalProjectsPage() {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [search, setSearch] = useState("");
    const [selectedRows, setSelectedRows] = useState<Map<string, Project>>(new Map());

    const { data, isLoading } = useGetInternalProjects({
        page,
        limit: rowsPerPage,
        search: search,
    });

    const columns: TableColumn<Project>[] = [
        {
            header: "Project Name",
            key: "name",
            render: (name) => <span className="font-medium text-foreground">{name}</span>,
        },
        {
            header: "Organization",
            key: "organization",
            render: (_, row) => (
                <span className="text-xs text-muted-foreground truncate max-w-[300px] block" title={row.organization.name}>
                    {row.organization.name || "-"}
                </span>
            ),
        },
        // We probably don't have organization name in the project list response directly unless we expand it
        // If the API returns organizationId, we might not show the name unless we fetch it or the API includes it.
        // For now, let's assume the API might include something or just show ID, or skip it.
        // Assuming 'organization' object might exist if expanded, but let's stick to base fields.

        {
            header: "Status",
            key: "status",
            render: (status) => (
                <Badge variant={status === "active" ? "default" : "secondary"} className="capitalize">
                    {status}
                </Badge>
            ),
        },
        {
            header: "Created At",
            key: "createdAt",
            render: (date) => (
                <span className="text-muted-foreground">
                    {date ? format(new Date(date), "MMM d, yyyy") : "-"}
                </span>
            ),
        },
    ];

    const totalResults = data?.totalResults || 0;

    const handleSelectRow = (row: Project, isSelected: boolean) => {
        const newSelected = new Map(selectedRows);
        if (isSelected) {
            newSelected.set(row.id, row);
        } else {
            newSelected.delete(row.id);
        }
        setSelectedRows(newSelected);
    };

    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            const newSelected = new Map(selectedRows);
            data?.results.forEach((row) => {
                newSelected.set(row.id, row);
            });
            setSelectedRows(newSelected);
        } else {
            // If deselecting all, we might want to clear just the current page or all?
            // Usually "Select All" checked means selecting current page items.
            // Unchecking means deselecting current page items.
            const newSelected = new Map(selectedRows);
            data?.results.forEach((row) => {
                newSelected.delete(row.id);
            });
            setSelectedRows(newSelected);
        }
    };

    const bulkActions: BulkActionBarAction<Project>[] = [
        {
            label: "Delete Projects",
            icon: <Trash2 size={16} />,
            onClick: (selected) => {
                console.log("Deleting", selected);
                // Implement delete logic here
                alert(`Deleting ${selected.length} projects`);
                setSelectedRows(new Map());
            },
            variant: "destructive",
        },
    ];

    return (
        <>
            <PageHeader
                title="Projects"
                breadcrumbs={[
                    { label: "Dashboard", href: "/internal" },
                    { label: "Projects", href: "/internal/projects", active: true },
                ]}
            />

            <div className="flex h-[calc(100vh-8rem)] flex-col gap-6 p-6 overflow-y-auto">
                <div className="grid gap-4 md:grid-cols-3">
                    <InternalStatCard
                        title="Total Projects"
                        value={totalResults}
                        icon={FolderGit2}
                        description="All projects across organizations"
                    />
                    <InternalStatCard
                        title="Active Projects"
                        value={totalResults} // Placeholder
                        icon={CalendarClock}
                        trend="up"
                        description="Currently active"
                    />
                    <InternalStatCard
                        title="Archived"
                        value={0} // Placeholder
                        icon={Archive}
                        description="Archived projects"
                    />
                </div>

                <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1 md:max-w-sm">
                            <DebouncedSearch
                                placeholder="Search projects..."
                                onSearch={(val) => {
                                    setSearch(val);
                                    setPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <Table
                        data={data?.results || []}
                        columns={columns}
                        loading={isLoading}
                        rowKey={(row) => row.id}
                        emptyMessage="No projects found."
                        enableSelection={true}
                        selectedRows={selectedRows}
                        onSelectRow={handleSelectRow}
                        onSelectAll={handleSelectAll}
                        onRowClick={(row) => window.location.href = `/internal/projects/${row.id}`}
                    />

                    <BulkActionsBar
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        actions={bulkActions}
                    />

                    <TablePagination
                        count={totalResults}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
                        rowsPerPageOptions={[10, 20, 50, 100]}
                    />
                </div>
            </div>
        </>
    );
}

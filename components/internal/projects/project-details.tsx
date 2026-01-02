"use client";

import { useGetInternalProject } from "@/services/projects.services";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { PageHeader } from "@/components/page-header";

interface ProjectDetailsProps {
    projectId: string;
    baseBreadcrumbs?: { label: string; href?: string; active?: boolean }[];
}

export function ProjectDetails({ projectId, baseBreadcrumbs }: ProjectDetailsProps) {
    const { data: project, isLoading } = useGetInternalProject(projectId);

    if (isLoading) {
        return (
            <div className="flex flex-col h-full">
                <div className="p-6 space-y-4">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        );
    }

    if (!project) {
        return <div className="p-6">Project not found</div>;
    }

    const breadcrumbs = baseBreadcrumbs
        ? [...baseBreadcrumbs, { label: project.name, active: true }]
        : [
            { label: "Dashboard", href: "/internal" },
            { label: "Projects", href: "/internal/projects" },
            { label: project.name, active: true }
        ];

    return (
        <div className="flex flex-col h-full">
            <PageHeader
                title={project.name}
                breadcrumbs={breadcrumbs}
                rightElement={
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>
                        {project.status}
                    </Badge>
                }
            />
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-card">
                        <h3 className="font-semibold text-lg">Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground font-medium mb-1">Organization</p>
                                <p>{project.organization?.name || "-"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground font-medium mb-1">Created At</p>
                                <p>{project.createdAt ? format(new Date(project.createdAt), "PPP") : "-"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground font-medium mb-1">ID</p>
                                <p className="font-mono text-xs text-muted-foreground">{project.id}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-card">
                        <h3 className="font-semibold text-lg">Description</h3>
                        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                            {project.description || "No description provided."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

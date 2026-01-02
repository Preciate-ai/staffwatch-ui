"use client";

import { ProjectDetails } from "@/components/internal/projects/project-details";

interface PageProps {
    params: {
        orgId: string;
        id: string;
    };
}

export default function OrganizationProjectDetailsPage({ params }: PageProps) {
    const baseBreadcrumbs = [
        { label: "Dashboard", href: "/internal" },
        { label: "Organizations", href: "/internal/organizations" },
        { label: "Organization " + params.orgId, href: `/internal/organizations/${params.orgId}` },
        { label: "Projects", href: `/internal/organizations/${params.orgId}/projects` },
    ];

    return <ProjectDetails projectId={params.id} baseBreadcrumbs={baseBreadcrumbs} />;
}

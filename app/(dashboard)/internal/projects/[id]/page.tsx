"use client";

import { ProjectDetails } from "@/components/internal/projects/project-details";

interface PageProps {
    params: {
        id: string;
    };
}

export default function InternalProjectPage({ params }: PageProps) {
    return <ProjectDetails projectId={params.id} />;
}

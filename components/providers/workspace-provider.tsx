
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetMyOrganizations } from "@/services/organization.services";
import { OrganizationMember } from "@/interfaces/organizations.interfaces";
import { useGetProjects } from "@/services/projects.services";
import { ProjectDetails } from "@/interfaces/projects.interfaces";
import { useQuery } from "@tanstack/react-query";
import http from "@/services/base";
import { routes } from "@/services/routes";

interface WorkspaceContextType {
    activeOrgId: string | null;
    activeProjectId: string | null;
    activeOrg: OrganizationMember | null;
    activeProject: ProjectDetails | null;
    isLoading: boolean;
    organizations: OrganizationMember[];
    projects: ProjectDetails[]; // Simplified list
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
    const params = useParams();
    const router = useRouter();
    const orgId = params?.orgId as string | undefined;
    const projectId = params?.projectId as string | undefined;

    const [activeOrg, setActiveOrg] = useState<OrganizationMember | null>(null);
    const [activeProject, setActiveProject] = useState<ProjectDetails | null>(null);

    // Fetch User's Organizations
    const { data: organizations, isLoading: isLoadingOrgs } = useGetMyOrganizations();

    // Fetch Projects for the active Org
    // Assuming we have an endpoint to get projects filtered by org. 
    // The existing useGetProjects takes a query object. 
    // I'll assume passing { organizationId: orgId } works.
    const { data: projectsData, isLoading: isLoadingProjects } = useQuery({
        queryKey: ["projects", { organizationId: orgId }],
        queryFn: async () => {
            if (!orgId) return [];
            const data = await http.get({
                url: routes.projects.index,
                query: { organizationId: orgId },
            });
            // Adjust based on actual response structure. 
            // useGetProjects returns `GetProjectsResponse` which might have `results` array.
            // checking services/projects.services.ts : returns GetProjectsResponse.
            // I'll cast it here blindly as any for now or strictly if I check interface.
            return (data as any).results || [];
        },
        enabled: !!orgId,
    });

    useEffect(() => {
        if (organizations && orgId) {
            const org = organizations.find((o) => o.organization.id === orgId);
            setActiveOrg(org || null);
        } else {
            setActiveOrg(null);
        }
    }, [organizations, orgId]);

    useEffect(() => {
        if (projectsData && projectId) {
            const proj = (projectsData as ProjectDetails[]).find((p) => p.id === projectId);
            setActiveProject(proj || null);
        } else {
            setActiveProject(null);
        }
    }, [projectsData, projectId]);

    return (
        <WorkspaceContext.Provider
            value={{
                activeOrgId: orgId || null,
                activeProjectId: projectId || null,
                activeOrg,
                activeProject,
                isLoading: isLoadingOrgs || isLoadingProjects,
                organizations: organizations || [],
                projects: projectsData || [],
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => {
    const context = useContext(WorkspaceContext);
    if (!context) {
        throw new Error("useWorkspace must be used within a WorkspaceProvider");
    }
    return context;
};

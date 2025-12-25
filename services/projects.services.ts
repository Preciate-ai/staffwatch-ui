import { useMutation, useQuery } from "@tanstack/react-query";
import http from "@/services/base";
import { routes } from "@/services/routes";
import { queryClient } from "@/lib/react-query";
import {
    CreateProjectPayload,
    InviteUserPayload,
    Project,
    GetProjectsResponse,
    ProjectDetails,
    GetProjectMembersResponse,
    GetProjectMembersQuery,
} from "@/interfaces/projects.interfaces";

export const useCreateProject = () => {
    return useMutation({
        mutationFn: async (payload: CreateProjectPayload) => {
            const data = await http.post({
                url: routes.projects.index,
                body: payload,
            });
            return data as Project;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};

export const useGetProjects = (query?: Record<string, any>) => {
    return useQuery({
        queryKey: ["projects", query],
        queryFn: async () => {
            const data = await http.get({
                url: routes.projects.index,
                query,
            });
            return data as GetProjectsResponse;
        },
    });
};

export const useGetProject = (projectId: string) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: async () => {
            const data = await http.get({
                url: `${routes.projects.index}/${projectId}`,
            });
            return data as ProjectDetails;
        },
        enabled: !!projectId,
    });
};

export const useInviteUser = (projectId: string) => {
    return useMutation({
        mutationFn: async (payload: InviteUserPayload) => {
            const data = await http.post({
                url: `${routes.projects.index}/${projectId}${routes.projects.invite}`,
                body: payload,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project", projectId] });
        },
    });
};
export const useGetProjectMembers = (projectId: string, query?: GetProjectMembersQuery) => {
    return useQuery({
        queryKey: ["project-members", projectId, query],
        queryFn: async () => {
            const data = await http.get({
                url: `${routes.projects.index}/${projectId}/members`,
                query,
            });
            return data as GetProjectMembersResponse;
        },
        enabled: !!projectId,
    });
};

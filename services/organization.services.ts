import { useMutation, useQuery } from "@tanstack/react-query";
import http from "@/services/base";
import { routes } from "@/services/routes";
import { OrganizationMember } from "@/interfaces/organizations.interfaces";

export const useGetMyOrganizations = () => {
    return useQuery({
        queryKey: ["my-organizations"],
        queryFn: async () => {
            const data = await http.get({
                url: routes.organization.me,
            });
            // Assuming the API returns a list of organizations or organization members
            // If it returns a paginated response, we might need to adjust.
            // Based on auth.store, it seems simple for now. 
            // We'll return it as is.
            return data as OrganizationMember[];
        },
    });
};

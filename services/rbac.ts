import { useQuery } from "@tanstack/react-query";
import http from "@/services/base";
import { routes } from "@/services/routes";

export const useFetchRoles = () => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            return await http.get({
                url: routes.rbac.roles,
            });
        },
    });
};

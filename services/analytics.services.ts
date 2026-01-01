
import { useQuery } from "@tanstack/react-query";
import http from "@/services/base";
import { routes } from "@/services/routes";
import { DashboardStats } from "@/interfaces/analytics.interfaces";

export const useGetInternalStats = () => {
    return useQuery({
        queryKey: ["internal-stats"],
        queryFn: async () => {
            const data = await http.get({
                url: routes.analytics.stats,
            });
            return data as DashboardStats;
        },
    });
};

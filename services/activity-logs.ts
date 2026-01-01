import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import http from "@/services/base";
import { routes } from "./routes";
import { IActivityLog } from "@/interfaces/activities";

export const useFetchLatestActivityLogs = () => {
    return useQuery({
        queryKey: ["activity-logs", "latest"],
        queryFn: async () => {
            const data = await http.get({ url: routes.activityLogs.latest });
            return data.results as IActivityLog[];
        },
    });
};

export const invalidateActivityLogs = () => {
    return queryClient.invalidateQueries({ queryKey: ["activity-logs", "latest"] });
};

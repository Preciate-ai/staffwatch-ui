import { useQuery } from "@tanstack/react-query";
import http from "@/services/base";
import { routes } from "@/services/routes";
import { useAuthStore } from "@/stores/auth.store";
import { LoginResultInterface } from "@/interfaces/auth.interfaces";
import { setCookie } from "nookies";

// Define return types that exclude credentials since they aren't returned by these endpoints
type InternalUserResponse = Omit<LoginResultInterface, "credentials" | "organization">;
type ClientUserResponse = Omit<LoginResultInterface, "credentials" | "permissions">;

export const useFetchLoggedinInternalUser = () => {
    const { setAccount, setPermissions } = useAuthStore();

    return useQuery({
        queryKey: ["me", "internal"],
        queryFn: async () => {
            const data = await http.get({
                url: routes.users.meInternal,
            }) as InternalUserResponse;

            if (data.account) {
                setAccount(data.account);
            }
            if (data.permissions) {
                setPermissions(data.permissions);
                setCookie(null, "PERMISSIONS", JSON.stringify(data.permissions), {
                    path: "/",
                });
            }

            return data;
        },
    });
};

export const useFetchLoggedinClientUser = () => {
    const { setAccount, setOrganization } = useAuthStore();

    return useQuery({
        queryKey: ["me", "client"],
        queryFn: async () => {
            const data = await http.get({
                url: routes.users.meClient,
            }) as ClientUserResponse;

            if (data.account) {
                setAccount(data.account);
            }
            if (data.organization) {
                setOrganization(data.organization);
            }

            return data;
        },
    });
};

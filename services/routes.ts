export const routes = {
    auth: {
        login: "/auth/login",
        register: "/auth/register-company",
        verify: "/auth/verify",
        acceptInvite: "/auth/accept-invite",
        logout: "/auth/logout",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
        refreshToken: "/auth/refresh-tokens",
    },
    organization: {
        index: "/organization",
    },
    projects: {
        index: "/projects",
        invite: "/invite", // Used as suffix
    },
    users: {
        index: "/users",
    },
    sessions: {
        index: "/sessions",
        aggregated: "/aggregated",
    },
}
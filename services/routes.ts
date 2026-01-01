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
        index: "/organizations",
        me: "/organizations/me",
        internalCreate: "/internal/organizations",
    },
    projects: {
        index: "/projects",
        invite: "/invite", // Used as suffix
        me: "/projects/me"
    },
    users: {
        index: "/users",
        meInternal: "/internal/users/me",
        meClient: "/client/users/me",
    },
    sessions: {
        index: "/sessions",
        aggregated: "/aggregated",
    },
    activityLogs: {
        latest: "/internal/activity-logs/latest",
    },
    analytics: {
        stats: "/internal/analytics/stats",
    }
}
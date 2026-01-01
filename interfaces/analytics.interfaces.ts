export interface DashboardStats {
    organizations: {
        total: number;
        growth: number;
    };
    projects: {
        total: number;
        growth: number;
    };
    users: {
        total: number;
        growth: number;
    };
    hours: {
        total: number;
        growth: number;
    };
}

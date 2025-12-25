export interface GetAggregatedSessionsQuery {
    userId: string;
    projectId: string;
    startDate: string;
    endDate: string;
}

export interface AggregatedSession {
    date: string;
    totalDurationMs: number;
    sessionCount: number;
    totalHours: number;
}

export type GetAggregatedSessionsResponse = AggregatedSession[];

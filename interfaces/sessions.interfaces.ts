export interface GetAggregatedSessionsQuery {
    userId: string;
    projectId: string;
    startDate: string;
    endDate: string;
}

export interface AggregatedSession {
    day: string;
    date: string;
    totalDurationMs: number;
    sessionCount: number;
    duration: number;
    activityRate: number;
    screenshots: { url: string, timestamp: number }[];
}

export type GetAggregatedSessionsResponse = AggregatedSession[];

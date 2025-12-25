"use client"
import { PageHeader } from '@/components/page-header'
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetAggregatedSessions } from '@/services/sessions.services';
import { DateTime } from 'luxon';

export default function page() {
    const params = useParams();
    const id = params?.id as string;
    const staffId = params?.staffId as string;
    const query = React.useMemo(() => ({
        userId: staffId,
        projectId: id,
        startDate: DateTime.now().minus({ days: 7 }).toISO() as string,
        endDate: DateTime.now().toISO() as string,
    }), [staffId, id]);

    const { data: aggregatedSessions } = useGetAggregatedSessions(query)
    return (
        <div>
            <PageHeader
                title="Staff"
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard", active: false },
                    { label: "Projects", href: "/dashboard/projects", active: false },
                    { label: "Project", href: `/dashboard/projects/${id}`, active: false },
                    { label: "Staff", href: `/dashboard/projects/${id}/staff`, active: true },
                ]}
            />
        </div>
    )
}

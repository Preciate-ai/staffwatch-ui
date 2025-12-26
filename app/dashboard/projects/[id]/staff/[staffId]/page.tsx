"use client"
import { PageHeader } from '@/components/page-header'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useGetAggregatedSessions } from '@/services/sessions.services';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { Card, CardContent } from '@/components/ui/card';
import { format, eachDayOfInterval, isSameDay, subDays } from 'date-fns';

export default function page() {
    const params = useParams();
    const id = params?.id as string;
    const staffId = params?.staffId as string;

    const [date, setDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });

    const query = React.useMemo(() => {
        const from = date?.from;
        const to = date?.to || date?.from;

        return {
            userId: staffId,
            projectId: id,
            startDate: from ? from.toISOString() : "",
            endDate: to ? to.toISOString() : "",
        }
    }, [staffId, id, date]);

    const { data: aggregatedSessions } = useGetAggregatedSessions(query)

    const days = React.useMemo(() => {
        if (!date?.from) return [];
        const end = date.to || date.from;
        return eachDayOfInterval({ start: date.from, end: end });
    }, [date]);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Staff"
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard", active: false },
                    { label: "Projects", href: "/dashboard/projects", active: false },
                    { label: "Project", href: `/dashboard/projects/${id}`, active: false },
                    { label: "Staff", href: `/dashboard/projects/${id}/staff`, active: true },
                ]}
            />

            <div className="flex justify-end px-10">
                <DatePickerWithRange date={date} setDate={setDate} />
            </div>

            <div className="grid grid-cols-2 px-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {days.map((day) => {
                    const session = aggregatedSessions?.find(s => isSameDay(new Date(s.day), day));

                    // Format duration from decimal hours to H:MM
                    const hours = session?.duration ? Math.floor(session.duration) : 0;
                    const minutes = session?.duration ? Math.round((session.duration - hours) * 60) : 0;
                    const durationString = hours > 0
                        ? `${hours}h ${minutes}m`
                        : `${minutes}m`;

                    const activityRate = session?.activityRate || 0;
                    const defaultScreenshot = session?.screenshots?.[0]?.url;

                    return (
                        <Card key={day.toISOString()} className="overflow-hidden group hover:shadow-md py-0! transition-all border-border/60">
                            {/* Screenshot Area */}
                            <div className="aspect-video bg-muted/30 relative border-b border-border/60">
                                {defaultScreenshot ? (
                                    <img
                                        src={defaultScreenshot}
                                        alt="Daily screenshot"
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-1.5 text-muted-foreground/40">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-8 h-8"
                                        >
                                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                            <circle cx="9" cy="9" r="2" />
                                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                        </svg>
                                        <p className="text-[10px] font-medium">No screenshot</p>
                                    </div>
                                )}
                            </div>

                            {hours > 0 ? <CardContent className="p-2 space-y-2">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-xs text-foreground/90">
                                        {format(day, 'EEE, MMM do')}
                                    </span>
                                    <button className="text-primary/70 hover:text-primary transition-colors">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-3 h-3"
                                        >
                                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                            <path d="m15 5 4 4" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Progress Bar & Stats */}
                                <div className="space-y-1.5">
                                    <div className="h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{ width: `${activityRate}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-center font-medium text-muted-foreground">
                                        <span className="text-foreground">{activityRate}%</span> of {durationString}
                                    </p>
                                </div>
                            </CardContent> : <CardContent className="p-2 space-y-2">
                                <p className="text-[10px] text-center font-medium text-muted-foreground">
                                    No activity
                                </p>
                            </CardContent>}
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface InternalStatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: any;
    trend?: "up" | "down";
    trendValue?: string;
    className?: string;
}

export function InternalStatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    trendValue,
    className,
}: InternalStatCardProps) {
    return (
        <Card className={cn("p-3 flex flex-col gap-1", className)}>
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{title}</p>
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-bold">{value}</h3>
                {(description || trendValue) && (
                    <div className="flex items-center text-[10px] text-muted-foreground gap-2">
                        {trend && (
                            <span
                                className={cn(
                                    "flex items-center font-medium",
                                    trend === "up" ? "text-emerald-500" : "text-rose-500"
                                )}
                            >
                                {trend === "up" ? (
                                    <ArrowUpRight className="mr-0.5 h-2.5 w-2.5" />
                                ) : (
                                    <ArrowDownRight className="mr-0.5 h-2.5 w-2.5" />
                                )}
                                {trendValue}
                            </span>
                        )}
                        {description && <span className="truncate max-w-[120px]">{description}</span>}
                    </div>
                )}
            </div>
        </Card>
    );
}

import { ArrowDown, ArrowUp } from "lucide-react";

interface SortIconProps {
    column: string;
    currentSortBy?: string;
    currentSortOrder?: "asc" | "desc";
}

const SortIcon = ({
    column,
    currentSortBy,
    currentSortOrder,
}: SortIconProps) => {
    if (column !== currentSortBy) {
        return (
            <div className="flex flex-col ml-2 opacity-30">
                <ArrowUp className="w-3 h-3 -mb-1" />
                <ArrowDown className="w-3 h-3" />
            </div>
        );
    }

    return (
        <div className="ml-2 text-primary">
            {currentSortOrder === "asc" ? (
                <ArrowUp className="w-3 h-3" />
            ) : (
                <ArrowDown className="w-3 h-3" />
            )}
        </div>
    );
};

export default SortIcon;

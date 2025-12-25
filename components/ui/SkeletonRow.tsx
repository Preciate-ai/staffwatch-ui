import { Skeleton } from "@/components/ui/skeleton";
import { TableColumn } from "./data-table";

interface SkeletonRowProps<T> {
    columns: TableColumn<T>[];
}

const SkeletonRow = <T,>({ columns }: SkeletonRowProps<T>) => {
    return (
        <tr>
            {columns.map((_, index) => (
                <td key={index} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                </td>
            ))}
        </tr>
    );
};

export default SkeletonRow;

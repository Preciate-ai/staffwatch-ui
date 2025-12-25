import React, { useMemo, useCallback } from "react";
import {
    MdFirstPage,
    MdLastPage,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from "react-icons/md";

// Interface for rows per page options
export interface RowsPerPageOption {
    value: number;
    label: string;
}

// Main TablePagination props interface
export interface TablePaginationProps {
    // Required props
    count: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => void;
    page: number;
    rowsPerPage: number;

    // Optional props with defaults
    rowsPerPageOptions?: Array<number | RowsPerPageOption>;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    labelRowsPerPage?: React.ReactNode;
    labelDisplayedRows?: (info: {
        from: number;
        to: number;
        count: number;
        page: number;
    }) => string;
    getItemAriaLabel?: (type: "first" | "last" | "next" | "previous") => string;

    // Navigation button controls
    showFirstButton?: boolean;
    showLastButton?: boolean;
    disabled?: boolean;

    // Props for individual button customization
    backIconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    nextIconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    SelectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;

    // Component styling
    className?: string;
    component?: React.ElementType;
}

// Default label functions
const defaultLabelDisplayedRows = ({
    from,
    to,
    count,
}: {
    from: number;
    to: number;
    count: number;
}) => {
    return `${from}–${to} of ${count !== -1 ? count?.toLocaleString() : `more than ${to?.toLocaleString()}`
        }`;
};

const defaultGetAriaLabel = (type: "first" | "last" | "next" | "previous") => {
    return `Go to ${type} page`;
};

// TablePaginationActions component for navigation buttons
interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => void;
    showFirstButton?: boolean;
    showLastButton?: boolean;
    disabled?: boolean;
    getItemAriaLabel?: (type: "first" | "last" | "next" | "previous") => string;
    backIconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    nextIconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = ({
    count,
    page,
    rowsPerPage,
    onPageChange,
    showFirstButton = false,
    showLastButton = false,
    disabled = false,
    getItemAriaLabel = defaultGetAriaLabel,
    backIconButtonProps = {},
    nextIconButtonProps = {},
}) => {
    const totalPages = Math.ceil(count / rowsPerPage);
    const currentPage = page;
    const canPreviousPage = page > 1;
    const canNextPage = page < totalPages;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const newPage = Math.max(1, page - 10); // Go back 10 pages, but not below 1
        onPageChange(event, newPage);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const newPage = Math.min(totalPages, page + 10); // Go forward 10 pages, but not beyond totalPages
        onPageChange(event, newPage);
    };

    const buttonBaseClasses =
        "p-1.5 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    const buttonEnabledClasses =
        "text-muted-foreground hover:bg-muted font-medium";
    const buttonDisabledClasses = "text-muted-foreground/30";

    return (
        <div className="flex items-center space-x-1">
            {showFirstButton && (
                <button
                    type="button"
                    onClick={handleFirstPageButtonClick}
                    disabled={!canPreviousPage || disabled}
                    aria-label={getItemAriaLabel("first")}
                    title={getItemAriaLabel("first")}
                    className={`flex items-center gap-1 ${buttonBaseClasses} ${!canPreviousPage || disabled
                            ? buttonDisabledClasses
                            : buttonEnabledClasses
                        }`}
                    {...backIconButtonProps}
                >
                    <MdFirstPage size={20} />
                </button>
            )}

            <button
                type="button"
                onClick={handleBackButtonClick}
                disabled={!canPreviousPage || disabled}
                aria-label={getItemAriaLabel("previous")}
                title={getItemAriaLabel("previous")}
                className={`${buttonBaseClasses} ${!canPreviousPage || disabled
                        ? buttonDisabledClasses
                        : buttonEnabledClasses
                    }`}
                {...backIconButtonProps}
            >
                <MdKeyboardArrowLeft size={20} />
            </button>

            {/* Active page indicator */}
            {/* <div className="flex items-center mx-2">
        <span className="min-w-[32px] h-8 px-2 rounded-md bg-transparent border border-gray-700 text-white text-sm font-medium flex items-center justify-center">
          {currentPage}
        </span>
      </div> */}

            <button
                type="button"
                onClick={handleNextButtonClick}
                disabled={!canNextPage || disabled}
                aria-label={getItemAriaLabel("next")}
                title={getItemAriaLabel("next")}
                className={`${buttonBaseClasses} ${!canNextPage || disabled
                        ? buttonDisabledClasses
                        : buttonEnabledClasses
                    }`}
                {...nextIconButtonProps}
            >
                <MdKeyboardArrowRight size={20} />
            </button>

            {showLastButton && (
                <button
                    type="button"
                    onClick={handleLastPageButtonClick}
                    disabled={!canNextPage || disabled}
                    aria-label={getItemAriaLabel("last")}
                    title={getItemAriaLabel("last")}
                    className={`flex items-center gap-1 ${buttonBaseClasses} ${!canNextPage || disabled
                            ? buttonDisabledClasses
                            : buttonEnabledClasses
                        }`}
                    {...nextIconButtonProps}
                >
                    <MdLastPage size={20} />
                </button>
            )}
        </div>
    );
};

// Main TablePagination component
const TablePagination: React.FC<TablePaginationProps> = ({
    count,
    onPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    onRowsPerPageChange,
    labelRowsPerPage = "Rows per page:",
    labelDisplayedRows = defaultLabelDisplayedRows,
    getItemAriaLabel = defaultGetAriaLabel,
    showFirstButton = false,
    showLastButton = false,
    disabled = false,
    backIconButtonProps = {},
    nextIconButtonProps = {},
    SelectProps = {},
    className = "",
    component: Component = "div",
}) => {
    // Calculate display values - Fixed for 1-based pagination
    const from = count === 0 ? 0 : (page - 1) * rowsPerPage + 1;
    const to =
        count === -1 ? page * rowsPerPage : Math.min(count, page * rowsPerPage);

    // Process rowsPerPageOptions to handle both number[] and RowsPerPageOption[]
    const processedOptions = rowsPerPageOptions.map((option) => {
        if (typeof option === "number") {
            return { value: option, label: option.toString() };
        }
        return option;
    });

    // Show rows per page selector only if there are 2 or more options
    const showRowsPerPageSelect =
        processedOptions.length >= 0 && onRowsPerPageChange;

    // Handle select change
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onRowsPerPageChange) {
            onRowsPerPageChange(event);
        }
    };

    const baseClasses =
        "bg-transparent border-none text-muted-foreground font-medium mt-0 px-4";
    const toolbarClasses =
        "flex items-center justify-between w-full min-h-[52px] gap-4";

    return (
        <Component
            className={`${baseClasses} ${className}`}
        >
            <div className={toolbarClasses}>
                {/* Center section - rows per page selector */}
                {showRowsPerPageSelect && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {labelRowsPerPage}
                        </span>
                        <div className="relative">
                            <select
                                value={rowsPerPage}
                                onChange={handleSelectChange}
                                disabled={disabled}
                                className="bg-background border border-border rounded px-2 py-1 pr-6 text-sm text-foreground min-w-[60px] focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                                {...SelectProps}
                            >
                                {processedOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        className="bg-popover text-popover-foreground"
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                    </div>
                )}

                {/* Right section - displayed rows and navigation */}
                <div className="flex items-center space-x-6">
                    {/* Displayed rows info */}
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {count !== 0
                            ? labelDisplayedRows({ from, to, count, page })
                            : "No records found"}
                    </span>

                    {/* Navigation actions */}
                    <TablePaginationActions
                        count={count}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onPageChange}
                        showFirstButton={showFirstButton}
                        showLastButton={showLastButton}
                        disabled={disabled}
                        getItemAriaLabel={getItemAriaLabel}
                        backIconButtonProps={backIconButtonProps}
                        nextIconButtonProps={nextIconButtonProps}
                    />
                </div>
            </div>
        </Component>
    );
};

export default TablePagination;

"use client"

import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type MemberRole = "all" | "owner" | "manager" | "member";
type MemberStatus = "all" | "active" | "inactive" | "invited";

interface StaffFiltersProps {
    roleFilter: MemberRole;
    setRoleFilter: (value: MemberRole) => void;
    statusFilter: MemberStatus;
    setStatusFilter: (value: MemberStatus) => void;
    onClearFilters: () => void;
}

const ROLE_OPTIONS: { value: MemberRole; label: string }[] = [
    { value: "all", label: "All" },
    { value: "owner", label: "Owner" },
    { value: "manager", label: "Manager" },
    { value: "member", label: "Member" },
];

const STATUS_OPTIONS: { value: MemberStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "invited", label: "Invited" },
];

export function StaffFilters({
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    onClearFilters
}: StaffFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Calculate active filters count
    const activeFiltersCount = [
        roleFilter !== "all",
        statusFilter !== "all",
    ].filter(Boolean).length;

    const handleClearFilters = () => {
        onClearFilters();
        setRoleFilter("all");
        setStatusFilter("all");
    };

    return (
        <>
            <div className="flex items-center gap-4">
                {activeFiltersCount > 0 && (
                    <div className="flex items-center gap-3 animate-in fade-in duration-300">
                        <span className="text-sm text-muted-foreground">
                            {activeFiltersCount} active filter{activeFiltersCount !== 1 ? "s" : ""}
                        </span>
                        <button
                            onClick={handleClearFilters}
                            className="text-sm text-primary hover:underline font-medium transition-colors"
                        >
                            Clear all
                        </button>
                        <div className="h-4 w-px bg-border" />
                    </div>
                )}

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size='sm'
                            className="flex items-center gap-2 h-9"
                        >
                            <Filter size={16} />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Filter Staff</SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-6 p-6">
                            <div className="flex flex-col gap-3">
                                <Label className="text-sm font-medium text-muted-foreground">
                                    Role
                                </Label>
                                <RadioGroup
                                    value={roleFilter}
                                    onValueChange={(val: string) => setRoleFilter(val as MemberRole)}
                                    className="flex flex-col space-y-1"
                                >
                                    {ROLE_OPTIONS.map((option) => (
                                        <div key={option.value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option.value} id={`role-${option.value}`} />
                                            <Label htmlFor={`role-${option.value}`}>{option.label}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <p className="text-xs text-muted-foreground">
                                    {roleFilter === "all"
                                        ? "Showing all roles."
                                        : `Showing ${roleFilter}s.`}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label className="text-sm font-medium text-muted-foreground">
                                    Status
                                </Label>
                                <RadioGroup
                                    value={statusFilter}
                                    onValueChange={(val: string) => setStatusFilter(val as MemberStatus)}
                                    className="flex flex-col space-y-1"
                                >
                                    {STATUS_OPTIONS.map((option) => (
                                        <div key={option.value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option.value} id={`status-${option.value}`} />
                                            <Label htmlFor={`status-${option.value}`}>{option.label}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <p className="text-xs text-muted-foreground">
                                    {statusFilter === "all"
                                        ? "Showing all statuses."
                                        : `Showing ${statusFilter} members.`}
                                </p>
                            </div>
                        </div>

                        <SheetFooter className="flex-col sm:flex-col gap-2">
                            <Button onClick={() => setIsOpen(false)} className="w-full">
                                Show Results
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleClearFilters}
                                className="w-full text-muted-foreground hover:text-foreground"
                            >
                                Clear all
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}

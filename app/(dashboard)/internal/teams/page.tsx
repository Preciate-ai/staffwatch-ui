"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/data-table";
import { useFetchInternalUsers, useDisableUser, useRestoreUser, useResetUserPassword } from "@/services/users";
import { Badge } from "@/components/ui/badge";
import { DebouncedSearch } from "@/components/ui/debounced-search";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { CreateTeamMemberDialog } from "@/components/forms/teams/create-team-member-dialog";
import { EditTeamMemberDialog } from "@/components/forms/teams/edit-team-member-dialog";

interface IUser {
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
}

export default function Teams() {
    const [search, setSearch] = useState("");
    const [editingUser, setEditingUser] = useState<IUser | null>(null);

    // Hooks
    const { data: usersData, isLoading, refetch } = useFetchInternalUsers({ search });
    const { mutate: disableUser } = useDisableUser();
    const { mutate: restoreUser } = useRestoreUser();
    const { mutate: resetPassword } = useResetUserPassword();

    const handleResetPassword = (userId: string) => {
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";
        const randomPass = Array(12).fill(chars).map(x => x[Math.floor(Math.random() * x.length)]).join('');

        resetPassword({ userId, password: randomPass }, {
            onSuccess: () => {
                toast.success(`Password reset. New password: ${randomPass}`, {
                    duration: 10000,
                });
            },
            onError: () => {
                toast.error("Failed to reset password");
            }
        });
    };

    const handleToggleStatus = (user: IUser) => {
        if (user.status === 'active') {
            disableUser(user.id, {
                onSuccess: () => { toast.success("User disabled"); refetch(); },
                onError: () => toast.error("Failed to disable user")
            });
        } else {
            restoreUser(user.id, {
                onSuccess: () => { toast.success("User restored"); refetch(); },
                onError: () => toast.error("Failed to restore user")
            });
        }
    };

    const columns: TableColumn<IUser>[] = [
        { header: "Name", key: "name" },
        { header: "Email", key: "email" },
        {
            header: "Role",
            key: "role",
            render: (value) => value ? <Badge variant="secondary">{value}</Badge> : <span className="text-muted-foreground">-</span>
        },
        {
            header: "Status",
            key: "status",
            render: (value) => (
                <Badge variant={value === 'active' ? 'default' : 'destructive'}>
                    {value === 'active' ? 'Active' : 'Disabled'}
                </Badge>
            )
        },
        {
            header: "",
            key: "actions",
            width: "50px",
            render: (_, row) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingUser(row)}>
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(row.id)}>
                            Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(row)}>
                            {row.status === 'active' ? 'Disable' : 'Restore'} User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ];

    const users = Array.isArray(usersData) ? usersData : (usersData as any)?.results || [];

    return (
        <div className="flex flex-col h-full">
            <PageHeader
                title="Teams"
                breadcrumbs={[
                    { label: "Dashboard", href: "/internal" },
                    { label: "Teams", active: true }
                ]}
                rightElement={
                    <CreateTeamMemberDialog onSuccess={refetch} />
                }
            />

            <div className="flex-1 p-4 space-y-4">
                <div className="flex items-center space-x-2">
                    <DebouncedSearch
                        onSearch={(val) => setSearch(val)}
                        placeholder="Search users..."
                        wrapperClassName="max-w-sm"
                    />
                </div>

                <Table
                    data={users}
                    columns={columns}
                    loading={isLoading}
                    emptyMessage="No users found"
                />
            </div>

            <EditTeamMemberDialog
                open={!!editingUser}
                onOpenChange={(open) => !open && setEditingUser(null)}
                user={editingUser}
                onSuccess={refetch}
            />
        </div>
    );
}

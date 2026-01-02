"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { EditTeamMemberForm } from "./edit-team-member-form";

interface EditTeamMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    } | null;
    onSuccess?: () => void;
}

export function EditTeamMemberDialog({
    open,
    onOpenChange,
    user,
    onSuccess,
}: EditTeamMemberDialogProps) {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Internal User</DialogTitle>
                </DialogHeader>
                <EditTeamMemberForm
                    user={user}
                    onClose={() => onOpenChange(false)}
                    onSuccess={onSuccess}
                />
            </DialogContent>
        </Dialog>
    );
}

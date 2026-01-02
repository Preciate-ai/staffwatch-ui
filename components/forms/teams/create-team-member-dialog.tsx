"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateTeamMemberForm } from "./create-team-member-form";

interface CreateTeamMemberDialogProps {
    onSuccess?: () => void;
}

export function CreateTeamMemberDialog({ onSuccess }: CreateTeamMemberDialogProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Internal User</DialogTitle>
                </DialogHeader>
                <CreateTeamMemberForm
                    onClose={handleClose}
                    onSuccess={onSuccess}
                />
            </DialogContent>
        </Dialog>
    );
}

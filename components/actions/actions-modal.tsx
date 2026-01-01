"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CreateOrganizationForm } from "@/components/forms/organizations/create-organization-form";

import { cn } from "@/lib/utils";

export function ActionsModal() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const action = searchParams.get("action");

    const isOpen = !!action;

    const handleClose = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("action");
        router.replace(`${pathname}?${params.toString()}`);
    };

    let title = "";
    let description = "";
    let content = null;
    let sizeClass = "sm:max-w-[600px]"; // Default size

    switch (action) {
        case "create-project":
            title = "Create New Project";
            description = "Start a new project from scratch.";
            sizeClass = "sm:max-w-[800px]"; // Wider for project creation
            content = <div className="p-4 border border-dashed rounded-md bg-muted/50 text-center text-sm text-muted-foreground">Project creation form will go here</div>;
            break;
        case "create-organization":
            title = "Register New Organization";
            description = "Onboard a new organization to the platform.";
            sizeClass = "sm:max-w-[450px]"; // Reduced size
            content = <CreateOrganizationForm onClose={handleClose} />;
            break;
        default:
            title = "Unknown Action";
            description = "The requested action could not be found.";
            content = <div className="text-sm text-destructive">Invalid action parameter: {action}</div>;
            break;
    }

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className={cn("sm:max-w-[600px]", sizeClass)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="py-2">
                    {content}
                </div>
            </DialogContent>
        </Dialog>
    );
}

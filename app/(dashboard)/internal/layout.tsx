"use client";

import { WorkspaceProvider } from "@/components/providers/workspace-provider";
import { InternalSidebar } from "@/components/sidebar/internal-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useFetchLoggedinInternalUser } from "@/services/users";

export default function InternalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useFetchLoggedinInternalUser();

    return (
        <SidebarProvider>
            <InternalSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}

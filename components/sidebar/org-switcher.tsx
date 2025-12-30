
"use client"

import * as React from "react"
import { ChevronsUpDown, Check, Building2 } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useWorkspace } from "@/components/providers/workspace-provider"
import { useRouter } from "next/navigation"

export function OrgSwitcher() {
    const { isMobile } = useSidebar()
    const { activeOrg, organizations } = useWorkspace()
    const router = useRouter()

    const handleOrgChange = (orgId: string) => {
        // Navigate to the dashboard root of the new org
        // We don't know the project yet, so maybe just /[orgId] which might redirect to a default project if we had that logic,
        // or we force user to select project.
        // The prompt says: "Create a layout under app/(dashboard)/[orgId]/[projectId]/."
        // It doesn't specify what happens at /[orgId]/.
        // I'll assume we go to `/[orgId]` and let a page there handle it, or we assume a "select project" state.
        // However, since the structure is `[orgId]/[projectId]`, maybe we just go to `/[orgId]`
        router.push(`/${orgId}`)
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <Building2 className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeOrg?.organization.name || "Select Organization"}
                                </span>
                                <span className="truncate text-xs">
                                    {activeOrg?.role || "Member"}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Organizations
                        </DropdownMenuLabel>
                        {organizations.map((org) => (
                            <DropdownMenuItem
                                key={org.id}
                                onClick={() => handleOrgChange(org.organization.id)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm border">
                                    <Building2 className="size-4 shrink-0" />
                                </div>
                                {org.organization.name}
                                {activeOrg?.organization.id === org.organization.id && (
                                    <Check className="ml-auto h-4 w-4" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

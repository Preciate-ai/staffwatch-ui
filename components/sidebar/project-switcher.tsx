
"use client"

import * as React from "react"
import { ChevronsUpDown, Check, FolderKanban } from "lucide-react"

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

export function ProjectSwitcher() {
    const { isMobile } = useSidebar()
    const { activeProjectId, activeProject, activeOrgId, projects } = useWorkspace()
    const router = useRouter()

    if (!activeOrgId) return null;

    const handleProjectChange = (projectId: string) => {
        router.push(`/${activeOrgId}/${projectId}`)
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
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
                                <FolderKanban className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeProject?.name || "Select Project"}
                                </span>
                                <span className="truncate text-xs">
                                    {activeProject ? "Active Project" : "No project selected"}
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
                            Projects
                        </DropdownMenuLabel>
                        {projects.map((project) => (
                            <DropdownMenuItem
                                key={project.id}
                                onClick={() => handleProjectChange(project.id)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm border">
                                    <FolderKanban className="size-4 shrink-0" />
                                </div>
                                {project.name}
                                {activeProjectId === project.id && (
                                    <Check className="ml-auto h-4 w-4" />
                                )}
                            </DropdownMenuItem>
                        ))}
                        {projects.length === 0 && (
                            <div className="p-2 text-xs text-muted-foreground">No projects found</div>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

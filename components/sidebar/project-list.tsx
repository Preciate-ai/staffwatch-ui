
"use client"

import { Folder, MoreHorizontal, Trash2, Share } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useWorkspace } from "@/components/providers/workspace-provider"
import { useRouter } from "next/navigation"

export function ProjectList() {
    const { projects, activeOrgId, activeProjectId } = useWorkspace()
    const router = useRouter()
    const { isMobile } = useSidebar()

    if (!activeOrgId) return null;

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                            asChild
                            isActive={activeProjectId === item.id}
                            onClick={() => router.push(`/${activeOrgId}/${item.id}`)}
                        >
                            <button>
                                <Folder />
                                <span>{item.name}</span>
                            </button>
                        </SidebarMenuButton>
                        {/* Example Actions */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <Folder className="text-muted-foreground" />
                                    <span>View Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Share className="text-muted-foreground" />
                                    <span>Share Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Delete Project</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                {projects.length === 0 && (
                    <div className="p-4 text-sm text-muted-foreground">
                        No projects found.
                    </div>
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}

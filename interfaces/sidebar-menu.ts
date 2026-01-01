export interface SidebarMenuItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    exact?: boolean;
}

export interface SidebarMenuGroup {
    label: string;
    items: SidebarMenuItem[];
}
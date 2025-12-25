"use client"
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/app-sidebar"
import { usePathname } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-muted/10 overflow-x-hidden flex flex-col h-full">
                <div key={pathname}
                    className="flex-1 overflow-y-auto w-full h-full transition-all duration-300 animate-fadeIn"
                    id="scrollable-container"
                >
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

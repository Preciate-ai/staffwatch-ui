"use client";

import { Plus, Building2, FolderPlus, Users, Settings2, Search, Zap, Globe, Shield, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ActionsModal } from "@/components/actions/actions-modal";

export function ToolsPanel() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const triggerAction = (action: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("action", action);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="h-full w-72 border-l bg-background/50 p-0 flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-medium text-foreground">Quick Actions</h4>
                        </div>
                        <div className="grid gap-1">
                            <Button
                                variant="ghost"
                                className="justify-start gap-2 h-8 px-2 text-xs font-normal hover:bg-muted/60"
                                onClick={() => triggerAction("create-project")}
                            >
                                <FolderPlus className="h-3.5 w-3.5 text-blue-500" />
                                New Project
                            </Button>
                            <Button
                                variant="ghost"
                                className="justify-start gap-2 h-8 px-2 text-xs font-normal hover:bg-muted/60"
                                onClick={() => triggerAction("create-organization")}
                            >
                                <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                                New Organization
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-medium text-foreground">Management</h4>
                        </div>
                        <div className="grid gap-1">
                            <Button variant="ghost" className="justify-start gap-2 h-8 px-2 text-xs font-normal hover:bg-muted/60">
                                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                Global Settings
                            </Button>
                            <Button variant="ghost" className="justify-start gap-2 h-8 px-2 text-xs font-normal hover:bg-muted/60">
                                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                                Security Audit
                            </Button>
                            <Button variant="ghost" className="justify-start gap-2 h-8 px-2 text-xs font-normal hover:bg-muted/60">
                                <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                                System Logs
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-medium text-foreground">Platform Status</h4>
                            <Badge variant="outline" className="text-[10px] h-4 px-1 py-0 border-green-200 text-green-700 bg-green-50">Operational</Badge>
                        </div>
                        <Card className="rounded-md border shadow-none bg-muted/20">
                            <CardContent className="p-3 space-y-2">
                                <div className="flex items-center justify-between text-[10px]">
                                    <span className="text-muted-foreground">Uptime (30d)</span>
                                    <span className="font-mono">99.99%</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px]">
                                    <span className="text-muted-foreground">Current Load</span>
                                    <span className="font-mono text-green-600">Low</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px]">
                                    <span className="text-muted-foreground">Version</span>
                                    <span className="font-mono">v2.4.0</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="p-3 border-t bg-muted/10">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground h-8 text-xs hover:text-foreground">
                    <Settings2 className="h-3.5 w-3.5" />
                    Configure Tools
                </Button>
            </div>

            <ActionsModal />
        </div>
    );
}


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">Manage your organization's projects.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> New Project
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Example Projects */}
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle>Project Alpha {i}</CardTitle>
                            <CardDescription>Internal Development</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Last active: 2 hours ago</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="flex justify-center mb-8">
                    <Logo size="lg" />
                </div>
                {children}
            </div>
        </div>
    );
}

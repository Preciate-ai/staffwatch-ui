
"use client";

import React from "react";
import { useWorkspace } from "@/components/providers/workspace-provider";

interface PermissionGateProps {
    children: React.ReactNode;
    role: string | string[]; // Allowed roles
}

export const PermissionGate = ({ children, role }: PermissionGateProps) => {
    const { activeOrg } = useWorkspace();

    if (!activeOrg) {
        return null;
    }

    const currentRole = activeOrg.role; // Assuming this is the string role e.g. 'ADMIN' or 'admin'
    const allowedRoles = Array.isArray(role) ? role : [role];

    // Normalize comparison
    const hasPermission = allowedRoles.some(r => r.toUpperCase() === currentRole.toUpperCase());

    if (!hasPermission) {
        return null;
    }

    return <>{children}</>;
};

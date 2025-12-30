
export interface Organization {
    id: string;
    name: string;
    domain: string;
    createdAt: string;
    updatedAt: string;
}

export interface PermissionOverrides {
    add: string[];
    remove: string[];
}

export interface OrganizationMember {
    id: string;
    organizationId: string;
    userId: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    permissionOverrides: PermissionOverrides;
    organization: Organization;
}

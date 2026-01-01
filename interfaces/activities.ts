import { Account } from "./auth.interfaces";

export enum ActivityLogType {
    PROJECT = 'project',
    ORGANIZATION = 'organization',
    USER = 'user',
    SYSTEM = 'system'
}

export enum ActivityLogAction {
    // Project Actions
    PROJECT_CREATED = 'project_created',
    PROJECT_UPDATED = 'project_updated',
    PROJECT_ARCHIVED = 'project_archived',
    PROJECT_DELETED = 'project_deleted',
    PROJECT_MEMBER_ADDED = 'project_member_added',
    PROJECT_MEMBER_REMOVED = 'project_member_removed',
    PROJECT_MEMBER_UPDATED = 'project_member_updated',

    // Auth & User Actions
    USER_LOGIN = 'user_login',
    USER_REGISTERED = 'user_registered',

    // Organization Actions
    ORG_MEMBER_INVITED = 'org_member_invited'
}

export interface IActivityLog {
    type: ActivityLogType;
    action: ActivityLogAction;
    description: string;
    organizationId?: string;
    projectId?: string;
    actorId: string; // User who performed the action
    actor: Account
    targetId?: string; // ID of the entity being acted upon (e.g. user added)
    metadata?: Record<string, any>;
}

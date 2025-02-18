type NotificationModel = NotificationData & {
    _morphType: 'notification';
    id: string;
    notifiable_id: string;
    notifiable_type: string;
    organization_id: string | null;
    read_at: string;
    created_at: string;
    updated_at: string;
};

type AddedToOrganization = {
    type: 'added-to-organization';
    data: {
        organization: Organization | null;
        sender: User | null;
        role: string;
    };
};

type AddedToProject = {
    type: 'added-to-project';
    data: {
        project: Project | null; //with org
        sender: User | null;
        role: string;
    };
};

type AddedToProjects = {
    type: 'added-to-projects';
    data: {
        organization: Organization | null;
        sender: User | null;
        projects: Project[];
        role: string;
    };
};

type AddedToReview = {
    type: 'added-to-review';
    data: {
        review: Review | null;
        sender: User | null;
    };
};

type AddedToUserAsset = {
    type: 'added-to-user-asset';
    data: {
        role: AssetMemberRole;
        asset: UserAsset | null;
        sender: User | null;
    };
};

type AssetAnnotationMention = {
    type: 'asset-annotation-mention';
    data: {
        comment: AssetAnnotationComment | null;
    };
};

type UserAssetAnnotationMention = {
    type: 'user-asset-annotation-mention';
    data: {
        comment: UserAssetAnnotationComment | null;
    };
};

type MemberInvitesLinked = {
    type: 'member-invites-linked';
    data: {
        organizations: Organization[];
    };
};

type OrganizationJoinRequest = {
    type: 'organization-join-request';
    data: {
        organization: Organization | null;
        sender: User | null;
        role: string;
    };
};

type OrganizationMemberAccepted = {
    type: 'organization-member-accepted';
    data: {
        organization: Organization | null;
        user: User | null;
        role: string;
    };
};

type OrganizationMemberApproved = {
    type: 'organization-member-approved';
    data: {
        organization: Organization | null;
        sender: User | null;
        role: string;
    };
};

type OrganizationMemberRoleRequested = {
    type: 'organization-member-role-requested';
    data: {
        organization: Organization | null;
        user: User | null;
        role: string;
    };
};

type OrganizationOwnershipTransferred = {
    type: 'organization-ownership-transferred';
    data: {
        organization: Organization | null;
        sender: User | null;
    };
};

type ProjectJoinRequest = {
    type: 'project-join-request';
    data: {
        project: Project | null; //with org
        user: User | null;
        role: string;
    };
};

type ProjectMemberApproved = {
    type: 'project-member-approved';
    data: {
        project: Project | null; //with org
        sender: User | null;
        role: string;
    };
};

type ProjectMemberRoleRequested = {
    type: 'project-member-role-requested';
    data: {
        project: Project | null; //with org
        user: User | null;
        role: string;
    };
};

type ReviewMention = {
    type: 'review-mention';
    data: {
        comment: ReviewComment | null;
    };
};

type ReviewStatusUpdated = {
    type: 'review-status-updated';
    data: {
        review: Review | null;
        user: User | null;
        previousStatus: string;
        newStatus: string;
    };
};

type UserAssetAccessRequested = {
    type: 'user-asset-access-requested';
    data: {
        role: AssetMemberRole;
        asset: UserAsset | null;
        sender: User | null;
    };
};

type NotificationData =
    | AddedToOrganization
    | AddedToProject
    | AddedToProjects
    | AddedToReview
    | AddedToUserAsset
    | AssetAnnotationMention
    | MemberInvitesLinked
    | OrganizationJoinRequest
    | OrganizationMemberAccepted
    | OrganizationMemberApproved
    | OrganizationMemberRoleRequested
    | OrganizationOwnershipTransferred
    | ProjectJoinRequest
    | ProjectMemberApproved
    | ProjectMemberRoleRequested
    | ReviewMention
    | ReviewStatusUpdated
    | UserAssetAnnotationMention
    | UserAssetAccessRequested;

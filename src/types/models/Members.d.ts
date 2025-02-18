type Member = {
    type: 'organizationPermissions';
    unreadNotificationsCount: number;
    organizationTier: OrganizationTier | null;
    organizationTierDisplay: OrganizationTierDisplay | null;
    isLocked: boolean;
    supportsTeams: boolean;
    hasTestingAccess: boolean;
    organizationMember: OrganizationMember | null;
    organizationGates: MemberGates;
    projectMember: ProjectMember | null;
    projectGates: MemberGates;
};

type MemberGates = {
    viewer: boolean;
    commenter: boolean;
    contributor: boolean;
    editor: boolean;
    reviewer: boolean;
    admin: boolean;
    owner: boolean;
};

type OrganizationMember = {
    _morphType: 'organizationMember';
    id: string;
    organization_id: string;
    user_id: string | null;
    added_by_id: string | null;
    role: MemberRole;
    role_display: string;
    requested_role: MemberRole | null;
    requested_role_display: string | null;
    email: string | null;
    is_pending_acceptance: boolean;
    is_pending_approval: boolean;
    has_api_key: boolean;
    created_at: string;
    updated_at: string;
    projects_count?: number;
    user?: User;
    added_by?: User;
    organization?: Organization;
    projects?: Project[];
};

type ProjectMember = {
    created_at: string;
    updated_at: string;
    project_id: string;
    organization_member_id: string;
    added_by_id: string | null;
    role: MemberRole;
    role_display: string;
    requested_role: MemberRole | null;
    requested_role_display: string | null;
    is_pending_approval: boolean;
    organization_member: OrganizationMember;
    added_by?: User;
};

type UserAssetMember = {
    user_asset_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    role: AssetMemberRole;
    requested_role: AssetMemberRole | null;
    user: User;
};

type AssetMember = {
    type: 'userAssetPermissions';
    isOwner: boolean;
    isMember: boolean;
    hasAvailableStorage: boolean;
    role: AssetMemberRole | null;
    requestedRole: AssetMemberRole | null;
};

type AssetMemberRole = 'commenter' | 'editor' | 'pending' | 'viewer';

type MemberRole = 'viewer' | 'commenter' | 'contributor' | 'editor' | 'reviewer' | 'admin' | 'owner';

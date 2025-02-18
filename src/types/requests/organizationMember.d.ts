type GetOrganizationMembersRequest = {
    orgId: string;
    options?: QueryFilterOptions;
};

type StoreOrganizationMemberRequest = {
    orgId: string;
    email: string;
    role: MemberRole;
};

type GetOrganizationMemberRequest = {
    orgId: string;
    memberId: string;
};

type GetInvitedOrganizationMemberRequest = {
    code: string;
};

type UpdateOrganizationMemberRequest = {
    orgId: string;
    memberId: string;
    role: MemberRole;
    clear_requested_role?: boolean;
};

type ResendOrganizationMemberInviteRequest = {
    orgId: string;
    memberId: string;
};

type ApproveOrganizationMemberRequest = {
    orgId: string;
    memberId: string;
    role: MemberRole;
};

type GetOrganizationMemberProjectsQuickAddRequest = {
    orgId: string;
    memberId: string;
};

type AddOrganizationMemberToProjectsRequest = {
    orgId: string;
    memberId: string;
    projects: string[];
    role: MemberRole;
};

type TransferOrganizationOwnershipRequest = {
    orgId: string;
    memberId: string;
};

type RemoveOrganizationMemberRequest = {
    orgId: string;
    memberId: string;
};

type GetOwnOrganizationMemberRequest = {
    orgId: string;
};

type AcceptOrganizationMemberRequest = {
    orgId: string;
};

type RequestOrganizationMemberRoleRequest = {
    orgId: string;
    role: MemberRole | null;
};

type ManageOrganizationMemberApiKeyRequest = {
    orgId: string;
    remove?: boolean;
};

type JoinOrganizationRequest = {
    orgId: string;
    code: string;
    role: MemberRole;
};

type LeaveOrganizationRequest = {
    orgId: string;
};

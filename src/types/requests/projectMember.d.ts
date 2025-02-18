type GetProjectMembersRequest = {
    projectId: string;
    options?: QueryFilterOptions;
};

type GetProjectMembersForMentionsRequest = {
    projectId: string;
};

type GetProjectMembersQuickAddRequest = {
    projectId: string;
};

type GetProjectReviewersQuickAddRequest = {
    projectId: string;
};

type StoreProjectMemberRequest = {
    projectId: string;
    role: MemberRole;
    email?: string;
    member_ids?: string[];
};

type UpdateProjectMemberRequest = {
    projectId: string;
    memberId: string;
    role: MemberRole;
    clear_requested_role?: boolean;
};

type ResendProjectMemberInviteRequest = {
    projectId: string;
    memberId: string;
};

type ApproveProjectMemberRequest = {
    projectId: string;
    memberId: string;
    role: MemberRole;
};

type DeleteProjectMemberRequest = {
    projectId: string;
    memberId: string;
};

type GetOwnProjectMemberRequest = {
    projectId: string;
};

type JoinProjectRequest = {
    projectId: string;
    code: string;
    role: MemberRole;
};

type RequestProjectMemberRoleRequest = {
    projectId: string;
    role: MemberRole | null;
};

type LeaveProjectRequest = {
    projectId: string;
};

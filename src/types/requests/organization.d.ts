type GetOrganizationsRequest = {
    options?: QueryFilterOptions;
};

type GetOrganizationRequest = {
    orgId: string;
};

type GetSharedOrganizationRequest = {
    code: string;
};

type StoreOrganizationRequest = {
    name: string;
};

type UpdateOrganizationRequest = {
    orgId: string;
    name?: string;
    joinable?: boolean;
};

type ArchiveOrganizationRequest = {
    orgId: string;
};

type RestoreOrganizationRequest = {
    orgId: string;
};

type UpdateOrganizationAvatarRequest = {
    avatar: FormData;
    orgId: string;
};

type GetOrganizationProjectsRequest = {
    orgId: string;
    options?: QueryFilterOptions;
};

type StoreOrganizationProjectRequest = {
    orgId: string;
    name: string;
};

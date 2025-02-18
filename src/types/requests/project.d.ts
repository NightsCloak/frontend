type GetProjectsRequest = {
    options?: QueryFilterOptions;
};

type GetProjectRequest = {
    projectId: string;
};

type GetSharedProjectRequest = {
    code: string;
};

type UpdateProjectRequest = {
    projectId: string;
    name?: string;
    is_published?: boolean;
    joinable?: boolean;
};

type ArchiveProjectRequest = {
    projectId: string;
};

type RestoreProjectRequest = {
    projectId: string;
};

type UpdateProjectAvatarRequest = {
    projectId: string;
    avatar: FormData;
};

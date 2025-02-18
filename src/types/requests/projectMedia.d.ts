type GetProjectsMediaRequest = {
    projectId: string;
    options?: QueryFilterOptions;
};

type GetProjectsRecentMediaRequest = {
    projectId: string;
};

type StoreProjectMediaRequest = {
    projectId: string;
    form: FormData;
};

type StoreProjectMediaFileRequest = {
    projectId: string;
    mediaId: string;
    form: FormData;
};

type UpdateProjectMediaRequest = {
    projectId: string;
    mediaId: string;
    name: string;
};

type ArchiveProjectMediaRequest = {
    projectId: string;
    mediaId: string;
};

type ArchiveBulkProjectMediaRequest = {
    projectId: string;
    media: string[];
};

type RestoreProjectMediaRequest = {
    projectId: string;
    mediaId: string;
};

type RestoreBulkProjectMediaRequest = {
    projectId: string;
    media: string[];
};

type PurgeProjectMediaRequest = {
    projectId: string;
    mediaId: string;
};

type EmptyProjectMediaTrashRequest = {
    projectId: string;
};

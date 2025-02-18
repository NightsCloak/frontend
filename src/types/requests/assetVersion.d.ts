type GetAssetVersionsRequest = {
    projectId: string;
    assetId: string;
    options?: QueryFilterOptions;
};

type GetAssetVersionRequest = {
    projectId: string;
    assetId: string;
    versionId: string;
    options?: QueryFilterOptions;
};

type StoreAssetVersionRequest = {
    projectId: string;
    assetId: string;
};

type UpdateAssetVersionRequest = {
    projectId: string;
    assetId: string;
    versionId: string;
    name?: string;
    activate?: boolean;
};

type DownloadAssetVersionRequest = {
    projectId: string;
    assetId: string;
    versionId: string;
};

type ArchiveAssetVersionRequest = {
    projectId: string;
    assetId: string;
    versionId: string;
};

type GetSharedAssetVersionsRequest = {
    code: string;
};

type GetSharedPresentationAssetVersionsRequest = {
    code: string;
    assetId: string;
};

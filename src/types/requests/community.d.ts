type GetCommunityProjectsRequest = {
    options?: QueryFilterOptions;
};

type GetCommunityProjectRequest = {
    projectId: string;
};

type GetCommunityProjectAssetsRequest = {
    projectId: string;
    options?: QueryFilterOptions;
};

type GetCommunityProjectAssetRequest = {
    projectId: string;
    assetId: string;
    options?: QueryFilterOptions;
};

type CopyCommunityProjectAssetRequest = {
    projectId: string;
    assetId: string;
    project_id?: string;
    collection_id?: string;
};

type DownloadCommunityProjectAssetRequest = {
    projectId: string;
    assetId: string;
};

type GetCommunityCollectionsRequest = {
    options?: QueryFilterOptions;
};

type GetCommunityCollectionRequest = {
    collectionId: string;
};

type GetCommunityCollectionAssetsRequest = {
    collectionId: string;
    options?: QueryFilterOptions;
};

type GetCommunityCollectionAssetRequest = {
    collectionId: string;
    assetId: string;
    options?: QueryFilterOptions;
};

type CopyCommunityCollectionAssetRequest = {
    collectionId: string;
    assetId: string;
    project_id?: string;
    collection_id?: string;
};

type DownloadCommunityCollectionAssetRequest = {
    collectionId: string;
    assetId: string;
};

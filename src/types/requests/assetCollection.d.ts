type GetAssetCollectionsRequest = {
    projectId: string;
    options?: QueryFilterOptions;
};

type GetAllAssetCollectionsRequest = {
    projectId: string;
};

type GetAssetCollectionRequest = {
    projectId: string;
    collectionId: string;
};

type StoreAssetCollectionRequest = {
    projectId: string;
    name: string;
    asset_id?: string;
};

type StoreAssetCollectionThumbnailRequest = {
    projectId: string;
    collectionId: string;
    form: FormData;
};

type UpdateAssetCollectionRequest = {
    projectId: string;
    collectionId: string;
    name?: string;
    is_published?: boolean;
    assets?: string[];
    thumbnail_assets?: string[];
};

type ArchiveAssetCollectionRequest = {
    projectId: string;
    collectionId: string;
};

type ArchiveAssetCollectionsRequest = {
    projectId: string;
    collections: string[];
};

type PurgeAssetCollectionRequest = {
    projectId: string;
    collectionId: string;
};

type RestoreAssetCollectionRequest = {
    projectId: string;
    collectionId: string;
};

type RestoreAssetCollectionsRequest = {
    projectId: string;
    collections: string[];
};

type EmptyAssetCollectionsTrashRequest = {
    projectId: string;
};

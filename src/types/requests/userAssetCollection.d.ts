type GetUserAssetCollectionsRequest = {
    options?: QueryFilterOptions;
};

type GetUserAssetCollectionRequest = {
    collectionId: string;
};

type StoreUserAssetCollectionRequest = {
    name: string;
    asset_id?: string;
};

type StoreUserAssetCollectionThumbnailRequest = {
    collectionId: string;
    form: FormData;
};

type UpdateUserAssetCollectionRequest = {
    collectionId: string;
    name?: string;
    is_published?: boolean;
    assets?: string[];
};

type ArchiveUserAssetCollectionRequest = {
    collectionId: string;
};

type RestoreUserAssetCollectionRequest = {
    collectionId: string;
};

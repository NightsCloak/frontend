type GetUserAssetSavesRequest = {
    assetId: string;
    options?: QueryFilterOptions;
};

type StoreUserAssetSaveRequest = {
    assetId: string;
} & AssetSaveContent;

type UpdateUserAssetSaveRequest = {
    assetId: string;
    saveId: string;
    name?: string;
    is_active?: boolean;
};

type UpdateUserAssetQuickSaveRequest = {
    assetId: string;
} & AssetSaveContent;

type DeleteUserAssetSaveRequest = {
    assetId: string;
    saveId: string;
};

type DeleteUserAssetQuickSaveRequest = {
    assetId: string;
};

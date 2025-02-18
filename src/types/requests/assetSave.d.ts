type GetAssetSavesRequest = {
    projectId: string;
    assetId: string;
    options?: QueryFilterOptions;
};

type StoreAssetSaveRequest = {
    projectId: string;
    assetId: string;
} & AssetSaveContent;

type UpdateAssetSaveRequest = {
    projectId: string;
    assetId: string;
    saveId: string;
    name?: string;
    is_active?: boolean;
};

type UpdateAssetQuickSaveRequest = {
    projectId: string;
    assetId: string;
} & AssetSaveContent;

type DeleteAssetSaveRequest = {
    projectId: string;
    assetId: string;
    saveId: string;
};

type DeleteAssetQuickSaveRequest = {
    projectId: string;
    assetId: string;
};

type GetSharedAssetSavesRequest = {
    code: string;
    options?: QueryFilterOptions;
};

type GetSharedPresentationAssetSavesRequest = {
    code: string;
    assetId: string;
    options?: QueryFilterOptions;
};

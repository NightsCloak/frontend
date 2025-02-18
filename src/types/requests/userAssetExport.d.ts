type GetUserAssetExportRequest = {
    assetId: string;
    options?: QueryFilterOptions;
};

type StoreUserAssetExportRequest = {
    assetId: string;
    type: AssetExportType;
};

type StoreUserAssetExportTextureRequest = {
    assetId: string;
    exportId: string;
    form: FormData;
};

type FinalizeUserAssetExportRequest = {
    assetId: string;
    exportId: string;
};

type UpdateUserAssetExportRequest = {
    assetId: string;
    exportId: string;
    name?: string;
};

type DeleteUserAssetExportRequest = {
    assetId: string;
    exportId: string;
};

type RestoreUserAssetExportRequest = {
    assetId: string;
    exportId: string;
};

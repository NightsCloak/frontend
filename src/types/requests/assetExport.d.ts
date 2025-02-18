type GetAssetExportRequest = {
    projectId: string;
    assetId: string;
    options?: QueryFilterOptions;
};

type StoreAssetExportRequest = {
    projectId: string;
    assetId: string;
    type: AssetExportType;
};

type StoreAssetExportTextureRequest = {
    projectId: string;
    assetId: string;
    exportId: string;
    form: FormData;
};

type FinalizeAssetExportRequest = {
    projectId: string;
    assetId: string;
    exportId: string;
};

type UpdateAssetExportRequest = {
    projectId: string;
    assetId: string;
    exportId: string;
    name?: string;
};

type DeleteAssetExportRequest = {
    projectId: string;
    assetId: string;
    exportId: string;
};

type RestoreAssetExportRequest = {
    projectId: string;
    assetId: string;
    exportId: string;
};

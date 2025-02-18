type GetIngestAssetsRequest = {
    projectId: string;
    options?: QueryFilterOptions;
};

type CreateIngestAssetRequest = {
    projectId: string;
    flags?: string;
};

type StoreIngestAssetFileRequest = {
    projectId: string;
    ingestAssetId: string;
    body: FormData;
};

type DeleteIngestAssetRequest = {
    projectId: string;
    ingestAssetId: string;
};

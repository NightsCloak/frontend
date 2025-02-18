type StoreAITextureBatchRequest = {
    model: AiTextureModel;
    n: number;
    prompt?: string;
    texture_id?: string;
};

type GetAiTextureBatchRequest = {
    batchId: string;
};

type UpdateAiTextureRequest = {
    textureId: string;
    name?: string;
    tags?: string[];
};

type ArchiveAiTextureRequest = {
    textureId: string;
};

type RestoreAiTextureRequest = {
    textureId: string;
};

type GetUserAiTexturesRequest = {
    options?: QueryFilterOptions;
};

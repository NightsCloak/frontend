type UserAiTexturesResponse = {
    data: AiTexture[];
} & Pagination;

type AiTextureFailedEvent = {
    message: string;
};

type AiTextureBatch = {
    _morphType: 'aiTextureBatch';
    id: string;
    user_id: string;
    texture_id: string;
    model: AiTextureModel;
    model_details: AiTextureModelDetails;
    prompt: string | null;
    count: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    created_at: string;
    updated_at: string;
    user?: User;
    textures?: AiTexture[];
};

type AiTexture = {
    _morphType: 'aiTexture';
    id: string;
    user_id: string;
    batch_id: string;
    model: AiTextureModel;
    model_details: AiTextureModelDetails;
    name: string;
    prompt: string;
    file: string;
    file_size: FileSize;
    file_route: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    user?: User;
    tags?: Tag[];
};

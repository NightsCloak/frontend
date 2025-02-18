type AiTextureModel =
    | 'dalle-2-standard-variation-1024x1024'
    | 'dalle-2-standard-1024x1024'
    | 'dalle-3-standard-1024x1024'
    | 'dalle-3-standard-1024x1792'
    | 'dalle-3-standard-1792x1024'
    | 'dalle-3-hd-1024x1024'
    | 'dalle-3-hd-1024x1792'
    | 'dalle-3-hd-1792x1024';

type AiTextureModelDetails = {
    model: 'dall-e-2' | 'dall-e-3';
    size: '1024x1024' | '1024x1792' | '1792x1024';
    quality: 'standard' | 'hd';
    can_variate: boolean;
};

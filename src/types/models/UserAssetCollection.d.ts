type UserAssetCollection = {
    _morphType: 'userAssetCollection';
    id: string;
    user_id: string;
    name: string;
    thumbnail: string | null;
    thumbnail_route: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user?: User;
    assets_count?: number;
};

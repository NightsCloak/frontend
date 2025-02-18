type InternalStats = {
    [key: string]: number;
    ai_texture_batches: number;
    ai_textures: number;
    asset_annotation_comments: number;
    asset_annotations: number;
    asset_collections: number;
    asset_exports: number;
    asset_saves: number;
    assets: number;
    intract_assets: number;
    organizations: number;
    projects: number;
    project_media: number;
    review_comments: number;
    reviews: number;
    roblox_avatar_decks: number;
    user_asset_annotation_comments: number;
    user_asset_annotations: number;
    user_asset_collections: number;
    user_asset_exports: number;
    user_asset_saves: number;
    user_assets: number;
    user_textures: number;
    users: number;
    recent_active_users: number;
};

type UserSnapshots = {
    data: UserSnapshot[];
} & Pagination;

type UserSnapshot = {
    id: string;
    total: number;
    trashed: number;
    unverified: number;
    paid_member: number;
    recently_active: number;
    created_at: string;
    updated_at: string;
};

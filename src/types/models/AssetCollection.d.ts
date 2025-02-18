type AssetCollection = {
    _morphType: 'assetCollection';
    id: string;
    project_id: string;
    name: string;
    thumbnail: string | null;
    thumbnail_route: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    project?: Project;
    assets_count?: number;
    thumbnail_assets?: Asset[];
    member?: Member;
};

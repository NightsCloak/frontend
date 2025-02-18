type AssetPresentation = {
    _morphType: 'assetPresentation';
    id: string;
    project_id: string;
    user_id: string;
    name: string;
    shareable_route: string;
    is_asset_versions_shared: boolean;
    is_asset_materials_shared: boolean;
    is_asset_downloadable_shared: boolean;
    created_at: string;
    updated_at: string;
    project?: Project;
    assets?: Asset[];
    member?: Member;
};

type AssetSave = {
    _morphType: 'assetSave';
    id: string;
    asset_id: string;
    asset_version_id: string | null;
    name: string;
    content: AssetSaveContent;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

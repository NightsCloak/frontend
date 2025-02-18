type UserAssetExport = {
    _morphType: 'userAssetExport';
    id: string;
    user_asset_id: string;
    user_asset_version_id: string | null;
    user_asset_save_id: string | null;
    name: string;
    size: FileSize;
    is_pending: boolean;
    type: AssetExportType;
    files: AssetExportFileItem[];
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

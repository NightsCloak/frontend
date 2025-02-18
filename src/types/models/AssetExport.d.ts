type AssetExport = {
    _morphType: 'assetExport';
    id: string;
    asset_id: string;
    asset_version_id: string | null;
    save_id: string;
    name: string;
    size: FileSize;
    is_pending: boolean;
    type: AssetExportType;
    files: AssetExportFileItem[];
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

type AssetExportType = 'textures' | 'glb';

type AssetExportFileItem = {
    name: string;
    route: string;
};

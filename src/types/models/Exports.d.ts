type AssetExportState = 'ingest' | 'preparing' | 'processing' | 'completing' | 'completed' | 'failed';

type AssetExportFileItem = {
    name: string;
    route: string;
};

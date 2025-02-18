type Download = {
    _morphType: 'download';
    id: string;
    is_pending: boolean;
    is_failed: boolean;
    file_size: FileSize;
    file_route: string | null;
    created_at: string;
    updated_at: string;
};

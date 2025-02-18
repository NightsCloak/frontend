type ProjectMedia = {
    _morphType: 'projectMedia';
    id: string;
    project_id: string;
    user_id: string;
    name: string | null;
    extension: string | null;
    file: string | null;
    file_route: string | null;
    file_size: FileSize;
    is_within_one_hour: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    project?: Project;
    user?: User;
};

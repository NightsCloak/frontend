type Texture = {
    _morphType: 'texture';
    id: string;
    name: string;
    type: string;
    file: string;
    file_size: FileSize;
    file_route: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    tags?: Tag[];
};

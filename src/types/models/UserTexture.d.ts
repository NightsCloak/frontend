type UserTexture = {
    _morphType: 'userTexture';
    id: string;
    user_id: string;
    name: string;
    file: string;
    file_size: FileSize;
    file_route: string;
    created_at: string;
    updated_at: string;
    tags?: Tag[];
    user?: User;
};

type SelectedImage = {
    id: string;
    image: File | Blob;
    name: string;
    b64: string;
};

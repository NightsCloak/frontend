type GetUserTexturesRequest = {
    options?: QueryFilterOptions;
};

type StoreUserTextureRequest = {
    form: FormData;
};

type UpdateUserTextureRequest = {
    textureId: string;
    name?: string;
    tags?: string[];
};

type DeleteUserTextureRequest = {
    textureId: string;
};

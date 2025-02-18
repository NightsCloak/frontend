type GetEnvironmentTexturesRequest = {
    admin: boolean;
    options?: QueryFilterOptions;
};

type StoreEnvironmentTexturesRequest = {
    form: FormData;
};

type UpdateEnvironmentTexturesRequest = {
    textureId: string;
    name?: string;
    is_published?: boolean;
};

type DeleteEnvironmentTexturesRequest = {
    textureId: string;
};

type GetTagsRequest = {
    options?: QueryFilterOptions;
};

type StoreTagRequest = {
    name: string;
    type: string;
};

interface UpdateTagRequest {
    tagId: string;
    name: string;
}

type DeleteTagRequest = {
    tagId: string;
};

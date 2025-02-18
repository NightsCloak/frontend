type GetReviewsRequest = {
    projectId: string;
    options?: QueryFilterOptions;
};

type GetReviewRequest = {
    projectId: string;
    reviewId: string;
    options?: QueryFilterOptions;
};

type StoreReviewRequest = {
    projectId: string;
    form: FormData;
    // name: string;
    // asset_id: string;
    // content?: string | null;
    // attachments?: [];
};

type UpdateReviewRequest = {
    projectId: string;
    reviewId: string;
    name?: string;
    status?: ReviewStatus;
};

type UpdateReviewersRequest = {
    projectId: string;
    reviewId: string;
    members: string[];
};

type ArchiveReviewRequest = {
    projectId: string;
    reviewId: string;
};

type ArchiveReviewsRequest = {
    projectId: string;
    reviews: string[];
};

type RestoreReviewRequest = {
    projectId: string;
    reviewId: string;
};

type RestoreReviewsRequest = {
    projectId: string;
    reviews: string[];
};

type PurgeReviewRequest = {
    projectId: string;
    reviewId: string;
};

type EmptyReviewsTrashRequest = {
    projectId: string;
};

type GetReviewCommentsRequest = {
    projectId: string;
    reviewId: string;
};

type StoreReviewCommentRequest = {
    projectId: string;
    reviewId: string;
    form: FormData;
    // content?: string | null;
    // attachments?: [];
};

type UpdateReviewCommentRequest = {
    projectId: string;
    reviewId: string;
    commentId: string;
    content: string;
};

type DestroyReviewCommentAttachmentRequest = {
    projectId: string;
    reviewId: string;
    commentId: string;
    file: string;
};

type DestroyReviewCommentRequest = {
    projectId: string;
    reviewId: string;
    commentId: string;
};

type GetAssetAnnotationCommentsRequest = {
    projectId: string;
    assetId: string;
    annotationId: string;
};

type GetSharedAssetAnnotationCommentsRequest = {
    code: string;
    annotationId: string;
};

type GetSharedPresentationAssetAnnotationCommentsRequest = {
    code: string;
    assetId: string;
    annotationId: string;
};

type StoreAssetAnnotationCommentRequest = {
    projectId: string;
    assetId: string;
    annotationId: string;
    form: FormData;
    // content?: string;
    // attachments?: [];
};

type StoreSharedAssetAnnotationCommentRequest = {
    code: string;
    annotationId: string;
    form: FormData;
    // content?: string;
    // attachments?: [];
};

type StoreSharedPresentationAssetAnnotationCommentRequest = {
    code: string;
    assetId: string;
    annotationId: string;
    form: FormData;
    // content?: string;
    // attachments?: [];
};

type UpdateAssetAnnotationCommentRequest = {
    projectId: string;
    assetId: string;
    annotationId: string;
    commentId: string;
    content: string;
};

type UpdateSharedAssetAnnotationCommentRequest = {
    code: string;
    annotationId: string;
    commentId: string;
    content: string;
};

type DestroySharedAssetAnnotationCommentAttachmentRequest = {
    code: string;
    annotationId: string;
    commentId: string;
    file: string;
};

type UpdateSharedPresentationAssetAnnotationCommentRequest = {
    code: string;
    assetId: string;
    annotationId: string;
    commentId: string;
    content: string;
};

type DestroyAssetAnnotationCommentAttachmentRequest = {
    projectId: string;
    assetId: string;
    annotationId: string;
    commentId: string;
    file: string;
};

type DestroyAssetAnnotationCommentRequest = {
    projectId: string;
    assetId: string;
    annotationId: string;
    commentId: string;
};

type DestroySharedAssetAnnotationCommentRequest = {
    code: string;
    annotationId: string;
    commentId: string;
};

type DestroySharedPresentationAssetAnnotationCommentAttachmentRequest = {
    code: string;
    assetId: string;
    annotationId: string;
    commentId: string;
    file: string;
};

type DestroySharedPresentationAssetAnnotationCommentRequest = {
    code: string;
    assetId: string;
    annotationId: string;
    commentId: string;
};

type GetUserAssetAnnotationCommentsRequest = {
    assetId: string;
    annotationId: string;
};

type StoreUserAssetAnnotationCommentRequest = {
    assetId: string;
    annotationId: string;
    content: string;
};

type UpdateUserAssetAnnotationCommentRequest = {
    assetId: string;
    annotationId: string;
    commentId: string;
    content: string;
};

type DestroyUserAssetAnnotationCommentRequest = {
    assetId: string;
    annotationId: string;
    commentId: string;
};

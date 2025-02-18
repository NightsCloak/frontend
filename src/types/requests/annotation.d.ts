type GetAssetAnnotationsRequest = {
    projectId: string;
    assetId: string;
    options?: QueryFilterOptions;
};

type GetSharedAssetAnnotationsRequest = {
    code: string;
    options?: QueryFilterOptions;
};

type GetSharedPresentationAssetAnnotationsRequest = {
    code: string;
    assetId: string;
    options?: QueryFilterOptions;
};

type StoreAssetAnnotationsRequest = {
    projectId: string;
    assetId: string;
    form: FormData;
    // data: AnnotationData;
    // content: string;
    // attachments?: [];
};

type StoreSharedAssetAnnotationsRequest = {
    code: string;
    form: FormData;
    // data: AnnotationData;
    // content: string;
    // attachments?: [];
};

type StoreSharedPresentationAssetAnnotationsRequest = {
    code: string;
    assetId: string;
    form: FormData;
    // data: AnnotationData;
    // content: string;
    // attachments?: [];
};

type UpdateAssetAnnotationsRequest = {
    projectId: string;
    assetId: string;
    annotationId: string;
    state: AnnotationState;
};

type UpdateSharedAssetAnnotationsRequest = {
    code: string;
    annotationId: string;
    state: AnnotationState;
};

type UpdateSharedPresentationAssetAnnotationsRequest = {
    code: string;
    assetId: string;
    annotationId: string;
    state: AnnotationState;
};

type DestroyAssetAnnotationsRequest = {
    projectId: string;
    assetId: string;
    annotationId: string;
};

type DestroySharedAssetAnnotationsRequest = {
    code: string;
    annotationId: string;
};

type DestroySharedPresentationAssetAnnotationsRequest = {
    code: string;
    assetId: string;
    annotationId: string;
};

type GetUserAssetAnnotationsRequest = {
    assetId: string;
    options?: QueryFilterOptions;
};

type StoreUserAssetAnnotationsRequest = {
    assetId: string;
    data: AnnotationData;
    content: string;
};

type UpdateUserAssetAnnotationsRequest = {
    assetId: string;
    annotationId: string;
    state: AnnotationState;
};

type DestroyUserAssetAnnotationsRequest = {
    assetId: string;
    annotationId: string;
};

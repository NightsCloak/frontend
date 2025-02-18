type AnnotationModel = AssetAnnotation | UserAssetAnnotation;

type AnnotationComment = AssetAnnotationComment | UserAssetAnnotationComment;

type AssetAnnotation = {
    _morphType: 'assetAnnotation';
    id: string;
    asset_id: string;
    asset_version_id: string | null;
    user_id: string | null;
    user_type: User['_morphType'] | Guest['_morphType'] | null;
    state: AnnotationState;
    data: AnnotationData;
    used_attachment_storage: FileSize;
    created_at: string;
    updated_at: string;
    asset?: Asset | null;
    user?: User | Guest | null;
    initial_comment?: AssetAnnotationComment | null;
    comments_count?: number;
};

type AssetAnnotationComment = {
    _morphType: 'assetAnnotationComment';
    id: string;
    annotation_id: string;
    user_id: string | null;
    user_type: User['_morphType'] | Guest['_morphType'] | null;
    is_initial: boolean;
    content: string;
    content_tokens?: ContentToken[];
    content_token?: string;
    attachments: Attachment[] | null;
    attachments_size: FileSize;
    created_at: string;
    updated_at: string;
    annotation?: AssetAnnotation;
    user?: User | Guest;
};

type UserAssetAnnotation = {
    _morphType: 'userAssetAnnotation';
    id: string;
    user_asset_id: string;
    user_asset_version_id: string | null;
    user_id: string | null;
    user_type: User['_morphType'] | Guest['_morphType'] | null; //todo
    state: AnnotationState;
    data: AnnotationData;
    used_attachment_storage: FileSize;
    created_at: string;
    updated_at: string;
    asset?: UserAsset | null;
    user?: User | null;
    initial_comment?: UserAssetAnnotationComment | null;
    comments_count?: number;
};

type UserAssetAnnotationComment = {
    _morphType: 'userAssetAnnotationComment';
    id: string;
    annotation_id: string;
    user_id: string | null;
    user_type: User['_morphType'] | Guest['_morphType'] | null; //todo
    is_initial: boolean;
    content: string;
    content_tokens?: ContentToken[];
    content_token?: string;
    attachments: Attachment[] | null;
    attachments_size: FileSize;
    created_at: string;
    updated_at: string;
    annotation?: UserAssetAnnotation;
    user?: User;
};

type AnnotationState = 'pending' | 'inProgress' | 'finished' | 'failed';

type AnnotationData = {
    position: number[];
    head: number[];
    normal: number[];
};

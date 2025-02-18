type GetUserAssetsRequest = {
    options?: QueryFilterOptions;
};

type GetUserAssetsWithoutCollectionRequest = {
    collectionId: string;
};

type GetUserAssetRequest = {
    assetId: string;
    options?: QueryFilterOptions;
};

type StoreUserAssetRequest = {
    collection_id?: string;
};

type StoreUserAssetIngestRequest = {
    assetId: string;
    body: FormData;
};

type DestroyUserAssetIngestRequest = {
    assetId: string;
    filename: string;
};

type AnalyzeUserAssetIngestRequest = {
    assetId: string;
};

type ConfigureUserAssetIngestRequest = {
    assetId: string;
    source?: string;
    extract_glb_textures?: 'no' | 'yes';
};

type FinalizeUserAssetIngestRequest = {
    assetId: string;
};

type UserAssetSetOriginRequest = {
    assetId: string;
    type: SetOriginType;
    center: SetOriginCenter;
};

type UpdateUserAssetMaterialsMapRequest = {
    assetId: string;
    material: string;
    use_backface_culling?: boolean;
    slot?: string | null;
    enabled?: boolean;
    filename?: string | null;
    value?: number | number[] | null;
    channel?: MaterialSlotChannel | null;
    flip_x_channel?: boolean | null;
    flip_y_channel?: boolean | null;
    subsurface?: SubsurfaceProperties;
    alpha?: AlphaProperties;
    emission?: EmissiveProperties;
    occlusion?: OcclusionProperties;
};

type StoreUserAssetMaterialRequest = {
    assetId: string;
    form: FormData;
};

type DestroyUserAssetMaterialRequest = {
    assetId: string;
    filename: string;
};

type UpdateUserAssetRequest = {
    assetId: string;
    name?: string;
    is_shared?: boolean;
    is_shareable_code_enabled?: boolean;
    generate_shareable_code?: boolean;
    remove_shareable_code?: boolean;
    collections?: string[];
    tags?: string[];
};

type ShareUserAssetLinkRequest = {
    assetId: string;
    email: string;
};

type StoreUserAssetThumbnailRequest = {
    assetId: string;
    form: FormData;
};

type UpdateUserAssetNodesRequest = {
    assetId: string;
    nodes: NodeItem[] | null;
};

type UpdateUserAssetHiddenNodesRequest = {
    assetId: string;
    hidden_nodes: HiddenNodeItem[] | null;
};

type UpdateUserAssetSceneRequest = {
    assetId: string;
} & AssetSavedScene;

type DeleteUserAssetSceneRequest = {
    assetId: string;
};

type CopyUserAssetRequest = {
    assetId: string;
    project_id?: string;
    collection_id?: string;
};

type DownloadUserAssetRequest = {
    assetId: string;
};

type DeleteUserAssetRequest = {
    assetId: string;
};

type RestoreUserAssetRequest = {
    assetId: string;
};

type GetSharedUserAssetRequest = {
    code: string;
    options?: QueryFilterOptions;
};

type GetUserAssetMembersRequest = {
    assetId: string;
};

type AddUserAssetMemberRequest = {
    assetId: string;
    role: AssetMemberRole;
    email: string;
};

type UpdateUserAssetMemberRequest = {
    assetId: string;
    memberId: string;
    role: AssetMemberRole;
    requested_role?: false;
};

type RemoveUserAssetMemberRequest = {
    assetId: string;
    memberId: string;
};

type JoinUserAssetRequest = {
    assetId: string;
    role: AssetMemberRole;
};

type LeaveUserAssetRequest = {
    assetId: string;
};

type GetUserAssetMembersForMentionRequest = {
    assetId: string;
};

type GetAssetsRequest = {
    projectId: string;
    options?: QueryFilterOptions;
};

type GetAssetsForCollectionRequest = {
    projectId: string;
    collectionId: string;
};

type StoreAssetRequest = {
    projectId: string;
    collection_id?: string;
};

type StoreAssetIngestRequest = {
    projectId: string;
    assetId: string;
    body: FormData;
};

type DestroyAssetIngestRequest = {
    projectId: string;
    assetId: string;
    filename: string;
};

type AnalyzeAssetIngestRequest = {
    projectId: string;
    assetId: string;
};

type ConfigureAssetIngestRequest = {
    projectId: string;
    assetId: string;
    source?: string;
    extract_glb_textures?: 'no' | 'yes';
};

type UpdateAssetMaterialsMapRequest = {
    projectId: string;
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

type StoreAssetMaterialRequest = {
    projectId: string;
    assetId: string;
    form: FormData;
};

type StoreAssetAttachmentRequest = {
    projectId: string;
    assetId: string;
    form: FormData;
};

type DestroyAssetMaterialRequest = {
    projectId: string;
    assetId: string;
    filename: string;
};

type DestroyAssetAttachmentRequest = {
    projectId: string;
    assetId: string;
    attachment: string;
};

type FinalizeAssetIngestRequest = {
    projectId: string;
    assetId: string;
};

type AssetUvIslandsRequest = {
    projectId: string;
    assetId: string;
};

type AssetUvUnwrapRequest = {
    projectId: string;
    assetId: string;
    type: UvUnwrapped;
};

type AssetSetOriginRequest = {
    projectId: string;
    assetId: string;
    type: SetOriginType;
    center: SetOriginCenter;
};

type UpdateAssetSceneRequest = {
    projectId: string;
    assetId: string;
} & AssetSavedScene;

type UpdateAssetNodesRequest = {
    projectId: string;
    assetId: string;
    nodes: NodeItem[] | null;
};

type UpdateAssetHiddenNodesRequest = {
    projectId: string;
    assetId: string;
    hidden_nodes: HiddenNodeItem[] | null;
};

type DeleteAssetSceneRequest = {
    projectId: string;
    assetId: string;
};

type GetAssetRequest = {
    projectId: string;
    assetId: string;
    options?: QueryFilterOptions;
};

type UpdateAssetRequest = {
    projectId: string;
    assetId: string;
    name?: string;
    is_shared?: boolean;
    is_downloadable_shared?: boolean;
    is_versions_shared?: boolean;
    is_materials_shared?: boolean;
    remake_shareable_code?: boolean;
    is_approved?: boolean;
    is_published?: boolean;
    tags?: string[];
    collections?: string[];
};

type ShareAssetLinkRequest = {
    projectId: string;
    assetId: string;
    email: string;
};

type StoreAssetThumbnailRequest = {
    projectId: string;
    assetId: string;
    form: FormData;
};

type CopyAssetRequest = {
    projectId: string;
    assetId: string;
    target_self?: boolean;
    project_id?: string;
    collection_id?: string;
};

type MoveAssetRequest = {
    projectId: string;
    assetId: string;
    project_id: string;
};

type MoveAssetsRequest = {
    projectId: string;
    project_id: string;
    assets: string[];
};

type DownloadAssetRequest = {
    projectId: string;
    assetId: string;
};

type DownloadSharedAssetRequest = {
    code: string;
};

type DownloadSharedPresentationAssetRequest = {
    code: string;
    assetId: string;
};

type DeleteAssetRequest = {
    projectId: string;
    assetId: string;
};

type ArchiveAssetsRequest = {
    projectId: string;
    assets: string[];
};

type EmptyAssetsTrashRequest = {
    projectId: string;
};

type RestoreAssetRequest = {
    projectId: string;
    assetId: string;
};

type RestoreAssetsRequest = {
    projectId: string;
    assets: string[];
};

type GetSharedAssetRequest = {
    code: string;
    options?: QueryFilterOptions;
};

type GetSharedAssetMembersRequest = {
    code: string;
};

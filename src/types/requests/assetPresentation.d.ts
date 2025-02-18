type GetAssetPresentationsRequest = {
    projectId: string;
};

type GetAssetPresentationRequest = {
    projectId: string;
    presentationId: string;
};

type StoreAssetPresentationRequest = {
    projectId: string;
    assets: string[];
    name: string;
    is_asset_versions_shared: boolean;
    is_asset_materials_shared: boolean;
    is_asset_downloadable_shared: boolean;
};

type UpdateAssetPresentationRequest = {
    projectId: string;
    presentationId: string;
    name?: string;
    is_asset_versions_shared?: boolean;
    is_asset_materials_shared?: boolean;
    is_asset_downloadable_shared?: boolean;
};

type DeleteAssetPresentationRequest = {
    projectId: string;
    presentationId: string;
};

type GetSharedAssetPresentationRequest = {
    code: string;
};

type GetSharedAssetPresentationMembersRequest = {
    code: string;
};

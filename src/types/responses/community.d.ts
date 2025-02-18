type GetCommunityProjectsResponse = {
    data: Project[];
} & Pagination;

type GetCommunityProjectAssetsResponse = {
    data: Asset[];
} & Pagination;

type GetCommunityCollectionsResponse = {
    data: UserAssetCollection[];
} & Pagination;

type GetCommunityCollectionAssetsResponse = {
    data: UserAsset[];
} & Pagination;

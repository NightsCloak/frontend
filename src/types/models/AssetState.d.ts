type AssetState =
    | 'ingest'
    | 'analyzingIngest'
    | 'analyzingFailed'
    | 'configureIngestOptions'
    | 'matchingMaterials'
    | 'matchingMaterialsFailed'
    | 'configureMaterials'
    | 'startingUvUnwrap'
    | 'unwrapping'
    | 'ready';

type UvIslands = 'failed' | 'no' | 'processing' | 'yes';

type GlbTexturesExtracted = 'ask' | 'no' | 'yes';

type UvUnwrapped = 'angle_based' | 'conformal' | 'lightmap' | 'no' | 'smart';

type SetOriginType = 'GEOMETRY_ORIGIN' | 'ORIGIN_GEOMETRY';

type SetOriginCenter = 'MEDIAN' | 'BOUNDS';

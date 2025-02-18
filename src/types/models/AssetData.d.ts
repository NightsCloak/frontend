type AssetModel = Asset | UserAsset | IntractAsset;

type AssetVersionModel = AssetVersion | UserAssetVersion | IntractAssetVersion;

type NodeItemType = 'Mesh' | 'TransformNode' | 'unknown';

type HiddenNodeItem = {
    name: string;
    type: NodeItemType;
};

type HiddenNodeTree = HiddenNodeItem & { children: HiddenNodeTree[] };

type NodeItem = {
    name: string;
    type: NodeItemType;
    id: number;
    modified: boolean;
    enabled: boolean;
    position: number[] | null;
    rotation: number[] | null;
    rotationQuaternion: number[] | null;
    children: NodeItem[];
};

type AssetStoredMaterial = {
    name: string;
    pathname: string;
    route: string;
};

type Material = {
    name: string;
    type: 'MATERIAL';
    blend_method: string;
    use_backface_culling: boolean;
    slots: MaterialSlot[];
    layers: [];
};

type FortnitePropMaterial = {
    name: string;
    type: 'FORTNITE_PROP_MATERIAL';
    layers: FortnitePropMaterialLayer[];
    slots: MaterialSlot[];
};

type FortnitePropMaterialLayer = {
    name: string;
    textures: FortnitePropMaterialLayerTexture[];
};

type FortnitePropMaterialLayerTexture = {
    name: string;
    links: {
        file: string;
    }[];
};

type MaterialSlot = {
    name: MaterialSlotName;
    disabled: boolean;
    type: 'SLOT';
    links: [] | null;
    value: number | number[] | null;
    is_enabled: boolean;
    is_linked: boolean;
    slot_type: MaterialSlotValueType;
    data: MaterialSlotData;
};

type MaterialSlotData = BaseSlotData | AlphaSlotData | SubsurfaceSlotData | EmissiveSlotData | OcclusionSlotData;

interface BaseSlotData {
    type: 'Base';
    packed: boolean;
    flip_x_channel: boolean | null;
    flip_y_channel: boolean | null;
    channel: MaterialSlotChannel | null;
    filename: string | null;
    route: string | null;
}

interface SubsurfaceSlotData extends BaseSlotData, SubsurfaceProperties {
    type: 'Subsurface';
}

interface AlphaSlotData extends BaseSlotData, AlphaProperties {
    type: 'Alpha';
}

interface EmissiveSlotData extends BaseSlotData, EmissiveProperties {
    type: 'Emissive';
}

interface OcclusionSlotData extends BaseSlotData, OcclusionProperties {
    type: 'Occlusion';
}

type SubsurfaceProperties = {
    tint: string;
    isTranslucencyEnabled: boolean;
    useAlbedoToTintTranslucency: boolean;
    translucencyIntensity: number;
    isRefractionEnabled: boolean;
    useAlbedoToTintRefraction: boolean;
    refractionIntensity: number;
};

type OcclusionProperties = {
    usesMetallicWorkflow: boolean;
    strength: number;
};

type AlphaProperties = {
    transparencyMode: 0 | 1 | 2 | 3;
    alphaMode: 1 | 2 | 3 | 4 | 5;
    albedoTextureHasAlpha: boolean;
    alphaFromAlbedo: boolean;
};

type EmissiveProperties = {
    emissiveIntensity: number;
    emissiveColor: string;
};

type MaterialSlotChannel = 'red' | 'green' | 'blue' | 'alpha';

type MaterialSlotValueType = 'VALUE' | 'VECTOR' | 'RGBA' | 'NONE';

type MaterialSlotName =
    | 'Alpha'
    | 'Anisotropic'
    | 'Anisotropic Rotation'
    | 'Base Color'
    // | 'Cavity'
    | 'Clearcoat'
    | 'Clearcoat Normal'
    | 'Clearcoat Roughness'
    | 'Emission'
    | 'Emission Strength'
    | 'Glossiness'
    | 'Metallic'
    | 'Normal'
    | 'Occlusion'
    // | 'Occlusion Roughness Metallic'
    | 'Roughness'
    | 'Sheen'
    | 'Sheen Tint'
    | 'Specular'
    | 'Specular Tint'
    | 'Subsurface'
    | 'Transmission'
    | 'Transmission Roughness';

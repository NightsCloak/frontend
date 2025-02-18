type EngineProps = {
    parentContainer: HTMLDivElement;
    container: HTMLCanvasElement;
    react: ReactIO;
    systemColorMode: SystemColorMode;
    initialMode?: Mode;
    useCompatibilityMode?: boolean;
    startAnimations?: boolean;
};

type ReactIO = {
    updateAssetLoadState: (state: UpdateAssetLoadedState) => void;
    setCurrentSelectionId: (id: string | null) => void;
    updateActionTimes: (times: UpdateActionTimes) => void;
    setUndoCount: (count: number) => void;
    setActiveApplicator: (active: ActiveApplicator) => void;
};

type DecalLastTransform = {
    position: BABYLON.Vector3;
    normal: BABYLON.Vector3;
    sourceMesh: BABYLON.AbstractMesh;
};

type TransformerBag = {
    offset?: number[];
    rotation?: number;
    scale?: number[];
} | null;

type TransformerEvent = {
    original?: TransformerBag;
} & TransformerBag;

type FlipEvent = {
    flipX?: boolean;
    flipY?: boolean;
};

type TransformerInfo = {
    uScale: number;
    vScale: number;
    uOffset: number;
    vOffset: number;
    uAng: number;
    vAng: number;
    wAng: number;
} | null;

type ColorTextureInfo = {
    hex: string;
    textureUniqueId: number;
} | null;

type DecalSettings = {
    rotation: number;
    scale: number[];
};

type ScreenshotSize = { width: number; height: number; precision?: number };

type RecordSceneProps = {
    time: number;
    onComplete: (video: Blob) => void;
    onError: (msg: string) => void;
};

type AssetSaveContent = {
    version?: string;
    textures: TextureState[];
    decals: DecalState[];
};

type LoadGltfProps = {
    gltf: string;
    hiddenNodes?: HiddenNodeItem[] | null;
    nodes?: NodeItem[] | null;
    scene?: AssetSavedScene | null;
    onLoad: () => void;
};

type AssetSrc = {
    path: string;
    asViewer?: boolean;
    skipValidateMeshesUuid?: boolean;
    materials?: AssetStoredMaterial[] | null;
    materialsMap?: Material[] | null;
    hiddenNodes?: HiddenNodeItem[] | null;
    nodes?: NodeItem[] | null;
    save?: AssetSaveContent;
    scene?: AssetSavedScene | null;
    rawMaterialsMap?: FortnitePropMaterial[] | null;
};

type HdriSrc = {
    hdriPath: string;
    hdriId: string;
    hdriName: string;
};

type LightingConfig = {
    useSystemPreferenceBg: boolean;
    bgColor: string;
    lightColor: string;
    lightIntensity: number;
    hdriIntensity: number;
} & HdriSrc;

type SystemPreferenceSceneBg = {
    light: string;
    dark: string;
};

type ArcCameraConfig = {
    collisions: boolean;
    fov: number;
    wheelDeltaPercentage: number;
    keyboardAngularSpeed: number;
    angularSensibility: number;
    position: ArcCameraPosition | null;
};

type ArcCameraPosition = {
    alpha: number;
    beta: number;
    radius: number;
    target: number[];
    targetScreenOffset: number[];
};

type UniversalCameraConfig = {
    collisions: boolean;
    fov: number;
    speed: number;
    angularSensibility: number;
    position: UniversalCameraPosition | null;
};

type UniversalCameraPosition = {
    position: number[];
    rotation: number[];
};

type Presentation = {
    canSwitchCamera: boolean;
    useAutoRotation: boolean;
    autoRotationSpeed: number;
};

type AssetSavedScene = {
    version?: number;
    presentation: Presentation;
    lighting: LightingConfig;
    arcCamera: ArcCameraConfig;
    universalCamera: UniversalCameraConfig;
    defaultCamera: string;
    setGeometryToOrigin: boolean;
};

type EngineToggles = {
    ambient: boolean;
    bump: boolean;
    colorGrading: boolean;
    decal: boolean;
    detail: boolean;
    diffuse: boolean;
    emissive: boolean;
    fresnel: boolean;
    glow: boolean;
    lightmap: boolean;
    opacity: boolean;
    reflection: boolean;
    refraction: boolean;
    specular: boolean;
    wireframe: boolean;
};

type TextureInfo = {
    base64String: string;
    name: string;
};

type ColorOverlayType = 'colorize' | 'average';

type ColorOverlay = {
    color: string;
    range: 'whole' | 'localized';
    type: ColorOverlayType;
};

type AnnotationExport = {
    threadUuid: string;
    data: AnnotationData;
};

type ModifiedMaterialRecord = {
    cloneId: number;
    originalId: number;
};

type StashedMeshRecord = {
    id: number;
    cloneMaterialId: number;
    originalMaterialId: number;
};

type CompositedBake = { name: string; image: string };

type MeshInfo = {
    name: string;
    vertexCount: number;
    hasUV: boolean;
    hasUV2: boolean;
    uvCount: number;
    uv2Count: number;
};

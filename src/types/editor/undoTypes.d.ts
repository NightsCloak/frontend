type ColorState = {
    hex: string;
    type: ColorOverlayType;
};

type TextureState = {
    stateType: 'texture' | 'colorTexture';
    nodeName: string;
    materialName: string;
    uniqueId: number;
    url: string;
    albedoColor: string;
    uOffset: number;
    vOffset: number;
    uScale: number;
    vScale: number;
    uAng: number;
    vAng: number;
    wAng: number;
    wrapU: number;
    wrapV: number;
    color: ColorState | null;
};

type DecalState = {
    stateType: 'decal';
    action: 0 | 1;
    uniqueId: number;
    decalName: string;
    sourceMeshName: string;
    url: string;
    position: number[];
    normal: number[];
    angle: number;
    size: number[];
    zOffset: number;
    quaternion: number[];
};

type UndoState = TextureState | DecalState;

type UndoStep = UndoState[];

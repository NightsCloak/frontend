type SocketEvent = ColorEvent | TextureEvent | TextureTransformEvent | TextureFlipEvent | DecalsUpdatedEvent;

type ColorEvent = {
    eventType: 'color';
    meshes: string[];
    hex: string;
};

type TextureEvent = {
    eventType: 'texture';
    meshes: string[];
    url: string;
};

type TextureTransformEvent = {
    eventType: 'textureTransform';
    meshes: string[];
    payload: TransformerEvent;
};

type TextureFlipEvent = {
    eventType: 'textureFlip';
    meshes: string[];
    payload: FlipEvent;
};

type DecalsUpdatedEvent = {
    eventType: 'decalsUpdated';
    decals: DecalState[];
};

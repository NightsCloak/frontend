type LoadingOverlay = {
    title: string;
    subtext?: string | null;
    progress?: number;
} | null;

type Mode = 'diffuse' | 'decal' | 'viewer' | 'annotation' | 'materials' | 'admin';

type SystemColorMode = 'light' | 'dark';

type Camera = 'arc' | 'universal';

type ActiveApplicator = 'color' | 'texture' | 'decal' | null;

type SharedModelSaveAction = 'quicksave' | 'none' | undefined;

type ResetOptions = {
    afterFetch?: boolean;
    mode?: Mode;
    activeTool?: EditorMenuSections;
};

type EditorMenuSections = 'color' | 'texture' | 'aiTexture' | 'decal' | 'exports' | undefined;

type ToolsSpeedDialMenuSections =
    | 'lighting'
    | 'camera'
    | 'screenshot'
    | 'asset'
    | 'engine'
    | 'saves'
    | 'shared-saves'
    | 'versions'
    | 'shared-versions'
    | 'data'
    | undefined;

type AssetLoadedState = {
    complete: boolean;
    progress: number;
    failed: boolean;
    error?: string;
};

type ActionTimes = {
    savable: number | null;
    color: number | null;
    texture: number | null;
    transform: number | null;
    decal: number | null;
    undo: number | null;
    node: number | null;
};

type UpdateActionTimes = {
    savable?: number | null;
    color?: number | null;
    texture?: number | null;
    transform?: number | null;
    decal?: number | null;
    undo?: number | null;
    node?: number | null;
};

type UpdateAssetLoadedState = {
    complete?: boolean;
    progress?: number;
    failed?: boolean;
    error?: string;
};

type MenuDrag = {
    dragging: boolean;
    stopping: boolean;
    deltaX: number;
    deltaY: number;
    x: number;
    y: number;
    side: 'left' | 'right';
};

type ScreenBounds = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};

type MenuBounds = {
    height: number;
    width: number;
};

type AnnotationEvent = {
    type: 'placed' | 'selected' | null;
    location: XYCoords;
    annotationId?: string;
    data?: AnnotationData;
};

type XYCoords = {
    x: number;
    y: number;
};

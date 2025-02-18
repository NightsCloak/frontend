type SharedAction = 'texture' | 'value' | 'packed' | 'flipX' | 'flipY' | 'enabled' | 'disabled';

type SlotChangedEvent = {
    materialName: string;
    slot: MaterialSlot;
    payload: SharedSlotChange | SubsurfaceSlotChange | AlphaSlotChange | EmissiveSlotChange | OcclusionSlotChange;
};

type SharedSlotChange = {
    type: 'shared';
    change: SharedAction;
};

type SubsurfaceSlotChange = {
    type: 'subsurface';
    change: keyof SubsurfaceProperties;
};

type AlphaSlotChange = {
    type: 'alpha';
    change: keyof AlphaProperties;
};

type EmissiveSlotChange = {
    type: 'emissive';
    change: keyof EmissiveProperties;
};

type OcclusionSlotChange = {
    type: 'occlusion';
    change: keyof OcclusionProperties;
};

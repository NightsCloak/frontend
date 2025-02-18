type MaterialMatcherProps = {
    children?: ReactNode;
};

type UpdateMaterial = {
    materialName: string;
    useBackfaceCulling?: boolean;
};

type UpdateSlot = {
    materialName: string;
    slotName: MaterialSlotName;
    enabled?: boolean;
    fileName?: string | null;
    route?: string | null;
    value?: number | number[] | null;
    channel?: MaterialSlotChannel | null;
    flipY?: boolean | null;
    flipX?: boolean | null;
    subsurface?: SubsurfaceProperties;
    alpha?: AlphaProperties;
    emissive?: EmissiveProperties;
    occlusion?: OcclusionProperties;
};

type MaterialMatcherContextProps = {
    materials: Material[] | null;
    setMaterials: Dispatch<SetStateAction<Material[] | null>>;
    material: Material | null;
    setMaterial: Dispatch<SetStateAction<Material | null>>;
    updateMaterial: (data: UpdateMaterial) => Material | null;
    updateSlot: (data: UpdateSlot) => MaterialSlot | null;
};

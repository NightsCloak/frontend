type ModelUploadProps = {
    children?: ReactNode;
    asset: Asset | UserAsset | IntractAsset;
    updateAsset: (asset: Asset | UserAsset | IntractAsset) => void;
    fetchAsset: () => void;
};

type ModelUploadContextProps = {
    asset: Asset | UserAsset | IntractAsset;
    updateAsset: (asset: Asset | UserAsset | IntractAsset) => void;
    fetchAsset: () => void;
    socket: PresenceChannel | null;
};

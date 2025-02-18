type RobloxAvatarDeck = {
    _morphType: 'robloxAvatarDeck';
    id: string;
    project_id: string;
    user_id: string | null;
    name: string;
    status: 'processing' | 'ready' | 'failed';
    data: DeckData | null;
    created_at: string;
    updated_at: string;
    project?: Project;
    user?: User;
    assets?: Asset[];
    sources?: IntractAsset[];
};

type DeckData = { [sourceId: string]: DeckDataItem[] };

type DeckDataItem = {
    file: string;
    size: number;
    name: string;
    extension: string;
    route: string;
    size_human: string;
    assetId: string;
    assetName: string;
    sourceId: string;
    sourceName: string;
};

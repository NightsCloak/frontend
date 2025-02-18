type GetRobloxAvatarDecksRequest = {
    projectId: string;
    options?: QueryFilterOptions;
};

type GetRobloxAvatarDeckRequest = {
    projectId: string;
    deckId: string;
};

type StoreRobloxAvatarDeckRequest = {
    projectId: string;
    name: string;
    assets: string[];
    sources: string[];
};

type UpdateRobloxAvatarDeckRequest = {
    projectId: string;
    deckId: string;
    name: string;
};

type DeleteRobloxAvatarDeckRequest = {
    projectId: string;
    deckId: string;
};

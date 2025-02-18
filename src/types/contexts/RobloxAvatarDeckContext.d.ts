type RobloxAvatarDeckProps = {
    children?: ReactNode;
    deck: RobloxAvatarDeck;
    fetchDeck: () => void;
    parent: MutableRefObject<HTMLDivElement>;
    canvas: MutableRefObject<HTMLCanvasElement>;
};

type RobloxAvatarDeckContextProps = {
    initialize: () => void;
    isInitialized: boolean;
    isReady: boolean;
    reset: (options?: ResetOptions) => void;
    resetting: ResetOptions | null;
    debug: boolean;
    setDebug: Dispatch<SetStateAction<boolean>>;
    activeSpeedDialTool: ToolsSpeedDialMenuSections;
    setActiveSpeedDialTool: Dispatch<SetStateAction<ToolsSpeedDialMenuSections>>;
    deck: RobloxAvatarDeck;
    fetchDeck: () => void;
    parent: MutableRefObject<HTMLDivElement>;
    canvas: MutableRefObject<HTMLCanvasElement>;
    engine: MutableRefObject<Engine>;
};

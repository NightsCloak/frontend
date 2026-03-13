interface UserState {
    data: User;
    name: string;
    settings: {
        admin: boolean;
        verified: boolean | null;
        darkMode: boolean;
        alertSounds: boolean;
        listView: boolean;
    };
}

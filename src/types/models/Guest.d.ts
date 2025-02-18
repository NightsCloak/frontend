type Guest = {
    _morphType: 'guest';
    id: string;
    first: string;
    last: string;
    name: string;
    initials: string;
    avatar: string | null;
    avatar_route: string | null;
    api_secret: string;
    created_at: string;
    updated_at: string;
};

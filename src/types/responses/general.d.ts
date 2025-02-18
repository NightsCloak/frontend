type Pagination = {
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
};

type NotFoundError = { status: number; data: { message: string } };

type BasicError = { status: number; data: { message: string } };

type Heartbeat = {
    auth: boolean;
    guest: boolean;
    csrf: string;
};

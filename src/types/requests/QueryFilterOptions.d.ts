type QueryFilterOptions = string;

type QueryFilterOptionsBuilder = {
    [key: string]: string | number | boolean;
} & {
    sort?: string;
    include?: string;
    load?: string;
    limit?: number;
    page?: number;
    showTrashed?: boolean;
    nameSearch?: string;
    [key: string]: string | number | boolean | undefined | (string | number)[];
};

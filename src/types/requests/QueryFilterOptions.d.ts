type QueryFilterOptions = string;

type queryFilterProps = {
    sort?: string;
    include?: string;
    load?: string | string[];
    limit?: number;
    page?: number;
    showTrashed?: boolean;
    name?: string;
    filters?: {
        [key: string]: string | number | boolean | undefined;
    };
    filter?: string[];
    tags?: string | string[];
    between?: { start: string; end: string };
    [key: string]:
        | string
        | number
        | boolean
        | undefined
        | (string | number)
        | { [key: string]: string | number | boolean | undefined }
        | (string | number)[];
};

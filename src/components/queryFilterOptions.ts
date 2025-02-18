export type queryFilterProps = {
    [key: string]: string | number | boolean;
} & {
    sort?: string;
    include?: string;
    load?: string;
    limit?: number;
    page?: number;
    showTrashed?: boolean;
    name?: string;
    [key: string]: string | number | boolean | undefined | (string | number)[];
};

const queryFilterOptions = (options: queryFilterProps = {}) => {
    let queryString = '';
    let first = true;
    for (let option in options) {
        if (option === 'showTrashed') {
            if (options['showTrashed']) queryString += `${first ? '?' : '&'}filter[trashed]=only`;
        } else if (option === 'name') {
            if (options['name']) queryString += `${first ? '?' : '&'}filter[name]=${options['name']}`;
        } else if (option === 'tags') {
            if (options['tags']) queryString += `${first ? '?' : '&'}filter[tags]=${options['tags']}`;
        } else {
            const value = options[option];
            if (Array.isArray(options[option])) {
                queryString += `${first ? '?' : '&'}${option}=${(value as Array<string | number>).join(',')}`;
            } else if (options[option] !== undefined && options[option] !== null) {
                queryString += `${first ? '?' : '&'}${option}=${options[option]}`;
            }
        }
        if (first) first = false;
    }
    return queryString;
};

export default queryFilterOptions;

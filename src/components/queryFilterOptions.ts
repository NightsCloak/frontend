export type queryFilterProps = {
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
    for (const option in options) {
        if (option === 'showTrashed') {
            if (options['showTrashed']) queryString += `${queryString.length ? '&' : '?'}filter[trashed]=only`;
        } else if (option === 'name') {
            if (options['name']) queryString += `${queryString.length ? '&' : '?'}filter[name]=${options['name']}`;
        } else if (option === 'tags') {
            if (options['tags']) queryString += `${queryString.length ? '&' : '?'}filter[tags]=${options['tags']}`;
        } else if (option === 'statuses') {
            if (options['statuses'])
                queryString += `${queryString.length ? '&' : '?'}filter[status]=${options['statuses']}`;
        } else if (option === 'assigned') {
            if (options['assigned']) queryString += `${queryString.length ? '&' : '?'}filter[assigned]=true`;
        } else if (option === 'labeled' && options['labeled'] && !options['notLabeled']) {
            queryString += `${queryString.length ? '&' : '?'}filter[labeled]=${options['labeled']}`;
        } else if (option === 'notLabeled' && options['notLabeled'] && !options['labeled']) {
            queryString += `${queryString.length ? '&' : '?'}filter[notLabeled]=${options['notLabeled']}`;
        } else {
            const value = options[option];
            if (Array.isArray(options[option])) {
                queryString += `${queryString.length ? '&' : '?'}${option}=${(value as Array<string | number>).join(',')}`;
            } else if (options[option] !== undefined && options[option] !== null) {
                queryString += `${queryString.length ? '&' : '?'}${option}=${options[option]}`;
            }
        }
    }

    return queryString;
};

const queryFilterParser = (options: URLSearchParams) => {
    const queryState: queryFilterProps = {};

    for (const [key, value] of options) {
        if (key === 'filter[trashed]') {
            queryState.showTrashed = value === 'only';
        } else if (key === 'filter[name]') {
            queryState.name = value;
        } else if (key === 'filter[tags]') {
            queryState.tags = value.split(',').map((tag) => tag.trim());
        } else if (key === 'sort') {
            queryState.sort = value;
        } else if (key === 'include') {
            queryState.include = value;
        } else if (key === 'load') {
            queryState.load = value;
        } else if (key === 'limit' || key === 'page') {
            const numValue = Number(value);
            if (!isNaN(numValue)) {
                queryState[key] = numValue;
            }
        } else {
            // Handle generic cases, considering if it might be an array
            if (value.includes(',')) {
                queryState[key] = value.split(',').map((item) => {
                    const num = Number(item);
                    return isNaN(num) ? item : num;
                });
            } else {
                const num = Number(value);
                queryState[key] = isNaN(num) ? value : num;
            }
        }
    }

    return queryState;
};

export default queryFilterOptions;

export { queryFilterParser, queryFilterOptions };

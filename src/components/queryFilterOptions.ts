const queryFilterOptions = (options: queryFilterProps = {}) => {
    let queryString = '';
    let first = true;
    for (const option in options) {
        if (option === 'showTrashed') {
            if (options['showTrashed']) queryString += `${first ? '?' : '&'}filter[trashed]=only`;
        } else if (option === 'name') {
            if (options['name']) queryString += `${first ? '?' : '&'}filter[name]=${options['name']}`;
        } else if (option === 'tags') {
            if (options['tags']) queryString += `${first ? '?' : '&'}filter[tags]=${options['tags']}`;
        } else if (option === 'filters') {
            for (const filter in options['filters']) {
                queryString += `${first ? '?' : '&'}filter[${filter}]=${options['filters'][filter]}`;
            }
        } else if (option === 'between' && options.between) {
            queryString += `${first ? '?' : '&'}filter[between][start]=${options.between.start}&filter[between][end]=${options.between.end}`;
        } else {
            const value = options[option];
            if (Array.isArray(options[option])) {
                queryString += `${first ? '?' : '&'}${option}=${(value as Array<string | number>).join(',')}`;
            } else if (options[option] !== undefined && options[option] !== null) {
                queryString += `${first ? '?' : '&'}${option}=${options[option]}`;
            }
        }

        if (first) {
            first = false;
        }
    }

    return queryString;
};

// @ts-expect-error none
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

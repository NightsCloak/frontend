type DateUtils = {
    toLocaleDateString: (date?: string | null) => string;
    toLocaleDateStringShort: (date?: string | null) => string;
};

const useDateUtils = (): DateUtils => {
    const toLocaleDateString = (date?: string | null) => {
        if (!date) {
            return 'unknown';
        }

        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };

    const toLocaleDateStringShort = (date?: string | null) => {
        if (!date) {
            return 'unknown';
        }

        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return { toLocaleDateString, toLocaleDateStringShort };
};

export default useDateUtils;

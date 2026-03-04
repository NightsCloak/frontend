type CurrentPath = {
    isGtavDomain: boolean;
    isTebexCustomer: boolean;
};

const useCurrentPath = (): CurrentPath => {
    const domain = window.location.hostname.split('.')[0].toLowerCase();
    const override = (import.meta.env.VITE_MOCK_GTAV_DOMAIN as string) === 'true';
    const isGtavDomain = override || domain === 'gtav';
    const isTebexCustomer = window.location.pathname.startsWith('/tebex') && isGtavDomain;

    return {
        isGtavDomain,
        isTebexCustomer,
    };
};

export default useCurrentPath;

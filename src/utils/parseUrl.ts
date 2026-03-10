import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query';

function parseUrl(api: BaseQueryApi, args: string | FetchArgs, url: string): [url: string, args: string | FetchArgs] {
    const exceptions = [
        'oauth/heartbeat',
        'oauth/login',
        'oauth/logout',
        'oauth/token',
        'oauth/social/google/callback',
        'oauth/social/discord/callback',
    ];

    if (api.endpoint !== 'getToken') {
        if (typeof args === 'string') {
            url = args;
            if (!exceptions.includes(args)) {
                args = `${import.meta.env.VITE_PREFIX}/${args}`;
            }
        } else {
            url = args.url;
            if (!exceptions.includes(args.url)) {
                url = args.url;
                args = { ...args, url: `${import.meta.env.VITE_PREFIX}/${args.url}` };
            }
        }
    }

    return [url, args];
}

export default parseUrl;

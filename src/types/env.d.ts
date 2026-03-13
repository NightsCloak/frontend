/// <reference types="vite/client" />

import type ImportMetaVite from 'vite/types/importMeta';
import type {
    ModalOwnProps as MuiModalOwnProps,
    ModalTypeMap as MuiModalTypeMap,
    OverridableComponent as MuiOverridableComponent,
    SxProps as MuiSxProps,
    Theme as MuiTheme,
    ThemeOptions as MuiThemeOptions,
} from '@mui/material';
import type {
    CSSProperties as ReactCSSProperties,
    Dispatch as ReactDispatch,
    ReactElement as ReactReactElement,
    ReactNode as ReactReactNode,
    RefObject as ReactRefObject,
    SetStateAction as ReactSetStateAction,
} from 'react';
import type { PresenceChannel as EchoPresenceChannel } from 'laravel-echo/dist/channel';
import type { default as LaravelEcho } from 'laravel-echo';
import type { Location as ReactRoutertLocation } from 'react-router';
import {
    FetchBaseQueryError as RTKFetchBaseQueryError,
    SerializedError as RTKSerializedError,
} from '@reduxjs/toolkit/query/react';
import type { customBaseQuery as OWBNCustomBaseQuery } from '@/redux/apiSlice';

interface ImportMetaEnv {
    readonly VITE_APP: 'admin' | 'frontend';
    readonly VITE_URI: string;
    readonly VITE_PORT?: string;
    readonly VITE_SCHEMA: string;
    readonly VITE_PREFIX: string;
    readonly VITE_CLIENT_ID: string;
    readonly VITE_CLIENT_SECRET: string;
    readonly VITE_PUSHER_APP_KEY: string;
    readonly VITE_PUSHER_APP_WSS_PORT: string;
    readonly VITE_PUSHER_APP_WS_PORT: string;
    readonly VITE_PUSHER_APP_PATH: string;
    readonly VITE_DEPLOY_ENV: string;
    readonly VITE_SENTRY: string;
    readonly VITE_SENTRY_TELEMETRY: string;
    readonly VITE_SENTRY_SOURCE_MAPS: string;
    readonly VITE_REG_OPEN: string;
    readonly VITE_STRIPE_PK: string;
    readonly VITE_DISABLE_WEBSOCKETS?: string;
    readonly VITE_DEV_USERNAME?: string;
    readonly VITE_DEV_PASSWORD?: string;
    readonly VITE_DEV_SAFARI?: string;
    readonly VITE_ANALYTICS_ID?: string;
    readonly VITE_AUTH_FLOW?: string;
    readonly VITE_PKCE_LOCAL_ID?: string;
    readonly GITHUB_SHA?: string;
    readonly STORYBOOK?: 'true' | 'false';
    readonly VITE_STORYBOOK_TOKEN_TYPE?: string;
    readonly VITE_STORYBOOK_TOKEN_EXPIRES_IN?: number;
    readonly VITE_STORYBOOK_ACCESS_TOKEN?: string;
    readonly VITE_STORYBOOK_REFRESH_TOKEN?: string;
}

declare global {
    interface ImportMeta extends ImportMetaVite {
        readonly env: ImportMetaEnv;
    }

    type Theme = MuiTheme;

    interface ColorSelectionOptions {
        signal?: AbortSignal;
    }

    interface ColorSelectionResult {
        sRGBHex: string;
    }

    interface EyeDropper {
        open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>;
    }

    interface EyeDropperConstructor {
        new (): EyeDropper;
    }

    interface Window {
        EyeDropper?: EyeDropperConstructor | undefined;
    }

    type ModalOwnProps = MuiModalOwnProps;
    type FetchBaseQueryError = RTKFetchBaseQueryError;
    type SerializedError = RTKSerializedError;
    type SxProps<T> = MuiSxProps<T>;
    type CSSProperties = ReactCSSProperties;
    type ModalTypeMap<A, B> = MuiModalTypeMap<A, B>;
    type OverridableComponent<M> = MuiOverridableComponent<M>;
    type Dispatch<A> = ReactDispatch<A>;
    type ReactElement<P, T> = ReactReactElement<P, T>;
    type ReactNode = ReactReactNode;
    type SetStateAction<S> = ReactSetStateAction<S>;
    type PresenceChannel = EchoPresenceChannel;
    type Echo<T> = LaravelEcho<T>;
    type RefObject<T> = ReactRefObject<T>;
    type NCLocation<S> = ReactRoutertLocation<S>;
    type ThemeOptions = MuiThemeOptions;

    type ResultType<T> = T extends Pagination & infer U ? U : T;
    type OptionsType = {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        triggerParams?: any;
        showPagination?: boolean;
        useSearch?: boolean;
        useTrashed?: boolean;
        sortSize?: boolean;
        sortLastActive?: boolean;
        sortName?: boolean;
        sortFirst?: boolean;
        sortLast?: boolean;
        tags?: TypedUseQueryHookResult<Tag[], unknown, typeof OWBNCustomBaseQuery>;
        initialTags?: string[];
        include?: string;
        queryStrings?: queryFilterProps;
        skip?: boolean;
        initialLimit?: number;
        initialSortBy?: Sorting['by'];
    };
}

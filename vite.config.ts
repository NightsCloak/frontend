import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import vitePluginImporter from 'vite-plugin-importer';

process.env = { ...process.env, ...loadEnv(process.env.NODE_ENV ?? 'development', process.cwd()) };

export default defineConfig({
    define: {
        'import.meta.env.GITHUB_SHA': JSON.stringify(process.env.GITHUB_SHA),
    },
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', {}]],
            },
        }),
        vitePluginImporter({
            libraryName: '@mui/material',
            libraryDirectory: '',
            camel2DashComponentName: false,
        }),
        vitePluginImporter({
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false,
            style: false,
        }),
        tsconfigPaths({}),
        svgrPlugin(),
        checker({
            typescript: {
                tsconfigPath: 'tsconfig.app.json',
                buildMode: false,
            },
        }),
        {
            name: 'DevTools-Injection',
            transformIndexHtml: {
                order: 'pre',
                handler: function (html) {
                    if (process.env.NODE_SAFARI === 'true') {
                        return [{ tag: 'script', attrs: { src: `http://127.0.0.1:8097` } }];
                    }
                    return html;
                },
            },
        },
        sentryVitePlugin({
            org: 'nightscloak',
            project: 'frontend',
            authToken: process.env.SENTRY_AUTH_TOKEN,
            // Generate Srcmaps for Develop and Production (false locally)
            disable:
                process.env.NODE_ENV === 'DEV' ||
                process.env.VITE_SENRTY === 'false' ||
                process.env.SENTRY_AUTH_TOKEN === undefined,
            telemetry: process.env.VITE_SENTRY_TELEMETRY === 'true',
            sourcemaps: {
                // Allow for toggle of Sentry srcmaps,
                // will always skip if VITE_SENTRY is false
                disable: process.env.VITE_SENTRY_SOURCE_MAPS !== 'true',
                // Have Sentry clear sourcemaps and lib after upload
                // filesToDeleteAfterUpload: ['build/**/*.js.map'],
            },
            reactComponentAnnotation: { enabled: true },
        }),
    ],
    build: {
        assetsDir: 'vendor/nightscloak',
        // Generate Source Maps on Prod and Develop
        sourcemap: process.env.VITE_SENTRY_SOURCE_MAPS === 'true',
        // Minify in Production only
        minify: process.env.VITE_DEPLOY_ENV === 'production',
        outDir: 'build',
        rollupOptions: {
            watch: false,
            treeshake: true,
            onwarn: (warning, defaultHandler) => {
                if (warning.code === 'SOURCEMAP_ERROR') {
                    return;
                }
                defaultHandler(warning);
            },
            input: {
                index: path.resolve(__dirname, 'index.html'),
            },
        },
        chunkSizeWarningLimit: 15000,
    },
});

import { createTheme, darkScrollbar } from '@mui/material';

// export const drawerWidth = 240;

const theme = (prefersDarkMode: boolean): Theme =>
    createTheme({
        components: {
            MuiAppBar: {
                defaultProps: {
                    enableColorOnDark: true,
                },
                styleOverrides: {
                    root: {
                        backgroundColor: prefersDarkMode ? '#2f2f2f' : 'rgba(230, 232, 234, 1)',
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    //color: 'inherit',
                },
                styleOverrides: {},
            },
            // MuiIconButton: {
            //     styleOverrides: {
            //         colorInherit: {
            //             // color: prefersDarkMode ? '#d01010' : '#000000',
            //         },
            //     },
            // },
            MuiChip: {
                styleOverrides: {
                    root: {
                        color: prefersDarkMode ? '#FFF' : '#000000',
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: prefersDarkMode ? darkScrollbar() : null,
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    root: {
                        '*::-webkit-scrollbar': {
                            display: 'none',
                            //chrome
                        },
                        '*::-webkit-scrollba-thumb': {
                            //chrome
                        },
                        '*:MsOverflowStyle': 'none',
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    //root: {
                    //    backgroundColor: prefersDarkMode ? 'rgba(54, 49, 46, 1)' : 'rgba(230, 232, 234, 1)',
                    //},
                },
            },
        },
        spacing: 8,
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            background: {
                default: prefersDarkMode ? '#1B1B1B' : '#e1e1e1',
                paper: prefersDarkMode ? 'rgb(38,37,36)' : 'rgba(230, 232, 234, 1)',
            },
            text: {
                primary: prefersDarkMode ? '#FFFFFF' : '#000000',
                secondary: prefersDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0, 0, 0, 0.54)',
                disabled: prefersDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.38)',
            },
            intract: {
                button: prefersDarkMode ? 'rgb(38,37,36)' : 'rgba(230, 232, 234, 1)',
                divider: '#323232',
                main: '#E96C00',
                dark: '#c25400',
                medium: '#E96C00',
                light: '#FFB77A',
            },
            primary: {
                main: prefersDarkMode ? '#FF8E2C' : '#C25400',
                contrastText: '#FFFFFF',
                // light: 'rgb(51, 51, 51)',
                // dark: '#262626',
            },
            secondary: {
                main: prefersDarkMode ? '#C25400' : '#FF8E2C',
                contrastText: '#FFFFFF',
                // light: '#F73378',
                // dark: '#AB003C',
            },
            error: {
                main: '#F44336',
                contrastText: '#FFFFFF',
                // main: 'rgb(228,30,38)',
            },
            warning: {
                main: '#ff9800',
                contrastText: '#FFFFFF',
                light: '#ffb74d',
                dark: '#f57c00',
                // contrastText: 'rgba(0,0,0,0.87)',
            },
            info: {
                main: '#2196f3',
                contrastText: '#FFFFFF',
                // light: '#64b5f6',
                // dark: '#1976d2',
                // contrastText: '#FFFFFF',
            },
            success: {
                main: prefersDarkMode ? '#FF8E2C' : '#C25400',
                contrastText: '#FFFFFF',
                light: '#81c784',
                dark: '#388e3c',
                // contrastText: 'rgba(0,0,0,0.87)',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
        },
        // transitions: {
        //     duration: {
        //         shortest: 150,
        //         shorter: 200,
        //         short: 250,
        //         // most basic recommended timing
        //         standard: 300,
        //         // this is to be used in complex animations
        //         complex: 375,
        //         // recommended when something is entering screen
        //         enteringScreen: 225,
        //         // recommended when something is leaving screen
        //         leavingScreen: 195,
        //     },
        //     easing: {
        //         // This is the most common easing curve.
        //         easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        //         // Objects enter the screen at full velocity from off-screen and
        //         // slowly decelerate to a resting point.
        //         easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        //         // Objects leave the screen at full velocity. They do not decelerate when off-screen.
        //         easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        //         // The sharp curve is used by objects that may return to the screen at any time.
        //         sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        //     },
        // },
    });

export default theme;

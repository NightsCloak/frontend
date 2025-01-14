import { FC, Suspense, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Box, Breadcrumbs, Divider, IconButton, Stack, Theme, useTheme } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import Holding from '@intractinc/base/layout/Holding';
import imagePaths from '@intractinc/base/hooks/imagePaths';
import useScreenSize from '@intractinc/base/hooks/useScreenSize';
import MaintenanceScreen from '@/screens/error/MaintenanceScreen';
import Sidebar from '@/components/sidebar';
import SidebarProvider from '@/providers/SidebarProvider';
import AdminMenu from '@/components/AdminMenu';
import DrawerHeader from '@/components/drawer/DrawerHeader';

const Main: FC = () => {
    const auth = useAppSelector((state) => state.auth.status);
    const maintenance = useAppSelector((state) => state.app.maintenance);
    const { isSmallScreen } = useScreenSize();
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { classes } = useStyles({ isSmallScreen, auth, open: drawerOpen });
    const { tools, breadcrumbs, modal } = useTools();

    const toggleDrawer = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    useEffect(() => {
        if (drawerOpen) {
            setDrawerOpen(false);
        }
    }, [auth]);

    useEffect(() => {
        !isSmallScreen && setDrawerOpen(false);
    }, [isSmallScreen]);

    return (
        <>
            <DrawerHeader />
            <div className={classes.root}>
                {maintenance && <MaintenanceScreen />}
                <AppBar position="fixed" className={classes.appBar} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                    <>
                        {auth && (
                            <IconButton onClick={toggleDrawer} color="inherit">
                                <MenuIcon sx={{ color: 'white' }} />
                            </IconButton>
                        )}
                        <Link to={'/'}>
                            <Stack spacing={2} sx={{ pl: 2 }} direction={'row'} alignItems={'center'}>
                                <img width={32} height={32} src={imagePaths.iconLogo} alt={'Logo'} />
                                <img
                                    height={32}
                                    width={157}
                                    src={theme.palette.mode === 'dark' ? imagePaths.lightLogo : imagePaths.darkLogo}
                                    alt={'Logo'}
                                />
                            </Stack>
                        </Link>
                    </>

                    {auth && (
                        <>
                            {isSmallScreen && <Divider sx={{ mr: 2 }} orientation={'vertical'} flexItem />}
                            <div className={classes.breadcrumbs}>
                                <Breadcrumbs separator={<NavigateNextIcon fontSize={'small'} />}>
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </div>
                            <div className={classes.tools}>{tools}</div>
                        </>
                    )}
                    <AdminMenu />
                </AppBar>

                {auth && (
                    <SidebarProvider open={drawerOpen} setOpen={toggleDrawer}>
                        <Sidebar />
                    </SidebarProvider>
                )}

                <Box component={'main'} sx={{ flex: 1, p: 2 }} className={classes.main}>
                    <div className={classes.content}>
                        <Suspense fallback={<Holding {...{ spinner: true }} />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </Box>
                {modal}
            </div>
        </>
    );
};

const useStyles = makeStyles<{ isSmallScreen: boolean; auth: boolean; open: boolean }>()((
    theme: Theme,
    { isSmallScreen, auth, open }
) => {
    return {
        root: {
            display: 'flex',
            flex: 1,
            scrollbarWidth: 'thin',
            width: '100vw',
            overflow: 'hidden',
            height: '100vh',
        },
        appBar: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: isSmallScreen ? theme.spacing(1) : theme.spacing(2),
            // width: '100%',
            ...(!auth && {
                backgroundColor: theme.palette.background.paper,
            }),
        },
        breadcrumbs: {
            display: 'flex',
            justifyContent: 'left',
            flex: 1,
            alignItems: 'center',
            marginLeft: isSmallScreen ? 0 : theme.spacing(20),
        },
        tools: {
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            paddingRight: theme.spacing(3),
        },
        adminTools: {
            display: 'flex',
            flex: 1,
        },
        main: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: `calc(100vh - 64px)`,
            width: '100vw',
            // paddingBottom: 64,
            // overflow: 'hidden',
            [theme.breakpoints.only('xs')]: {
                padding: 0,
                margin: 0,
                marginTop: theme.spacing(8),
            },
        },
        content: {
            // display: 'flex',
            // flexDirection: 'column',
            height: '100vh',
            width: '90vw',
            transition: `max-height 300ms ease-in-out`,
            '&::-webkit-scrollbar': {
                width: 8,
            },
            scrollbarWidth: 'thin',
            [theme.breakpoints.up('lg')]: {
                maxWidth: '80%',
            },
            [theme.breakpoints.only('xs')]: {
                padding: 0,
                margin: 0,
            },
        },
    };
});

export default Main;

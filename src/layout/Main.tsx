import { FC, Suspense, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Box, Breadcrumbs, Divider, Grow, IconButton, Stack, Theme, useTheme } from '@mui/material';
import { useTools } from '@/contexts/ToolsContext';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppSelector } from '@/redux/hooks';
import Holding from '@/layout/Holding';
import useScreenSize from '@/hooks/useScreenSize';
import MaintenanceScreen from '@/screens/error/MaintenanceScreen';
import Sidebar from '@/components/sidebar';
import SidebarProvider from '@/providers/SidebarProvider';
import AdminMenu from '@/components/AdminMenu';
import DrawerHeader from '@/components/drawer/DrawerHeader';
import imagePaths from '@/utils/imagePaths';

const Main: FC = () => {
    const auth = useAppSelector((state) => state.auth.status);
    const maintenance = useAppSelector((state) => state.app.maintenance);
    const { isSmallScreen } = useScreenSize();
    const theme = useTheme();
    console.log('theme', theme);
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
                                <img width={32} height={32} src={imagePaths.logo} alt={'Logo'} />
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

                <Box component={'main'} className={classes.main}>
                    <Grow easing={'ease-in-out'} in={false} timeout={100}>
                        <Suspense fallback={<Holding {...{ spinner: true }} />}>
                            <Outlet />
                        </Suspense>
                    </Grow>
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
            width: '100%',
            maxWidth: '100%',
            overflow: 'auto',
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
            // overflow: 'auto',
            // justifyContent: 'center',
            // alignContent: 'center',
            height: `100%`,
            width: '100%',
            maxWidth: `calc(100vw - ${open ? '200px' : theme.spacing(7)} + 1px)`,
            transition: `all ${open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp}`,
            // paddingBottom: 64,
            padding: theme.spacing(1),
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing(2),
                // padding: 0,
                // margin: 0,
                marginTop: theme.spacing(2),
            },
        },
    };
});

export default Main;

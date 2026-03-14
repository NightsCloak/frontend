import { FC, Suspense, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Breadcrumbs, Divider, Grow, IconButton, Stack, Theme } from '@mui/material';
import { useTools } from '@/contexts/ToolsContext';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Holding from '@/layout/Holding';
import useScreenSize from '@/hooks/useScreenSize';
import MaintenanceScreen from '@/screens/error/MaintenanceScreen';
import Sidebar from '@/components/sidebar';
import SidebarProvider from '@/providers/SidebarProvider';
import UserMenu from '@/components/UserMenu';
import DrawerHeader from '@/components/drawer/DrawerHeader';
import imagePaths from '@/utils/imagePaths';
import { toggleDrawer } from '@/redux/reducers/appSlice';
import PublicMenu from '@/components/NavBar/PublicMenu';

const Main: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth.status);
    const maintenance = useAppSelector((state) => state.app.maintenance);
    const drawer = useAppSelector((state) => state.app.drawer);
    const { isSmallScreen } = useScreenSize();
    const { classes, theme } = useStyles({ isSmallScreen, auth, open: drawer });

    const { tools, breadcrumbs, modal } = useTools();

    useEffect(() => {
        if (drawer) {
            dispatch(toggleDrawer());
        }
    }, [auth]);

    useEffect(() => {
        !isSmallScreen && dispatch(toggleDrawer());
    }, [isSmallScreen]);

    return (
        <>
            <DrawerHeader />
            <div className={classes.root}>
                {maintenance && <MaintenanceScreen />}
                <AppBar position="fixed" className={classes.appBar} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                    <>
                        {auth && (
                            <IconButton onClick={() => dispatch(toggleDrawer())} color="inherit">
                                <MenuIcon sx={{ color: 'white' }} />
                            </IconButton>
                        )}
                        <Link to={'/'}>
                            <Stack spacing={2} sx={{ pl: 2 }} direction={'row'} alignItems={'center'}>
                                <img width={'auto'} height={48} src={imagePaths.logo} alt={'Logo'} />
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
                    <div className={classes.appBarMenu}>
                        <PublicMenu />
                        <UserMenu />
                    </div>
                </AppBar>

                {auth && (
                    <SidebarProvider>
                        <Sidebar />
                    </SidebarProvider>
                )}

                <div className={classes.main}>
                    <Grow easing={'ease-in-out'} in={false} timeout={100}>
                        <Suspense fallback={<Holding {...{ spinner: true }} />}>
                            <Outlet />
                        </Suspense>
                    </Grow>
                </div>
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
            ...(!auth && {
                backgroundColor: theme.palette.background.paper,
            }),
        },
        appBarMenu: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'end',
            display: 'flex',
            flexDirection: 'row',
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
            // flex: 1,
            flexDirection: 'column',
            alignItems: auth ? undefined : 'center',
            height: '100%',
            width: '100%',
            maxWidth: `calc(100vw - ${auth ? (open ? '200px' : theme.spacing(9)) : '0'} + 1px)`,
            transition: `all ${open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp}`,
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing(2),
            },
            padding: (!isSmallScreen && auth) || (!isSmallScreen && !auth) ? theme.spacing(2) : 0,
        },
    };
});

export default Main;

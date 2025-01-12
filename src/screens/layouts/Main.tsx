import { FC, Suspense, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Badge, Box, Breadcrumbs, Divider, IconButton, Stack, Theme, useTheme } from '@mui/material';
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
import DrawerHeader from '@/components/drawer/DrawerHeader';
import AdminMenu from '@/components/AdminMenu';

const Main: FC = () => {
    const auth = useAppSelector((state) => state.auth.status);
    const user = useAppSelector((state) => state.user.data);
    const maintenance = useAppSelector((state) => state.app.maintenance);
    const { isSmallScreen } = useScreenSize();
    const theme = useTheme();
    const { classes } = useStyles({ isSmallScreen, auth });
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
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
        <div className={classes.root}>
            {maintenance && <MaintenanceScreen />}
            <AppBar
                position="fixed"
                className={classes.appBar}
                sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
            >
                {isSmallScreen ? (
                    <Stack
                        spacing={1}
                        direction={'row'}
                        alignItems={'center'}
                        divider={<Divider orientation={'vertical'} flexItem />}
                    >
                        <Badge
                            overlap={'circular'}
                            color={'secondary'}
                            badgeContent={
                                (user?.unread_notifications_count ?? 0) +
                                (user?.pending_organization_members_count ?? 0)
                            }
                            max={99}
                        />
                        <Link to={auth ? '/home' : '/'}>
                            <img
                                style={{
                                    marginRight: theme.spacing(2),
                                    marginLeft: theme.spacing(1),
                                    marginTop: theme.spacing(1),
                                }}
                                width={32}
                                height={32}
                                src={theme.palette.mode === 'dark' ? imagePaths.lightLogo : imagePaths.darkLogo}
                                alt={'Logo'}
                            />
                        </Link>
                    </Stack>
                ) : (
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
                )}
                {auth && (
                    <>
                        {isSmallScreen && <Divider sx={{ mr: 2 }} orientation={'vertical'} flexItem />}
                        <div className={classes.breadcrumbs}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize={'small'} />}>{breadcrumbs}</Breadcrumbs>
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
            <Box component={'main'} sx={{ flex: 1, p: 2 }} className={classes.content}>
                <DrawerHeader />
                <Suspense fallback={<Holding {...{ spinner: true }} />}>
                    <Outlet />
                </Suspense>
            </Box>
            {modal}
        </div>
    );
};

const useStyles = makeStyles<{ isSmallScreen: boolean; auth: boolean }>()((theme: Theme, { isSmallScreen, auth }) => {
    return {
        root: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            scrollbarWidth: 'thin',
        },
        appBar: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: auth ? 48 : 64,
            paddingLeft: isSmallScreen ? theme.spacing(1) : theme.spacing(2),
            width: '100%',
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
            height: `calc(100% - ${theme.spacing(8)})`,
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            // flex: 1,
            width: '100%',
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
            transition: `max-height 300ms ease-in-out`,
            '&::-webkit-scrollbar': {
                width: 8,
            },
            scrollbarWidth: 'thin',
        },
    };
});

export default Main;

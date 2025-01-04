import { FC, Suspense, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Badge, Box, Breadcrumbs, Divider, IconButton, Stack, Theme, useTheme } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import GuestMenu from '@intractinc/base/layout/navbar/GuestMenu';
import Holding from '@intractinc/base/layout/Holding';
import imagePaths from '@intractinc/base/hooks/imagePaths';
import useScreenSize from '@intractinc/base/hooks/useScreenSize';
import MaintenanceScreen from '@/screens/error/MaintenanceScreen';
import Sidebar from '@/components/Sidebar';
import DrawerHeader from '@/components/Drawer/DrawerHeader';

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
        console.log('drawerOpen', drawerOpen);
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
                        <Link to={'/'}>
                            <Stack spacing={2} direction={'row'} alignItems={'center'}>
                                {auth && (
                                    <IconButton onClick={toggleDrawer} color="inherit">
                                        <MenuIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                )}
                                <img width={32} height={32} src={imagePaths.iconLogo} alt={'Logo'} />
                                <img
                                    height={32}
                                    width={157}
                                    src={theme.palette.mode === 'dark' ? imagePaths.lightLogo : imagePaths.darkLogo}
                                    alt={'Logo'}
                                />
                            </Stack>
                        </Link>
                        {!auth && (
                            <div className={classes.guest}>
                                <GuestMenu />
                            </div>
                        )}
                    </>
                )}
                {auth && (
                    <>
                        {isSmallScreen && <Divider sx={{ mr: 2 }} orientation={'vertical'} flexItem />}
                        <div className={classes.breadcrumbs}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize={'small'} />}>{breadcrumbs}</Breadcrumbs>
                        </div>
                        <div className={classes.tools}>{tools}</div>
                        <div className={classes.adminTools}>Admin Tools</div>
                    </>
                )}
            </AppBar>
            {auth && <Sidebar open={drawerOpen} />}
            <Box component={'main'} sx={{ flexGrow: 1, p: 2, flexDirection: 'column' }}>
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
        guest: {
            display: 'flex',
            // width: '100%',
            flex: 1,
            justifyContent: 'end',
            marginRight: theme.spacing(1),
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
            border: '1px solid red',
        },
        adminTools: {
            display: 'flex',
            flex: 1,
            border: '1px solid red',
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

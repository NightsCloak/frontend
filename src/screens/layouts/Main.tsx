import { FC, Suspense, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { Badge, Breadcrumbs, Divider, Drawer, IconButton, Stack, Theme, useTheme } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '@intractinc/base/layout/sidebar/Sidebar';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import GuestMenu from '@intractinc/base/layout/navbar/GuestMenu';
import Holding from '@intractinc/base/layout/Holding';
import imagePaths from '@intractinc/base/hooks/imagePaths';
import useScreenSize from '@intractinc/base/hooks/useScreenSize';

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
            <div className={classes.appBar}>
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
                        >
                            <IconButton onClick={toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        </Badge>
                        <Link to={auth ? '/home' : '/'}>
                            <img
                                style={{
                                    marginRight: theme.spacing(2),
                                    marginLeft: theme.spacing(1),
                                    marginTop: theme.spacing(1),
                                }}
                                width={32}
                                height={32}
                                src={imagePaths.iconLogo}
                                alt={'Logo'}
                            />
                        </Link>
                    </Stack>
                ) : (
                    <>
                        <Link to={auth ? '/home' : '/'}>
                            <Stack spacing={2} direction={'row'}>
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
                    </>
                )}
            </div>
            <div className={classes.main}>
                {!maintenance &&
                    (isSmallScreen ? (
                        <Drawer
                            PaperProps={{ sx: { borderTopRightRadius: (theme) => theme.spacing(1) } }}
                            open={drawerOpen}
                            onClose={toggleDrawer}
                            ModalProps={{ keepMounted: true }}
                            transitionDuration={theme.transitions.duration.complex}
                        >
                            {auth ? (
                                <Sidebar {...{ inDrawer: true, toggleDrawer }} />
                            ) : (
                                <GuestMenu {...{ inSidebar: true, toggleDrawer }} />
                            )}
                        </Drawer>
                    ) : (
                        <Sidebar {...{ toggleDrawer }} />
                    ))}
                <div className={classes.content}>
                    <Suspense fallback={<Holding {...{ spinner: true }} />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
            {modal}
        </div>
    );
};

const useStyles = makeStyles<{ isSmallScreen: boolean; auth: boolean }>()((theme: Theme, { isSmallScreen, auth }) => {
    return {
        root: {
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            height: '100%',
            width: '100%',
        },
        appBar: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: auth ? 48 : 64,
            marginBottom: auth ? theme.spacing(1) : 0,
            marginTop: auth ? theme.spacing(1) : 0,
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
            width: '100%',
            alignItems: 'center',
            marginLeft: isSmallScreen ? 0 : theme.spacing(20),
        },
        tools: {
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            paddingRight: theme.spacing(3),
        },
        main: {
            display: 'flex',
            // flex: 1,
            // width: 'calc(100% - 280)',
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

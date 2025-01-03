import { Children, FC, Suspense, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { Breadcrumbs, Drawer, IconButton, Stack, Theme, useTheme } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import imagePaths from '@intractinc/base/hooks/imagePaths';
import useScreenSize from '@intractinc/base/hooks/useScreenSize';
import Sidebar from '@intractinc/base/layout/sidebar/Sidebar';

const Admin: FC = () => {
    const theme = useTheme();
    const isAdmin = useAppSelector((state) => state.user.data?.is_admin);
    const { isSmallScreen } = useScreenSize();
    const { classes } = useStyles({ isSmallScreen });
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { tools, breadcrumbs, modal } = useTools();
    const toggleDrawer = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    if (!isAdmin) {
        return <ErrorScreen message={'Invalid permissions.'} />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.appBar}>
                {isSmallScreen && (
                    <>
                        <IconButton sx={{ mr: 1 }} onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Link to={'/admin'}>
                            <img
                                style={{ marginRight: theme.spacing(2) }}
                                width={32}
                                height={32}
                                src={imagePaths.iconLogo}
                                alt={'Logo'}
                            />
                        </Link>
                    </>
                )}
                {!isSmallScreen && (
                    <>
                        <Link to={'/admin'}>
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
                    </>
                )}
                <div className={classes.breadcrumbs}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize={'small'} />}>
                        {isSmallScreen
                            ? Children.toArray(breadcrumbs)[Children.toArray(breadcrumbs).length - 1]
                            : breadcrumbs}
                    </Breadcrumbs>
                </div>
                <div className={classes.tools}>{tools}</div>
            </div>
            <div className={classes.main}>
                {isSmallScreen ? (
                    <Drawer
                        PaperProps={{ sx: { borderTopRightRadius: (theme) => theme.spacing(1) } }}
                        open={drawerOpen}
                        onClose={toggleDrawer}
                        ModalProps={{ keepMounted: true }}
                        transitionDuration={theme.transitions.duration.complex}
                    >
                        <Sidebar {...{ inDrawer: true, toggleDrawer, admin: true }} />
                    </Drawer>
                ) : (
                    <Sidebar {...{ toggleDrawer, admin: true }} />
                )}
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

const useStyles = makeStyles<{ isSmallScreen: boolean }>()((theme: Theme, { isSmallScreen }) => {
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
            height: 48,
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(1),
            paddingLeft: isSmallScreen ? theme.spacing(1) : theme.spacing(2),
            width: '100%',
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

export default Admin;

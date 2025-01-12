import { Avatar, IconButton, Typography } from '@mui/material';
import { FC, use, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@intractinc/base/redux/hooks';
import { makeStyles } from 'tss-react/mui';
import DrawerHeader from '@/components/drawer/DrawerHeader';
import Drawer from '@/components/drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import apiSlice from '@intractinc/base/redux/apiSlice';
import { persistor } from '@intractinc/base/redux/store';
import { useLogoutMutation } from '@intractinc/base/redux/features/auth';
import { logout as userLogout } from '@intractinc/base/redux/reducers/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from '@/components/sidebar/Home';
import SidebarContext from '@/contexts/SidebarContext';

const Index = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [logoutTrigger, { isSuccess }] = useLogoutMutation();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const { open } = use(SidebarContext);
    const logoutHandler = async () => {
        await dispatch(userLogout());
        await dispatch(apiSlice.util.resetApiState());
        persistor.purge();
        persistor.persist();
    };

    const logout = useCallback(async () => {
        if (import.meta.env.VITE_AUTH_FLOW === 'pkce') {
            console.log('logout pkce');
            logoutHandler();
        } else {
            console.log('logout auth');
            logoutTrigger();
        }
        console.log('import', import.meta);
        if (import.meta.env.DEV) window.location.reload();
        else {
            navigate('/');
        }
    }, []);

    const SidebarSection: FC = useCallback(() => {
        switch (location.pathname.split('/')[1]) {
            case 'organization':
                return <div>Organization</div>;
            case 'project':
                return <div>project</div>;
            case 'user':
                return <div>User</div>;
        }
        return <Home />;
    }, [location]);

    useEffect(() => {
        console.log('isSuccess', isSuccess);
        if (isSuccess) {
            logoutHandler();
        }
    }, [isSuccess]);

    return (
        <Drawer variant={'permanent'} open={open}>
            <DrawerHeader />
            <div className={classes.root}>
                <div className={classes.avatar}>
                    <Avatar alt={user.name} src={user.data?.avatar_route ?? ''} />
                    <Typography variant={'caption'}>
                        {open ? user.name : `${user.data?.first[0]}.${user.data?.last[0]}.`}
                    </Typography>
                    <div>
                        <IconButton onClick={logout}>
                            <LogoutIcon />
                        </IconButton>
                    </div>
                </div>
                <SidebarSection />
            </div>
        </Drawer>
    );
};

const useStyles = makeStyles()(() => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
    },
    avatar: {
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
}));

export default Index;

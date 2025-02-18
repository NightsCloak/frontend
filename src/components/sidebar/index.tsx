import { Avatar, IconButton, Typography } from '@mui/material';
import {ReactNode, use, useCallback, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { makeStyles } from 'tss-react/mui';
import DrawerHeader from '@/components/drawer/DrawerHeader';
import Drawer from '@/components/drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import apiSlice from '@/redux/apiSlice';
import { persistor } from '@/redux/store';
import { useLogoutMutation } from '@/redux/features/auth';
import { logout as userLogout } from '@/redux/reducers/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarContext from '@/contexts/SidebarContext';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import defaultMenu from '@/components/sidebar/defaultMenu';

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

    const SidebarSection = (section: string = 'default') => {
        const menus: {[key: string]: ReactNode} = {
            default: <SidebarMenu menuItems={defaultMenu} />,
        };

        if (!Object.prototype.hasOwnProperty.call(menus, section)) {
            return menus['default'];
        }

        return menus[section];
    };

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
                {SidebarSection(location.pathname.split('/')[1])}
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

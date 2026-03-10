import { MenuItem, MenuList } from '@mui/material';
import { useLocation } from 'react-router';
import { useAppSelector } from '@/redux/hooks';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import NCLink from './NCLink';

const UserMenu = () => {
    const location = useLocation();
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.user);
    const { classes } = useStyles();
    const navigate = useNavigate();

    const handleLoginNavigation = () => {
        if (location.pathname !== '/login') {
            navigate('/login');
        }
    };

    return (
        <div className={classes.root}>
            <MenuList className={classes.menuList}>
                {!auth.status && (
                    <>
                        <MenuItem selected={location.pathname === '/login'} onClick={handleLoginNavigation}>
                            Login
                        </MenuItem>
                        <NCLink to={'/register'}>
                            <MenuItem selected={location.pathname === '/register'}>register</MenuItem>
                        </NCLink>
                    </>
                )}
                {auth.status && <MenuItem>{user.name}</MenuItem>}
            </MenuList>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        marginRight: theme.spacing(1),
    },
    menuList: { display: 'flex', flexDirection: 'row', '& > *': { marginLeft: theme.spacing(1) } },
}));
export default UserMenu;

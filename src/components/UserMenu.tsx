import { Menu, MenuItem, MenuList } from '@mui/material';
import { useLocation } from 'react-router';
import { useAppSelector } from '@/redux/hooks';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import NCLink from './NCLink';
import { MouseEventHandler, useState } from 'react';

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);
    const open = Boolean(anchorEl);
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

    const handleMenuClick: MouseEventHandler = (event) => {
        !anchorEl && setAnchorEl(event.currentTarget);
        anchorEl && setAnchorEl(null);
    };

    const handleMenuNavigation: MouseEventHandler = (event) => {
        anchorEl && setAnchorEl(null);
        switch (event.currentTarget.textContent) {
            case 'Account Settings':
                navigate('/home/account');
        }
    };

    const menu = [{ element: <MenuItem onClick={handleMenuNavigation}>Account Settings</MenuItem> }];

    return (
        <div className={classes.root}>
            <MenuList className={classes.menuList}>
                {!auth.status && (
                    <>
                        <MenuItem
                            key={'login'}
                            selected={location.pathname === '/login'}
                            onClick={handleLoginNavigation}
                        >
                            Login
                        </MenuItem>
                        <NCLink key={'register'} to={'/register'}>
                            <MenuItem selected={location.pathname === '/register'}>register</MenuItem>
                        </NCLink>
                    </>
                )}
                {auth.status && [
                    <MenuItem id={'user_menu'} onClick={handleMenuClick} key={'user_menu_anchor'}>
                        {user.name}
                    </MenuItem>,
                    <Menu
                        key={'user_menu'}
                        id={'user_menu'}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                        }}
                    >
                        {menu.map((item) => item.element)}
                    </Menu>,
                ]}
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

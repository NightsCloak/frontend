import {
    Avatar,
    Button,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    MenuList,
    SxProps,
    Theme,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CSSProperties, FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { persistor } from '@/redux/store';
import { FactCheck, Home, Logout, ManageAccounts, QuestionAnswer, Security } from '@mui/icons-material';
import { useLocation } from 'react-router';
import { makeStyles } from 'tss-react/mui';
import { logout as userLogout, toggleDarkMode } from '@/redux/reducers/userSlice';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useLogoutMutation } from '@/redux/features/auth';
import apiSlice from '@/redux/apiSlice';

type MenuObject = {
    title: string | ReactNode;
    icon?: ReactNode;
    ignore?: boolean;
    navigateTo?: string;
    isTheme?: boolean;
    isLogout?: boolean;
    isHeader?: boolean;
    selected?: boolean;
    divider?: { top?: boolean; bottom?: boolean };
}[];

type PortalSelection = 'settings' | 'assets' | 'images' | 'terms' | 'privacy' | 'contact' | 'community';

type UserDropdownProps = {
    showName?: boolean;
    style?: CSSProperties;
    buttonStyle?: SxProps<Theme>;
    flipArrow?: boolean;
};

const UserDropdown: FC<UserDropdownProps> = ({ showName = true, ...props }) => {
    const { classes } = useStyles();
    const user = useAppSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selection, setSelection] = useState<PortalSelection | null>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [logoutTrigger, { isSuccess }] = useLogoutMutation();

    const toggleDarkModeHandler = () => {
        dispatch(toggleDarkMode());
    };

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => setAnchorEl(null), []);

    const navigateTo = useCallback((path: string) => {
        setAnchorEl(null);
        navigate(path);
    }, []);

    const logoutHandler = () => {
        dispatch(userLogout());
        dispatch(apiSlice.util.resetApiState());
        persistor.purge();
        persistor.persist();
    };

    const logout = useCallback(async () => {
        setAnchorEl(null);

        if (import.meta.env.VITE_AUTH_FLOW === 'pkce') {
            console.log('logout pkce');
            logoutHandler();
        } else {
            console.log('logout auth');
            logoutTrigger();
        }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            logoutHandler();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (location.pathname === '/home/account') {
            setSelection('settings');
            return;
        }

        if (location.pathname === '/terms') {
            setSelection('terms');
            return;
        }

        if (location.pathname === '/privacy') {
            setSelection('privacy');
            return;
        }

        if (location.pathname === '/contact') {
            setSelection('contact');
            return;
        }

        setSelection(null);
    }, [location]);

    const menuItems = useMemo((): MenuObject => {
        return [
            {
                title: user.data?.name ?? 'Profile',
                isHeader: true,
                ignore: !user.data?.name,
            },
            {
                title: 'Home',
                icon: <Home fontSize={'small'} />,
                navigateTo: '/home',
                ignore: !location.pathname.includes('admin') && !location.pathname.includes('organizations'),
            },
            {
                title: 'Account',
                icon: <ManageAccounts fontSize={'small'} />,
                navigateTo: '/home/account',
                selected: selection === 'settings',
                ignore: !user.data,
            },
            {
                title: 'Terms',
                icon: <FactCheck fontSize={'small'} />,
                navigateTo: '/terms',
                selected: selection === 'terms',
            },
            {
                title: 'Privacy',
                icon: <Security fontSize={'small'} />,
                navigateTo: '/privacy',
                selected: selection === 'privacy',
            },
            {
                title: 'Contact',
                icon: <QuestionAnswer fontSize={'small'} />,
                navigateTo: '/contact',
                selected: selection === 'contact',
            },
            {
                title: 'Theme',
                isTheme: true,
                divider: { bottom: true },
            },
            {
                title: 'Logout',
                icon: <Logout fontSize={'small'} />,
                isLogout: true,
            },
        ].filter((item) => item.ignore !== true);
    }, [user.data, selection, location]);

    if (!user.data?.id) {
        return null;
    }

    return (
        <div className={classes.root} style={{ ...props.style }}>
            <Button
                id={'user_menu_button'}
                fullWidth
                sx={{
                    paddingLeft: (theme) => theme.spacing(1),
                    paddingRight: (theme) => theme.spacing(1),
                    root: { width: '100%' },
                    // color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                    ...props.buttonStyle,
                }}
                onClick={handleClick}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup={'true'}
                aria-expanded={open ?? undefined}
            >
                <Avatar
                    sx={{
                        height: 32,
                        width: 32,
                        mr: 1,
                    }}
                    src={user.data.avatar_route ?? undefined}
                    alt={`${user.data?.name}'s Avatar`}
                >
                    {user.data?.initials}
                </Avatar>
                {showName && ` ${user.data?.name} `}
                <div style={{ display: 'flex', justifyContent: 'end', flex: 1 }}>
                    <ArrowDropDownIcon
                        style={{
                            ...(props.flipArrow && {
                                transform: 'rotate(180deg)',
                            }),
                            ...(open && {
                                transform: `rotate(${props.flipArrow ? '0deg' : '180deg'})`,
                            }),
                        }}
                    />
                </div>
            </Button>

            <Menu
                id={'user_menu'}
                anchorEl={anchorEl}
                container={document.getElementById('#sidebar')}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                // anchorPosition={{ left: 0, top: 100 }}
                sx={(theme) => ({
                    '& .MuiPaper-root': {
                        border: `1px solid ${theme.palette.nc.dark}80`,
                        // marginBottom: theme.spacing(2),
                    },
                })}
                slotProps={{
                    paper: {
                        // elevation: 0,
                        sx: {
                            paddingBottom: 0,
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& ul': {
                                paddingTop: 0.5,
                                paddingBottom: 0.3,
                            },
                        },
                    },
                }}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuList dense={true}>
                    {menuItems.map((item, index) => (
                        <span key={index}>
                            {item.isHeader ? (
                                <>
                                    <Typography sx={{ mx: 2 }} variant={'overline'}>
                                        {item.title}
                                    </Typography>
                                    <Divider />
                                </>
                            ) : (
                                <>
                                    {item.divider?.top && <Divider sx={{ marginY: 1 }} />}
                                    <MenuItem
                                        selected={item.selected}
                                        onClick={() =>
                                            item.isLogout
                                                ? logout()
                                                : item.isTheme
                                                  ? toggleDarkModeHandler()
                                                  : navigateTo(item.navigateTo ?? '/')
                                        }
                                    >
                                        <ListItemIcon>
                                            {item.isTheme ? (
                                                user.settings.darkMode ? (
                                                    <DarkModeIcon />
                                                ) : (
                                                    <LightModeIcon />
                                                )
                                            ) : (
                                                item.icon
                                            )}
                                        </ListItemIcon>
                                        {item.title}
                                    </MenuItem>
                                    {item.divider?.bottom && <Divider sx={{ marginY: 1 }} />}
                                </>
                            )}
                        </span>
                    ))}
                </MenuList>
            </Menu>
        </div>
    );
};

const useStyles = makeStyles()(() => ({
    root: {
        // '& > *': { color: '#000' },
    },
}));

export default UserDropdown;

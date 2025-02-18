import {
    Button,
    IconButton,
    MenuItem,
    MenuList,
    Typography,
    useTheme,
    Link,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FC } from 'react';
import { useLocation } from 'react-router';
import { toggleDarkMode } from '@/redux/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { makeStyles } from 'tss-react/mui';
import { FactCheck, Login, PersonAdd, QuestionAnswer, Security } from '@mui/icons-material';

type GuestMenuProps = {
    inSidebar?: boolean;
    toggleDrawer?: () => void;
};

const GuestMenu: FC<GuestMenuProps> = ({ inSidebar, toggleDrawer }) => {
    const { classes } = useStyles();
    const user = useAppSelector((state) => state.user);
    const location = useLocation();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const hideAuth = location.pathname.includes('/invite');
    const defaultColor = theme.palette.mode === 'dark' ? 'white' : 'black';
    const activeColor = theme.palette.primary.main;

    const toggleDarkModeHandler = () => {
        dispatch(toggleDarkMode());
    };

    if (inSidebar) {
        return (
            <div className={classes.navContainer}>
                <MenuList className={classes.menuList}>
                    {!hideAuth && (
                        <MenuItem selected={location.pathname === '/login'}>
                            <Link onClick={toggleDrawer} className={classes.link} component={RouterLink} to={'/login'}>
                                <ListItemIcon>
                                    <Login />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant={'subtitle1'}>Log In</Typography>
                                </ListItemText>
                            </Link>
                        </MenuItem>
                    )}
                    {!hideAuth && (
                        <MenuItem selected={location.pathname === '/register'}>
                            <Link
                                onClick={toggleDrawer}
                                className={classes.link}
                                component={RouterLink}
                                to={'/register'}
                            >
                                <ListItemIcon>
                                    <PersonAdd />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant={'subtitle1'}>Register</Typography>
                                </ListItemText>
                            </Link>
                        </MenuItem>
                    )}
                    <MenuItem selected={location.pathname === '/terms'}>
                        <Link onClick={toggleDrawer} className={classes.link} component={RouterLink} to={'/terms'}>
                            <ListItemIcon>
                                <FactCheck />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'subtitle1'}>Terms</Typography>
                            </ListItemText>
                        </Link>
                    </MenuItem>
                    <MenuItem selected={location.pathname === '/privacy'}>
                        <Link onClick={toggleDrawer} className={classes.link} component={RouterLink} to={'/privacy'}>
                            <ListItemIcon>
                                <Security />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'subtitle1'}>Privacy</Typography>
                            </ListItemText>
                        </Link>
                    </MenuItem>
                    <MenuItem selected={location.pathname === '/contact'}>
                        <Link onClick={toggleDrawer} className={classes.link} component={RouterLink} to={'/contact'}>
                            <ListItemIcon>
                                <QuestionAnswer />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'subtitle1'}>Contact Us</Typography>
                            </ListItemText>
                        </Link>
                    </MenuItem>
                    <Divider component={'li'} variant={'middle'} />
                    <MenuItem onClick={toggleDarkModeHandler}>
                        <ListItemIcon>{user.settings.darkMode ? <DarkModeIcon /> : <LightModeIcon />}</ListItemIcon>
                        <ListItemText>
                            <Typography variant={'subtitle1'}>Theme</Typography>
                        </ListItemText>
                    </MenuItem>
                </MenuList>
            </div>
        );
    }

    return (
        <>
            <Link component={RouterLink} to={'/terms'} data-testid={'terms-link'}>
                <Button>
                    <Typography
                        sx={{
                            color: location.pathname === '/terms' ? activeColor : defaultColor,
                        }}
                    >
                        Terms
                    </Typography>
                </Button>
            </Link>
            <Link component={RouterLink} to={'/privacy'} data-testid={'privacy-link'}>
                <Button>
                    <Typography
                        sx={{
                            color: location.pathname === '/privacy' ? activeColor : defaultColor,
                        }}
                    >
                        Privacy
                    </Typography>
                </Button>
            </Link>
            <Link component={RouterLink} to={'/contact'} data-testid={'contact-link'}>
                <Button>
                    <Typography
                        sx={{
                            color: location.pathname === '/contact' ? activeColor : defaultColor,
                        }}
                    >
                        Contact
                    </Typography>
                </Button>
            </Link>
            {!hideAuth && (
                <>
                    <Link component={RouterLink} to={'/register'} data-testid={'registerLinkGuest'}>
                        <Button>
                            <Typography
                                sx={{
                                    color: location.pathname === '/register' ? activeColor : defaultColor,
                                }}
                            >
                                Register
                            </Typography>
                        </Button>
                    </Link>
                    <Link component={RouterLink} to={'/login'} data-testid={'login-link'}>
                        <Button>
                            <Typography
                                sx={{
                                    color: location.pathname === '/login' ? activeColor : defaultColor,
                                }}
                            >
                                Log In
                            </Typography>
                        </Button>
                    </Link>
                </>
            )}
            <IconButton
                sx={{ marginLeft: 0.5 }}
                size={'small'}
                onClick={toggleDarkModeHandler}
                color={'inherit'}
                aria-label={'System Color Preference'}
            >
                {user.settings.darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </>
    );
};

const useStyles = makeStyles()((theme) => ({
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    navContainer: {
        width: 250,
        height: '100%',
        borderTopRightRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[8],
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: 0,
            display: 'none',
        },
        scrollbarWidth: 'none',
    },
    menuList: {
        paddingTop: 0,
        '& .MuiMenuItem-root': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
    },
}));

export default GuestMenu;

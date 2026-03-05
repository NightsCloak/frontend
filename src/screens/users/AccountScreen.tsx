import { makeStyles } from 'tss-react/mui';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AlertTitle,
    Avatar,
    Button,
    Chip,
    Divider,
    Grid,
    Stack,
    Theme,
    Typography,
} from '@mui/material';
import {
    AccountBox,
    Badge,
    Delete,
    Email,
    EnhancedEncryption,
    ExpandMore,
    History,
    HowToReg,
    Lock,
    VerifiedUser,
} from '@mui/icons-material';
import { Spinner } from 'react-activity';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import ManageAvatar from '@/components/Users/Settings/ManageAvatar';
import ManageName from '@/components/Users/Settings/ManageName';
import ManageEmail from '@/components/Users/Settings/ManageEmail';
import ManagePassword from '@/components/Users/Settings/ManagePassword';
import DeleteAccount from '@/components/Users/Settings/DeleteAccount';
import LoginHistory from '@/components/Users/Settings/LoginHistory';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTools } from '@/contexts/ToolsContext';
import { useAppSelector } from '@/redux/hooks';
import { useGetUserQuery } from '@/redux/features/user';
import { imagePaths } from '@/hooks/useImagePaths';
import ManageTwoFactor from '@/components/Users/Settings/ManageTwoFactor';
import AuthorizedApplications from '@/components/Users/Settings/AuthorizedApplications';

const AccountScreen: FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { classes, theme } = useStyles();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const auth = useAppSelector((state) => state.auth);

    const {
        data: user,
        isSuccess: isUserLoaded,
        refetch,
    } = useGetUserQuery(null, {
        refetchOnMountOrArgChange: true,
        skip: (!auth.pkce.accessToken || !auth.xsrfToken) && !auth.status,
    });

    const menuChanged = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Your Account' }]);
        updateTabTitle('Your Account');
    }, []);

    useEffect(() => {
        if (user && (!expanded || expanded === 'onboarding')) {
            const action = searchParams.get('action');

            if (action) {
                if (action === 'subscribed' || action === 'subscription') {
                    setExpanded('subscription');
                } else if (action === '2fa') {
                    setExpanded('2fa');
                } else if (action === 'apps') {
                    setExpanded('apps');
                }

                return;
            }

            setExpanded(user.is_verified ? 'apps' : 'verify');
        }
    }, [user, searchParams]);

    useEffect(() => {
        if (user && !user.is_verified) {
            const poll = setInterval(refetch, 30000);

            return () => {
                if (poll) {
                    clearInterval(poll);
                }
            };
        }
    }, [user]);

    if (!isUserLoaded)
        return (
            <div className={classes.spinnerRoot}>
                <Spinner />
            </div>
        );

    return (
        <div className={classes.root}>
            <Grid className={classes.gridRoot} container>
                <Grid size={{ xs: 12, md: 12, lg: 10, xl: 8 }}>
                    {!user.is_verified && (
                        <Accordion expanded={expanded === 'verify'} onChange={menuChanged('verify')}>
                            <AccordionSummary
                                sx={{ color: 'warning.main' }}
                                expandIcon={<ExpandMore />}
                                aria-controls="verify-content"
                                id="verify-header"
                            >
                                <HowToReg sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                                <Typography sx={{ marginRight: theme.spacing(1) }} variant={'h5'}>
                                    Verify Account:
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                    <Chip label="Verify Your Account" />
                                </Divider>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity={'warning'}>
                                        <AlertTitle>
                                            You must verify your account email: <strong>{user.email}</strong>
                                        </AlertTitle>
                                        <Typography variant={'body2'}>
                                            Your account will be limited from accessing our features until you have
                                            verified your email address. If you have not received the verification
                                            email, you may resend it below.
                                        </Typography>
                                    </Alert>
                                    <Button
                                        color={'success'}
                                        onClick={() => navigate('/email/verify/resend')}
                                        variant={'contained'}
                                        style={{
                                            marginTop: theme.spacing(2),
                                        }}
                                    >
                                        Resend Verification Email
                                    </Button>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    )}
                    <Accordion
                        slotProps={{ transition: { unmountOnExit: true } }}
                        disabled={!user.is_verified}
                        expanded={expanded === 'avatar'}
                        onChange={menuChanged('avatar')}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="avatar-content" id="avatar-header">
                            <AccountBox sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography sx={{ marginRight: theme.spacing(1) }} variant={'h5'}>
                                Avatar:
                            </Typography>
                            <Avatar
                                sx={{
                                    height: 25,
                                    width: 25,
                                    marginTop: 1,
                                }}
                                src={user.avatar_route ?? imagePaths.user}
                                alt={`${user.name}'s Avatar`}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label="Update Avatar" />
                            </Divider>
                            <ManageAvatar user={user} expandedMenu={setExpanded} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        slotProps={{ transition: { unmountOnExit: true } }}
                        expanded={expanded === 'name'}
                        onChange={menuChanged('name')}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="name-content" id="name-header">
                            <Badge sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography sx={{ marginRight: theme.spacing(1) }} variant={'h5'}>
                                Name:
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }} variant={'h6'}>
                                {user.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label="Update Your Name" />
                            </Divider>
                            <ManageName user={user} expandedMenu={setExpanded} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        slotProps={{ transition: { unmountOnExit: true } }}
                        disabled={!user.is_verified || !user.has_password}
                        expanded={expanded === 'email'}
                        onChange={menuChanged('email')}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="email-content" id="email-header">
                            <Email sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography sx={{ marginRight: theme.spacing(1) }} variant={'h5'}>
                                Email:
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }} variant={'h6'}>
                                {user.email}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label="Update Your Email" />
                            </Divider>
                            <ManageEmail expandedMenu={setExpanded} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        slotProps={{ transition: { unmountOnExit: true } }}
                        expanded={expanded === 'password'}
                        onChange={menuChanged('password')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="password-content"
                            id="password-header"
                        >
                            <Lock sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography variant={'h5'}>Password</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label={`${user.has_password ? 'Update' : 'Set'} Your Password`} />
                            </Divider>
                            <ManagePassword {...{ hasPassword: user.has_password, expandedMenu: setExpanded }} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        disabled={!user.is_verified}
                        slotProps={{ transition: { unmountOnExit: true } }}
                        expanded={expanded === '2fa'}
                        onChange={menuChanged('2fa')}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="2fa-content" id="2fa-header">
                            <EnhancedEncryption sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography variant={'h5'}>Two-Factor Authentication</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label={`${user.has_2fa_enabled ? 'Update' : 'Setup'} Two-Factor`} />
                            </Divider>
                            <ManageTwoFactor {...{ user }} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        disabled={!user.is_verified}
                        slotProps={{ transition: { unmountOnExit: true } }}
                        expanded={expanded === 'apps'}
                        onChange={menuChanged('apps')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="apps-content"
                            id="apps-header"
                            data-tour-id={'settings_linked_apps'}
                        >
                            <VerifiedUser sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography variant={'h5'}>Authorized Applications</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label={'Manage Authorized Applications'} />
                            </Divider>
                            <AuthorizedApplications />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        slotProps={{ transition: { unmountOnExit: true } }}
                        expanded={expanded === 'logins'}
                        onChange={menuChanged('logins')}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="logins-content" id="logins-header">
                            <History sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography variant={'h5'}>Recent Logins</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label="Recent Login History" />
                            </Divider>
                            <LoginHistory />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        slotProps={{ transition: { unmountOnExit: true } }}
                        expanded={expanded === 'delete'}
                        onChange={menuChanged('delete')}
                    >
                        <AccordionSummary
                            sx={{ color: 'error.main' }}
                            expandIcon={<ExpandMore />}
                            aria-controls="delete-content"
                            id="delete-header"
                        >
                            <Delete sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography sx={{ marginRight: theme.spacing(1) }} variant={'h5'}>
                                Delete Account:
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }} variant={'h6'}>
                                Joined - {new Date(user.created_at).toLocaleString()}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label="Delete Your Account" />
                            </Divider>
                            <DeleteAccount {...{ user }} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        '& .MuiPaper-root': {
            flex: 1,
            padding: theme.spacing(1),
        },
    },
    spinnerRoot: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridRoot: {
        justifyContent: 'center',
    },
}));

export default AccountScreen;

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
    useTheme,
} from '@mui/material';
import {
    AccountBox,
    Badge,
    Delete,
    Email,
    ExpandMore,
    HowToReg,
    Lock,
    Payments,
    Receipt,
    Security,
} from '@mui/icons-material';
import { Spinner } from 'react-activity';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

// import {
//     DeleteAccount,
//     LoginHistory,
//     ManageAvatar,
//     ManageEmail,
//     ManageName,
//     ManagePassword,
//     UserInvoices,
//     UserStorageBar,
//     UserSubscription,
//     UserSubscriptionChip,
// } from '@intractinc/base/components/Users';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import { useGetUserQuery } from '@intractinc/base/redux/features/user';
import imagePaths from '@intractinc/base/hooks/imagePaths';
import DeleteAccount from '@intractinc/base/components/Users/Settings/DeleteAccount';
import UserInvoices from '@intractinc/base/components/Billing/User/UserInvoices';
import ManageAvatar from '@intractinc/base/components/Users/Settings/ManageAvatar';
import ManageName from '@intractinc/base/components/Users/Settings/ManageName';
import ManageEmail from '@intractinc/base/components/Users/Settings/ManageEmail';
import ManagePassword from '@intractinc/base/components/Users/Settings/ManagePassword';
import UserSubscriptionChip from '@intractinc/base/components/Billing/User/UserSubscriptionChip';
import UserSubscription from '@intractinc/base/components/Billing/User/UserSubscription';
import UserStorageBar from '@intractinc/base/components/Users/UserStorageBar';
import LoginHistory from '@intractinc/base/components/Users/Settings/LoginHistory';

const AccountScreen: FC = () => {
    const theme = useTheme();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const auth = useAppSelector((state) => state.auth);

    const {
        data: user,
        isSuccess: isUserLoaded,
        refetch,
    } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: (!auth.pkce.accessToken || !auth.xsrfToken) && !auth.status,
    });
    const [expanded, setExpanded] = useState<string | false>(false);
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const menuChanged = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Your Account' }]);
        updateTabTitle('Your Account');
    }, []);

    useEffect(() => {
        if (user && !expanded) {
            const action = searchParams.get('action');

            if (action) {
                if (action === 'subscribed' || action === 'subscription') {
                    setExpanded('subscription');
                }
                return;
            }

            setExpanded(user.is_verified ? 'avatar' : 'verify');
        }
    }, [user]);

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
                <Grid item xs={12} md={12} lg={10} xl={8}>
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
                        TransitionProps={{ unmountOnExit: true }}
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
                        TransitionProps={{ unmountOnExit: true }}
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
                        TransitionProps={{ unmountOnExit: true }}
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
                        TransitionProps={{ unmountOnExit: true }}
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
                        TransitionProps={{ unmountOnExit: true }}
                        disabled={!user.is_verified}
                        expanded={expanded === 'subscription'}
                        onChange={menuChanged('subscription')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="subscription-content"
                            id="subscription-header"
                        >
                            <Payments sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography sx={{ marginRight: theme.spacing(1) }} variant={'h5'}>
                                Subscription:
                            </Typography>
                            <Stack
                                sx={{
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginRight: 2,
                                }}
                                direction={'row'}
                                spacing={2}
                            >
                                <UserSubscriptionChip {...{ subscription: user.current_subscription }} />
                                <UserStorageBar {...{ compact: true }} />
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label="Manage your subscription" />
                            </Divider>
                            <UserSubscription />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        TransitionProps={{ unmountOnExit: true }}
                        disabled={!user.is_verified}
                        expanded={expanded === 'invoices'}
                        onChange={menuChanged('invoices')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="invoices-content"
                            id="invoices-header"
                        >
                            <Receipt sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
                            <Typography sx={{ marginRight: theme.spacing(1) }} variant={'h5'}>
                                Invoices:
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: theme.spacing(2) }}>
                                <Chip label="View your invoices" />
                            </Divider>
                            <UserInvoices />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        TransitionProps={{ unmountOnExit: true }}
                        expanded={expanded === 'logins'}
                        onChange={menuChanged('logins')}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="logins-content" id="logins-header">
                            <Security sx={{ fontSize: 30, marginRight: theme.spacing(1) }} />
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
                        TransitionProps={{ unmountOnExit: true }}
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

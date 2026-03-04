import { Paper, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Sentry } from 'react-activity';
import { makeStyles } from 'tss-react/mui';
import { useHeartbeatQuery, useThirdPartyOauthCallbackMutation } from '@/redux/features/authApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Google, Info } from '@mui/icons-material';
import ChallengeScreen from '@/screens/auth/ChallengeScreen';
import DiscordIcon from '@/components/Layout/Icons/DiscordIcon';
import ErrorScreen from '@/screens/error/ErrorScreen';
import { useAppSelector } from '@/redux/hooks';


const ThirdPartyOauthCallbackScreen: FC = () => {
    const auth = useAppSelector((state) => state.auth);
    const { classes } = useStyles();
    const { provider } = useParams() as { provider: string };
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [challengePassed, setChallengePassed] = useState<boolean>(false);
    const [handlePostCallback, { data: postCallback, error: postError }] = useThirdPartyOauthCallbackMutation();
    const { data: heartbeat, isSuccess: isHeartbeatSuccess, refetch } = useHeartbeatQuery(undefined);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const _error = postError as BasicError | undefined;

    const onChallengeSuccess = () => {
        refetch();
        setChallengePassed(true);
    };

    useEffect(() => {
        const code = searchParams.get('code') ?? 'unknown';
        const state = searchParams.get('state') ?? 'unknown';
        const payload = searchParams.get('payload') ?? 'unknown';
        const oauthError = searchParams.get('error') ?? null;

        if (oauthError) {
            setErrorMessage(`${provider.toUpperCase()} Authorization Canceled.`);
            return;
        }

        if (provider === 'cfx') {
            handlePostCallback({ provider, payload });
            return;
        }

        handlePostCallback({ provider, code, state });
    }, []);

    useEffect(() => {
        if (postCallback) {
            refetch();
        }
    }, [postCallback]);

    useEffect(() => {
        if (!isHeartbeatSuccess || !heartbeat.auth || (!postCallback && !challengePassed)) {
            return;
        }

        if (postCallback?.linked) {
            navigate('/home/account?action=apps', { replace: true });
            return;
        }

        if (auth.intended || auth.redirect) {
            return;
        }

        navigate('/home/account', { replace: true });
    }, [isHeartbeatSuccess, heartbeat, postCallback, challengePassed]);

    useEffect(() => {
        if (_error) {
            if (_error.status === 400) {
                return;
            }

            setErrorMessage(_error.data.message);
        }
    }, [_error]);

    if (_error?.status === 400) {
        return <ChallengeScreen {...{ onSuccess: onChallengeSuccess, onCancel: () => navigate('/login') }} />;
    }

    if (errorMessage) {
        return (
            <ErrorScreen
                {...{
                    message: errorMessage,
                    navigateTo: '/login',
                    icon: <Info sx={{ fontSize: 36 }} />,
                }}
            />
        );
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.formRoot}>
                <div className={classes.header}>
                    <Stack spacing={1} display={'flex'} direction={'row'} alignItems={'center'}>
                        {provider === 'discord' ? (
                            <DiscordIcon style={{ fontSize: 32 }} />
                        ) :  (
                            <Google sx={{ fontSize: 32 }} />
                        )}
                        <Typography variant={'h4'}>Authorizing Application...</Typography>
                    </Stack>
                </div>
                <div className={classes.spinner}>
                    <Sentry size={60} />
                </div>
            </Paper>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiPaper-root': {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(3),
            minWidth: 400,
        },
    },
    header: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(1),
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: theme.palette.background.default,
    },
    spinner: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    formRoot: {
        [theme.breakpoints.down('sm')]: {
            width: '75%',
        },
    },
}));

export default ThirdPartyOauthCallbackScreen;

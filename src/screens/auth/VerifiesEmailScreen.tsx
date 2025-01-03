import { makeStyles } from 'tss-react/mui';
import { Button, Paper, Theme, Typography, useTheme } from '@mui/material';
import { Sentry } from 'react-activity';
import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyEmailQuery } from '@intractinc/base/redux/features/auth';
import { Email, Home } from '@mui/icons-material';
import { FC, useEffect } from 'react';
import { useGetUserQuery } from '@intractinc/base/redux/features/user';
import { useTools } from '@intractinc/base/contexts/ToolsContext';

const VerifiesEmailScreen: FC = () => {
    const theme = useTheme();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { updateTabTitle } = useTools();
    const { userId, emailHash } = useParams() as { userId: string; emailHash: string };
    const { isFetching, isSuccess } = useVerifyEmailQuery(
        { userId, emailHash },
        {
            skip: !userId || !emailHash,
        }
    );
    const { refetch } = useGetUserQuery(undefined, { skip: !isSuccess });

    useEffect(() => {
        isSuccess && refetch();
    }, [isSuccess]);

    useEffect(() => {
        updateTabTitle('Email Verification');
    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.formRoot}>
                {isFetching && (
                    <div className={classes.spinner}>
                        <Sentry size={60} />
                    </div>
                )}
                {!isFetching && (
                    <>
                        <div className={classes.header}>
                            <Typography variant={'h4'}>
                                <Email style={{ fontSize: 25 }} />{' '}
                                {isSuccess ? 'Verification completed!' : 'Invalid verification link.'}
                            </Typography>
                        </div>
                        <Button
                            fullWidth={true}
                            onClick={() => navigate('/')}
                            variant={'contained'}
                            color={'secondary'}
                            sx={{ marginTop: theme.spacing(3) }}
                        >
                            <Home style={{ marginRight: 5 }} /> Home
                        </Button>
                    </>
                )}
            </Paper>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
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
            width: 600,
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

export default VerifiesEmailScreen;

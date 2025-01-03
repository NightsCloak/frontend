import { FC, useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Sentry } from 'react-activity';
import { useContactMutation } from '@intractinc/base/redux/features/auth';
import { AlternateEmail, Comment, ContactSupport, Home, MarkEmailRead } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import { useTools } from '@intractinc/base/contexts/ToolsContext';

const ContactScreen: FC = () => {
    const navigate = useNavigate();
    const { updateTabTitle, updateBreadcrumbs } = useTools();
    const { classes } = useStyles();
    const [generalErrorMsg, setGeneralErrorMsg] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameErrorMsg, setNameErrorMsg] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [messageError, setMessageError] = useState<boolean>(false);
    const [messageErrorMsg, setMessageErrorMsg] = useState<string | null>(null);
    const [submit, { isLoading, isSuccess, error }] = useContactMutation();

    const checkFields = () => {
        checkField('name');
        checkField('email');
        checkField('message');
    };

    const clearErrors = () => {
        setGeneralErrorMsg(null);
        setNameError(false);
        setNameErrorMsg(null);
        setEmailError(false);
        setEmailErrorMsg(null);
        setMessageError(false);
        setMessageErrorMsg(null);
    };

    const handleSubmit = () => {
        if (name !== '' && email !== '' && message !== '') {
            clearErrors();
            submit({
                name,
                email,
                message,
            });
        } else {
            checkFields();
        }
    };

    const checkField = (field: string) => {
        switch (field) {
            case 'name':
                setNameError(name === '');
                break;
            case 'email':
                setEmailError(email === '');
                break;
            case 'message':
                setMessageError(message === '');
                break;
        }
    };

    useEffect(() => {
        if (error) {
            const response = 'data' in error ? error.data : JSON.stringify(error);
            const data = response as ContactResponse;
            if (data.message) {
                setGeneralErrorMsg(data.message);
            }
            if (data.errors?.name) {
                setNameError(true);
                setNameErrorMsg(data.errors?.name[0]);
            }
            if (data.errors?.email) {
                setEmailError(true);
                setEmailErrorMsg(data.errors?.email[0]);
            }
            if (data.errors?.message) {
                setMessageError(true);
                setMessageErrorMsg(data.errors?.message[0]);
            }
        }
    }, [error]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Contact Us' }]);
        updateTabTitle('Contact Us');
    }, []);

    if (isSuccess) {
        return (
            <div className={classes.root}>
                <Paper className={classes.formRoot}>
                    <div className={classes.header}>
                        <Typography variant={'h4'}>
                            <MarkEmailRead style={{ fontSize: 25 }} /> Message Sent!
                        </Typography>
                    </div>
                    <Typography sx={{ margin: (theme) => theme.spacing(3) }} variant={'body1'}>
                        Your message has been sent. Please allow one business day for us to respond.
                    </Typography>
                    <Button fullWidth={true} onClick={() => navigate('/')} variant={'contained'} color={'secondary'}>
                        <Home style={{ marginRight: 5 }} /> Home
                    </Button>
                </Paper>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.formRoot}>
                <div className={classes.header}>
                    <Typography variant={'h4'}>
                        <ContactSupport style={{ fontSize: 25 }} /> Contact Us
                    </Typography>
                </div>
                {isLoading ? (
                    <div className={classes.spinner}>
                        <Sentry size={40} />
                    </div>
                ) : (
                    <>
                        <Typography sx={{ margin: (theme) => theme.spacing(3) }} variant={'subtitle1'}>
                            Questions or concerns? Send us a message below.
                        </Typography>
                        <Box component={'form'} className={classes.contactForm}>
                            {generalErrorMsg && (
                                <Typography
                                    color={'error'}
                                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                                    variant={'subtitle1'}
                                >
                                    {generalErrorMsg}
                                </Typography>
                            )}
                            <TextField
                                error={nameError}
                                helperText={nameErrorMsg}
                                required
                                id={'name'}
                                type={'text'}
                                label={'Name'}
                                hiddenLabel
                                fullWidth
                                variant={'outlined'}
                                autoComplete={'given-name'}
                                color={'primary'}
                                size={'small'}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => checkField('name')}
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    endAdornment: <PersonOutlined style={{ marginLeft: 10 }} />,
                                }}
                            />
                            <TextField
                                error={emailError}
                                helperText={emailErrorMsg}
                                required
                                id={'email'}
                                type={'email'}
                                label={'Email'}
                                hiddenLabel
                                fullWidth
                                variant={'outlined'}
                                autoComplete={'email'}
                                color={'primary'}
                                size={'small'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => checkField('email')}
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    endAdornment: <AlternateEmail style={{ marginLeft: 10 }} />,
                                }}
                            />
                            <TextField
                                multiline
                                minRows={4}
                                maxRows={8}
                                error={messageError}
                                helperText={messageErrorMsg}
                                required
                                id={'message'}
                                type={'text'}
                                label={'Message'}
                                hiddenLabel
                                fullWidth
                                variant={'outlined'}
                                color={'primary'}
                                size={'small'}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onBlur={() => checkField('message')}
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    endAdornment: <Comment style={{ marginLeft: 10 }} />,
                                }}
                            />
                            <Button
                                fullWidth={true}
                                onClick={handleSubmit}
                                variant={'contained'}
                                type={'button'}
                                color={'secondary'}
                            >
                                Submit
                            </Button>
                        </Box>
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

    spinner: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        minHeight: 24,
        marginBottom: theme.spacing(1),
    },

    formRoot: {
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '75%',
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

    contactForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiFormControl-root': {
            borderRadius: 4,
        },
    },
}));

export default ContactScreen;

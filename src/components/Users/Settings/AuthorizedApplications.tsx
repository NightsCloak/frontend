import { FC, KeyboardEvent, useEffect, useState } from 'react';
import {
    Alert,
    AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useGetUserSocialAccountQuery, useRemoveUserSocialAccountMutation } from '@/redux/features/user';
import DiscordIcon from '@/components/Layout/Icons/DiscordIcon';
import { Check, Close, Google, LinkOff } from '@mui/icons-material';
import { Spinner } from 'react-activity';
import { useAppSelector } from '@/redux/hooks';

const AuthorizedApplications: FC = () => {
    const { classes } = useStyles();
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [currentPasswordError, setCurrentPasswordError] = useState<string | undefined>(undefined);
    const [removing, setRemoving] = useState<ThirdPartyProvider | undefined>(undefined);
    const { data } = useGetUserSocialAccountQuery(null, { refetchOnMountOrArgChange: true });
    const [remove, { error, isSuccess, isLoading, reset }] = useRemoveUserSocialAccountMutation();
    const user = useAppSelector((state) => state.user.data);

    const handleRemove = () => {
        removing && remove({ provider: removing, current_password: currentPassword });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        e.key === 'Enter' && handleRemove();
    };

    const resetState = () => {
        reset();
        setRemoving(undefined);
        setCurrentPassword('');
        setCurrentPasswordError(undefined);
    };

    const linkRedirect = (provider: ThirdPartyProvider) => {
        window.location.href = `/oauth/social/${provider}/redirect?action=link`;
    };

    useEffect(() => {
        if (error) {
            const response = error as BasicError;
            setCurrentPasswordError(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        isSuccess && resetState();
    }, [isSuccess]);

    return (
        <>
            <div className={classes.formRoot}>
                <TableContainer elevation={0} component={Paper}>
                    <Table size={'small'} aria-label={'Authorized apps'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Application</TableCell>
                                <TableCell>Account</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align={'right'}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!data ? (
                                [...Array(2)].map((_el, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={4}>
                                            <Skeleton
                                                style={{ flexGrow: 1 }}
                                                animation={'wave'}
                                                variant={'rectangular'}
                                                height={20}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <>
                                    <TableRow hover={true} data-tour-id={'settings_apps_other'}>
                                        <TableCell>
                                            <Stack direction={'row'} spacing={1}>
                                                <DiscordIcon />
                                                <Typography variant={'button'}>Discord</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={'caption'}>{data.discord_email ?? 'N/A'}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            {data.has_discord ? (
                                                <Check sx={{ color: 'success.main' }} />
                                            ) : (
                                                <Close sx={{ color: 'error.main' }} />
                                            )}
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            {data.has_discord ? (
                                                <Button
                                                    startIcon={<LinkOff />}
                                                    size={'small'}
                                                    variant={'contained'}
                                                    color={'error'}
                                                    onClick={() => setRemoving('discord')}
                                                >
                                                    Revoke
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => linkRedirect('discord')}
                                                    startIcon={<DiscordIcon />}
                                                    size={'small'}
                                                    variant={'contained'}
                                                    color={'secondary'}
                                                >
                                                    Link
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover={true}>
                                        <TableCell>
                                            <Stack direction={'row'} spacing={1}>
                                                <Google />
                                                <Typography variant={'button'}>Google</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={'caption'}>{data.google_email ?? 'N/A'}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            {data.has_google ? (
                                                <Check sx={{ color: 'success.main' }} />
                                            ) : (
                                                <Close sx={{ color: 'error.main' }} />
                                            )}
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            {data.has_google ? (
                                                <Button
                                                    startIcon={<LinkOff />}
                                                    size={'small'}
                                                    variant={'contained'}
                                                    color={'error'}
                                                    onClick={() => setRemoving('google')}
                                                >
                                                    Revoke
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => linkRedirect('google')}
                                                    startIcon={<Google />}
                                                    size={'small'}
                                                    variant={'contained'}
                                                    color={'secondary'}
                                                >
                                                    Link
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {removing && (
                <Dialog
                    PaperProps={{
                        elevation: 0,
                    }}
                    open={true}
                    fullWidth={true}
                    maxWidth={'sm'}
                    onClose={resetState}
                >
                    <DialogTitle>Confirm Revoking {removing.toUpperCase()}:</DialogTitle>
                    <DialogContent>
                        {!user.has_password && (
                            <Alert severity={'warning'}>
                                <AlertTitle>
                                    You must set a password on your account before you can revoke authorized
                                    applications.
                                </AlertTitle>
                            </Alert>
                        )}
                        <TextField
                            disabled={isLoading}
                            error={!!currentPasswordError}
                            helperText={currentPasswordError ?? ''}
                            autoFocus
                            margin={'dense'}
                            required
                            id={'current_password'}
                            type={'password'}
                            label={'Current Password'}
                            hiddenLabel
                            fullWidth
                            variant={'outlined'}
                            autoComplete={'current-password'}
                            color={'primary'}
                            size={'small'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant={'contained'} color={'inherit'} onClick={resetState}>
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            startIcon={isLoading ? <Spinner /> : <LinkOff />}
                            variant={'contained'}
                            color={'error'}
                            onClick={handleRemove}
                        >
                            Revoke
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

const useStyles = makeStyles()(() => ({
    formRoot: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default AuthorizedApplications;

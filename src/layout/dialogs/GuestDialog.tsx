import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { FC, KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { useGuestMutation } from '@/redux/features/auth';
import { Sentry } from 'react-activity';
import { persistor } from '@/redux/store';
import { CheckCircle } from '@mui/icons-material';

type GuestDialogProps = {
    onClose?: () => void;
    onSuccess?: () => void;
};

const GuestDialog: FC<GuestDialogProps> = ({ onClose, onSuccess }) => {
    const [open, setOpen] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const disabled = useMemo((): boolean => name.trim().length < 2, [name]);
    const [storeGuest, { isLoading, isSuccess, error }] = useGuestMutation();

    const handleClose = () => {
        setOpen(false);
        onClose && onClose();
    };

    const handleSubmit = () => {
        !disabled && storeGuest({ name });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        e.key === 'Enter' && handleSubmit();
    };

    useEffect(() => {
        if (error) {
            const response = error as BasicError;
            setNameError(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            persistor.persist();
            onSuccess && onSuccess();
            handleClose();
        }
    }, [isSuccess]);

    return (
        <Dialog
            PaperProps={{
                elevation: 0,
            }}
            open={open}
            fullWidth={true}
            maxWidth={'sm'}
            scroll={'paper'}
        >
            <DialogTitle>What should we call you?</DialogTitle>
            {isLoading || isSuccess ? (
                <Grid padding={1} container display={'flex'} justifyContent={'center'}>
                    <Sentry style={{ fontSize: 30 }} />
                </Grid>
            ) : (
                <>
                    <DialogContent dividers={true} sx={{ padding: 1 }}>
                        <TextField
                            error={!!nameError.length}
                            helperText={nameError.length ? nameError : ''}
                            autoFocus
                            margin={'dense'}
                            id={'guest-name'}
                            label={'Name'}
                            type={'text'}
                            fullWidth
                            variant={'outlined'}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant={'contained'} color={'inherit'} onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            disabled={disabled}
                            startIcon={<CheckCircle />}
                            variant={'contained'}
                            color={'secondary'}
                            onClick={handleSubmit}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default GuestDialog;

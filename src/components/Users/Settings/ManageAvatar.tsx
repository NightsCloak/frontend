import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Avatar, Button, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Sentry } from 'react-activity';
import { Delete, PhotoCamera } from '@mui/icons-material';
import { useDeleteUserAvatarMutation, useUpdateUserAvatarMutation } from '@/redux/features/user';
import { imagePaths } from '@/hooks/useImagePaths';

interface ManageAvatarProps {
    user: User;
    expandedMenu: Dispatch<SetStateAction<string | false>>;
}

const ManageAvatar: FC<ManageAvatarProps> = ({ user, expandedMenu }) => {
    const { classes } = useStyles();
    const [avatarError, setAvatarError] = useState<string>('');
    const [uploadAvatar, { isLoading: isAvatarUploading, isSuccess: isAvatarUploaded, error }] =
        useUpdateUserAvatarMutation();
    const [deleteAvatar, { isLoading: isAvatarDeleting, isSuccess: isAvatarDeleted }] = useDeleteUserAvatarMutation();
    const avatarInputChanged = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files === null) return;
        const avatar = new FormData();
        avatar.append('image', e.target.files[0]);
        uploadAvatar({ avatar });
    };

    useEffect(() => {
        if (isAvatarUploaded || isAvatarDeleted) {
            expandedMenu(false);
            setAvatarError('');
        }
    }, [isAvatarUploaded, isAvatarDeleted, expandedMenu]);

    useEffect(() => {
        if (error) {
            const response = 'data' in error ? error.data : JSON.stringify(error);
            const data = response as UpdateAvatarResponse;
            if (data.message) {
                setAvatarError(data.message);
            }
        }
    }, [error]);

    if (isAvatarUploading || isAvatarDeleting) {
        return (
            <div className={classes.spinnerRoot}>
                <Sentry style={{ fontSize: 30 }} />
            </div>
        );
    }

    return (
        <Grid container justifyContent={'center'} direction="column" alignItems={'center'} spacing={3}>
            <Grid>
                <Avatar
                    sx={{
                        height: 150,
                        width: 150,
                    }}
                    src={user.avatar_route ?? imagePaths.user}
                    alt={`${user.name}'s Avatar`}
                    variant="rounded"
                />
            </Grid>
            {!!avatarError.length && (
                <Grid>
                    <Typography variant={'subtitle1'} sx={{ color: '#E41E26' }}>
                        {avatarError}
                    </Typography>
                </Grid>
            )}
            <Grid>
                <label htmlFor="contained-button-file">
                    <input
                        style={{ display: 'none' }}
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={avatarInputChanged}
                    />
                    <Button color={'secondary'} startIcon={<PhotoCamera />} variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                {user.avatar && (
                    <Button
                        onClick={() => deleteAvatar()}
                        style={{ marginLeft: 15 }}
                        color={'error'}
                        startIcon={<Delete />}
                        variant="contained"
                    >
                        Delete
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles()((_theme: Theme) => ({
    spinnerRoot: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default ManageAvatar;

import { FC, ReactNode, useState } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import imagePaths from '@/hooks/imagePaths';

type ImageAvatarProps = {
    type?: AvatarType;
    avatar?: string | null;
    icon?: ReactNode;
    name?: string | null;
    size?: number;
    disableClickable?: boolean;
};

export type AvatarType = 'organization' | 'project' | 'asset' | 'collection' | 'user' | 'texture' | 'icon';

const ImageAvatar: FC<ImageAvatarProps> = ({ type, avatar, icon, name, size, disableClickable }) => {
    const [open, setOpen] = useState<boolean>(false);

    const _name = name ?? type ?? 'Page';

    const getAvatar = (): string | null => {
        if (avatar === undefined || type === undefined) {
            return null;
        }

        if (avatar) {
            return avatar;
        }

        let defaultAvatar = imagePaths.notFound;

        switch (type) {
            case 'organization':
                defaultAvatar = imagePaths.organization;
                break;
            case 'project':
                defaultAvatar = imagePaths.project;
                break;
            case 'asset':
                defaultAvatar = imagePaths.model;
                break;
            case 'collection':
                defaultAvatar = imagePaths.folder;
                break;
            case 'user':
                defaultAvatar = imagePaths.user;
                break;
        }

        return defaultAvatar;
    };

    const _avatar = !icon && getAvatar();

    if (icon) {
        return (
            <Avatar
                sx={{
                    height: size ?? 30,
                    width: size ?? 30,
                }}
                alt={`${_name}'s Avatar`}
            >
                {icon}
            </Avatar>
        );
    }

    if (!_avatar) {
        return null;
    }

    return (
        <>
            <Avatar
                onClick={disableClickable ? undefined : () => setOpen(true)}
                sx={{
                    height: size ?? 30,
                    width: size ?? 30,
                    ...(!disableClickable && {
                        cursor: 'pointer',
                        '&:hover': {
                            boxShadow: (theme) => `0 0 5px 2px ${theme.palette.primary.main}`,
                        },
                    }),
                }}
                src={_avatar}
                alt={`${_name}'s Avatar`}
            />
            <Dialog
                PaperProps={{
                    elevation: 0,
                }}
                open={open}
                fullWidth={true}
                maxWidth={'sm'}
                onClose={() => setOpen(false)}
            >
                {type !== 'texture' && <DialogTitle>{`${_name}'s Avatar`}</DialogTitle>}
                <DialogContent dividers={true}>
                    <img
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        alt={'avatar'}
                        src={_avatar}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} color={'inherit'} onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ImageAvatar;

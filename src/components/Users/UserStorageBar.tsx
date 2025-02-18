import { Cloud } from '@mui/icons-material';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    LinearProgress,
    LinearProgressProps,
    Stack,
    Typography,
} from '@mui/material';
import { FC, useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';

type UserStorageBarProps = {
    compact?: boolean;
    user?: User;
};

const UserStorageBar: FC<UserStorageBarProps> = ({ compact, user }) => {
    const authUser = useAppSelector((state) => state.user?.data);
    const _user = user ?? authUser;

    const percent = useMemo(() => {
        if (!_user || _user.tier_display.storage_limit === -1) {
            return 0;
        }

        const value = (_user.used_storage.bytes / _user.tier_display.storage_limit) * 100;

        return value > 100 ? 100 : value;
    }, [_user]);

    const color = useMemo((): LinearProgressProps['color'] => {
        if (!_user || _user.tier_display.storage_limit === -1) {
            return 'secondary';
        }

        if (percent < 50) {
            return 'info';
        }

        if (percent < 80) {
            return 'warning';
        }

        return 'error';
    }, [_user, percent]);

    if (!_user) {
        return null;
    }

    if (compact) {
        return (
            <Stack spacing={0.2} sx={{ width: 175, justifyContent: 'center' }}>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Cloud sx={{ mr: 0.5, fontSize: 18 }} />
                    <Typography noWrap={true} variant={'body2'}>
                        {_user.used_storage.human} / {_user.tier_display.storage_limit_human}
                    </Typography>
                </div>
                <LinearProgress
                    sx={{ height: 10, borderRadius: 1 }}
                    color={color}
                    variant={'determinate'}
                    value={percent}
                />
            </Stack>
        );
    }

    return (
        <>
            <Card elevation={1}>
                <CardHeader
                    sx={{ pt: 0.5, pb: 1 }}
                    title={
                        <>
                            <Cloud sx={{ mr: 0.5, fontSize: 20 }} /> {user ? `${user.name}'s storage` : 'My storage'}
                        </>
                    }
                    titleTypographyProps={{
                        display: 'flex',
                        alignItems: 'center',
                        variant: 'body1',
                        justifyContent: 'center',
                    }}
                />
                <CardContent sx={{ paddingY: 0, paddingX: 0.5 }}>
                    <LinearProgress
                        sx={{ height: 12, borderRadius: 1 }}
                        color={color}
                        variant={'determinate'}
                        value={percent}
                    />
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Typography noWrap={true} variant={'body2'}>
                        {_user.used_storage.human} / {_user.tier_display.storage_limit_human}
                    </Typography>
                </CardActions>
            </Card>
        </>
    );
};

export default UserStorageBar;

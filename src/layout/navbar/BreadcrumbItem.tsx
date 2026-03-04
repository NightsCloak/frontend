import { Avatar, Link, Skeleton, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ImageAvatar, { AvatarType } from '@/layout/navbar/ImageAvatar';
import useScreenSize from '@/hooks/useScreenSize';

export interface BreadcrumbItemProps {
    type?: AvatarType;
    avatar?: string | null;
    avatars?: string[] | null;
    name?: string | null;
    uri?: string;
    skeleton?: boolean;
    skip?: boolean;
    grayscale?: boolean;
    chip?: ReactNode | ReactNode[];
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ type, avatar, name, uri, skeleton, chip }) => {
    const { isSmallScreen } = useScreenSize();
    const { classes } = useStyles();
    const _name = name ?? type ?? 'Page';

    if (!avatar && !name && !uri && skeleton === undefined) {
        return null;
    }

    return (
        <Stack alignItems={'center'} direction={'row'} spacing={1}>
            {skeleton ? (
                <>
                    <Skeleton variant={'circular'}>
                        <Avatar sx={{ height: 30, width: 30 }} />
                    </Skeleton>
                    <Typography variant={'h6'}>
                        <Skeleton width={100} animation={'wave'} />
                    </Typography>
                </>
            ) : (
                <>
                    <ImageAvatar {...{ type, avatar, name }} />
                    {uri ? (
                        <Link component={RouterLink} to={uri} className={classes.breadCrumbClickable}>
                            <Typography variant={isSmallScreen ? 'caption' : 'h6'}>{_name}</Typography>
                        </Link>
                    ) : (
                        <Typography className={classes.breadCrumb} variant={isSmallScreen ? 'caption' : 'h6'}>
                            {_name}
                        </Typography>
                    )}
                    {!isSmallScreen && chip}
                </>
            )}
        </Stack>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    breadCrumb: {
        color: theme.palette.text.primary,
    },
    breadCrumbClickable: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));

export default BreadcrumbItem;

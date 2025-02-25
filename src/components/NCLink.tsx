import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, LinkOwnProps } from '@mui/material';
import { useLocation } from 'react-router';
import { makeStyles } from 'tss-react/mui';

type NCLinkProps = {
    to: string;
    children: ReactNode;
    iconColor?: boolean; // Allow overriding icon colors defaults to true
} & LinkOwnProps;

const NCLink: FC<NCLinkProps> = ({ to, children, iconColor = true, ...props }) => {
    const location = useLocation();
    const active = location.pathname === to;
    const { classes, theme } = useStyles({ active, iconColor });

    return (
        <Link
            className={classes.root}
            component={RouterLink}
            to={to}
            style={{ color: active ? (theme.palette.nc?.main ?? '#ffffff') : '#ffffff' }}
            {...props}
        >
            {children}
        </Link>
    );
};

const useStyles = makeStyles<{ active: boolean; iconColor: boolean }>()((theme, { active, iconColor }) => ({
    root: {
        '& .MuiListItemIcon-root': {
            color: active && iconColor ? theme.palette.nc?.main : '#ffffff',
        },
    },
}));

export default NCLink;

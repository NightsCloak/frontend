import { Avatar } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import { makeStyles } from 'tss-react/mui';
import DrawerHeader from '@/components/Drawer/DrawerHeader';
import Drawer from '@/components/Drawer';

type SidebarProps = {
    open: boolean;
};

const Sidebar: FC<SidebarProps> = ({ open }) => {
    const user = useAppSelector((state) => state.user);
    const { classes } = useStyles();
    return (
        <Drawer variant={'permanent'} open={open}>
            <DrawerHeader />
            <div className={classes.sidebarRoot}>
                <Avatar alt={user.name} src={user.data.avatar_route ?? ''} />
            </div>
        </Drawer>
    );
};

const useStyles = makeStyles()(() => ({
    sidebarRoot: {
        border: '1px solid red',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default Sidebar;

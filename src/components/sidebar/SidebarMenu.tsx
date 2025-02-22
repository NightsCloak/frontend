import { FC, use } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import sidebarContext from '@/contexts/SidebarContext';
import NCLink from '@/components/NCLink';

type SidebarMenuProps = {
    menuItems: {
        label: string;
        to: string;
        icon: ReactNode;
    }[];
};

const SidebarMenu: FC<SidebarMenuProps> = ({ menuItems }) => {
    const { open } = use(sidebarContext);
    const { classes } = useStyles({ open });

    return (
        <List>
            {menuItems.map((item, index) => (
                <NCLink to={item.to} key={`sidebar-menu-item-${item.label.toLowerCase()}-${index}`} underline={'none'}>
                    <ListItem disablePadding className={classes.listItem}>
                        <ListItemButton className={classes.listItemButton}>
                            <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                            <ListItemText className={classes.listItemText} primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                </NCLink>
            ))}
        </List>
    );
};

const useStyles = makeStyles<{ open: boolean }>()((theme, { open }) => ({
    root: {},
    link: {},
    listItem: {
        display: 'block',
    },
    listItemButton: {
        minHeight: 48,
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        justifyContent: open ? 'initial' : 'center',
    },
    listItemIcon: {
        minWidth: 0,
        justifyContent: 'center',
        marginRight: open ? theme.spacing(3) : 'auto',
    },
    listItemText: {
        opacity: open ? 1 : 0,
    },
}));

export default SidebarMenu;

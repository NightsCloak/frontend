import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import SidebarContext from '@/contexts/SidebarContext';
import { use } from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const Home = () => {
    const sections = ['Dashboard', 'Users', 'Organizations', 'Projects'];
    const { open } = use(SidebarContext);

    const icons = (section: string) => {
        switch (section) {
            case 'Dashboard':
                return <SpaceDashboardIcon />;
            case 'Users':
                return <PersonIcon />;
            case 'Organizations':
                return <BusinessIcon />;
            case 'Projects':
                return <WorkspacesIcon />;
        }
    };

    return (
        <List>
            {sections.map((section) => (
                <ListItem key={section} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={[
                            {
                                minHeight: 48,
                                px: 2.5,
                            },
                            open
                                ? {
                                      justifyContent: 'initial',
                                  }
                                : {
                                      justifyContent: 'center',
                                  },
                        ]}
                    >
                        <ListItemIcon
                            sx={[
                                {
                                    minWidth: 0,
                                    justifyContent: 'center',
                                },
                                open
                                    ? {
                                          mr: 3,
                                      }
                                    : {
                                          mr: 'auto',
                                      },
                            ]}
                        >
                            {icons(section)}
                        </ListItemIcon>
                        <ListItemText
                            primary={section}
                            sx={[
                                open
                                    ? {
                                          opacity: 1,
                                      }
                                    : {
                                          opacity: 0,
                                      },
                            ]}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default Home;

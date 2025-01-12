import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const defaultMenu = [
    { label: 'Dashboard', to: '/', icon: <SpaceDashboardIcon /> },
    { label: 'Users', to: '/users', icon: <PersonIcon /> },
    { label: 'Organizations', to: '/organizations', icon: <BusinessIcon /> },
    { label: 'Projects', to: '/projects', icon: <WorkspacesIcon /> },
];

export default defaultMenu;

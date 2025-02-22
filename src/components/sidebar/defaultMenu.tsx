import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const defaultMenu = [
    { label: 'Dashboard', to: '/', icon: <SpaceDashboardIcon /> },
    { label: 'Chronicles', to: '/chronicles', icon: <LocationCityIcon /> },
    { label: 'Characters', to: '/characters', icon: <PersonIcon /> },
    { label: 'Organizations', to: '/organizations', icon: <BusinessIcon /> },
    { label: 'Projects', to: '/projects', icon: <WorkspacesIcon /> },
];

export default defaultMenu;

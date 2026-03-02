import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const defaultMenu = [
    { label: 'Dashboard', to: '/', icon: <SpaceDashboardIcon /> },
    { label: 'Chronicles', to: '/chronicles', icon: <LocationCityIcon /> },
    { label: 'Characters', to: '/characters', icon: <PersonIcon /> },
];

export default defaultMenu;

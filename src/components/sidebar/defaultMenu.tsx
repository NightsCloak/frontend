import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const defaultMenu = [
    { label: 'Dashboard', to: '/home', icon: <SpaceDashboardIcon /> },
    { label: 'Chronicles', to: '/user/chronicles', icon: <LocationCityIcon /> },
    { label: 'Characters', to: '/user/characters', icon: <PersonIcon /> },
];

export default defaultMenu;

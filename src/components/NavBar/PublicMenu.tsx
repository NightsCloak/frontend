import NCLink from '@/components/NCLink';
import { MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';

function PublicMenu() {
    const location = useLocation();
    return (
        <div>
            <MenuItem selected={location.pathname === '/chronicles'}>
                <NCLink to="/chronicles" sx={{ textDecoration: 'none' }}>
                    Chronicles
                </NCLink>
            </MenuItem>
        </div>
    );
}

export default PublicMenu;

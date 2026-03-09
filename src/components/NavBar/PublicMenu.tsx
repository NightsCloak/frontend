import NCLink from '@/components/NCLink';
import { MenuItem } from '@mui/material';

function PublicMenu() {
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

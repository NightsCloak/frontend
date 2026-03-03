import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

const RobloxIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="m13.936 15.356l-12.11-3.244L0 18.93L18.928 24l2.68-9.99l-6.818-1.83l-.854 3.176ZM5.072 0L2.394 9.992l6.816 1.83l.854-3.178l12.11 3.246L24 5.072L5.072 0Z"
        />
    </SvgIcon>
);

export default RobloxIcon;

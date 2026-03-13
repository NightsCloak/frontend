import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleListView } from '@/redux/reducers/userSlice';
import { IconButton, SxProps, Theme, Tooltip, Typography } from '@mui/material';
import { List, ViewCompact } from '@mui/icons-material';
import useScreenSize from '@/hooks/useScreenSize';

type ViewToggleProps = {
    sx?: SxProps<Theme> | undefined;
    small?: boolean;
};

const ViewToggle: FC<ViewToggleProps> = ({ sx, small }) => {
    const dispatch = useAppDispatch();
    const { isSmallScreen } = useScreenSize();
    const listView = useAppSelector((state) => state.user.settings.listView);

    const handleToggle = () => {
        dispatch(toggleListView(!listView));
    };

    return (
        <Tooltip placement={'top'} arrow title={<Typography>{listView ? 'Expanded View' : 'List View'}</Typography>}>
            <IconButton
                size={isSmallScreen || small ? 'small' : undefined}
                sx={sx}
                onClick={handleToggle}
                color={'inherit'}
            >
                {listView ? <List /> : <ViewCompact />}
            </IconButton>
        </Tooltip>
    );
};

export default ViewToggle;

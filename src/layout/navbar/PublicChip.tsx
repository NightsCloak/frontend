import { FC } from 'react';
import { Chip } from '@mui/material';
import { Public } from '@mui/icons-material';

const PublicChip: FC = () => {
    return <Chip size={'small'} label={'Public'} color={'info'} variant={'outlined'} icon={<Public />} />;
};

export default PublicChip;

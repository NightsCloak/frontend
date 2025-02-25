import NCModal from '@/components/NCModal';
import { Box } from '@mui/material';
import { FC, useState } from 'react';
import AddChronicleForm from '@/components/Chronicles/forms/AddChronicleForm';

const NewChronicleModal: FC<NCModalProps> = ({ ...props }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <Box p={1} justifyContent={'center'} alignItems={'center'} display={'flex'}>
            <NCModal
                {...props}
                open={modalOpen}
                handler={handleOpen}
                title={'Add Chronicle'}
                iconLabel={'Add Chronicle'}
                sx={{
                    root: { height: '50vh', marginTop: 'calc(20%)' },
                    box: { display: 'flex', alignSelf: 'center', height: 250 },
                }}
            >
                <AddChronicleForm handler={handleOpen} />
            </NCModal>
        </Box>
    );
};

export default NewChronicleModal;

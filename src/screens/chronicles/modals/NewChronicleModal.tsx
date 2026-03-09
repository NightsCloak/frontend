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
                    root: { width: '100vh', padding: 0 },
                    modal: {
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        minWidth: 300,
                        padding: 1,
                        border: '1px solid red',
                    },
                }}
            >
                <AddChronicleForm handler={handleOpen} />
            </NCModal>
        </Box>
    );
};

export default NewChronicleModal;

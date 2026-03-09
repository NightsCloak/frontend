import { useGetUserChronicleQuery } from '@/redux/features/chronciles';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-activity';
import { Box, Paper, Typography } from '@mui/material';

import { makeStyles } from 'tss-react/mui';
import NCModal from '@/components/NCModal';
import { useState } from 'react';
import UpdateChronicleName from '@/components/Chronicles/forms/UpdateChronicleName';
import { Edit } from '@mui/icons-material';

const UserChronicle = () => {
    const params = useParams<{ chronicleId: string }>();
    const { data } = useGetUserChronicleQuery(params.chronicleId ?? '');
    const [showUpdateNameModal, setShowUpdateNameModal] = useState(false);
    const { classes } = useStyles();

    const handleUpdateNameModal = () => {
        setShowUpdateNameModal(!showUpdateNameModal);
    };

    if (!data) return <Spinner />;

    return (
        <Box className={classes.root} component={Paper}>
            <div style={{ display: 'flex' }}>
                <Typography variant={'h4'}>{data.name}</Typography>
                <NCModal sx={{ box: { height: 200 } }} icon={<Edit />}>
                    <UpdateChronicleName handler={handleUpdateNameModal} chronicleId={params.chronicleId ?? ''} />
                </NCModal>
            </div>
            <Typography>{data.email}</Typography>
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flexShrink: 1, flexDirection: 'column', padding: theme.spacing(2), minHeight: 400 },
    header: { marginBottom: theme.spacing(2) },
}));

export default UserChronicle;

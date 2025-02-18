import { FC, useState } from 'react';
import { Box, IconButton, Modal, Paper, Theme, Typography } from '@mui/material';
import AddBox from '@mui/icons-material/AddBox';
import CancelPresentation from '@mui/icons-material/CancelPresentation';
import { makeStyles } from 'tss-react/mui';

const NCModal: FC<NCModalProps> = ({ title, children, sx, override, open, handler, icon }) => {
    const { classes, cx } = useStyles();
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            {icon ?? (
                <IconButton
                    onClick={handler ?? handleOpen}
                    color={'success'}
                    aria-label={'Add'}
                    data-testid={'NCModal'}
                >
                    <AddBox />
                </IconButton>
            )}
            <Modal
                open={open ?? modalOpen}
                onClose={handler ?? handleOpen}
                onBackdropClick={handler ?? handleOpen}
                aria-labelledby={'Modal'}
                aria-describedby={'Modal'}
                className={cx(classes.root, override?.root)}
                style={sx?.root && { ...sx.root }}
            >
                <Box component={Paper} className={cx(override?.box, classes.modal)} style={sx?.box && { ...sx.box }}>
                    <Paper className={classes.modalHeader}>
                        <Typography
                            variant={'h5'}
                            className={cx(classes.modalTitle, override?.title)}
                            style={sx?.title && { ...sx.title }}
                        >
                            {title ?? 'Blank Modal'}
                        </Typography>
                        <CancelPresentation onClick={handler ?? handleOpen} />
                    </Paper>
                    <div
                        className={cx(classes.modalContent, override?.children)}
                        style={sx?.children && { ...sx.children }}
                    >
                        {children ?? 'Blank Modal'}
                    </div>
                </Box>
            </Modal>
        </>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        // alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    icon: { cursor: 'pointer' },

    modal: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiPaper-root': {
            backgroundColor: '#282828',
        },
        '&:focus': {
            outline: 'none',
        },
    },

    modalHeader: {
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        '& .MuiSvgIcon-root': {
            cursor: 'pointer',
        },
    },

    modalTitle: {
        fontSize: '1.3rem',
    },

    modalContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1),
        '& .MuiButton-root': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default NCModal;

import Typography from '@mui/material/Typography';
import { DataGridPremium, GridColDef, GridToolbar } from '@mui/x-data-grid-premium';
import { useDeleteChronicleMutation, useGetUserChroniclesQuery } from '@/redux/features/chronciles';
import { Box, IconButton, Paper } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import NewChronicleModal from '@/screens/chronicles/modals/NewChronicleModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { Spinner } from 'react-activity';
import { useState } from 'react';

const ChroniclesTable = () => {
    const { classes } = useStyles();
    const [deleting, setDeleting] = useState<string | null>(null);
    const { data: chronicles, isLoading, isUninitialized } = useGetUserChroniclesQuery();
    const [deleteChronicle, { isLoading: isDeleteChronicleLoading }] = useDeleteChronicleMutation();

    const handleDeleteChronicle = (id: string) => {
        setDeleting(id);
        deleteChronicle(id);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Chronicle', minWidth: 250 },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 250,
        },
        {
            field: 'id',
            align: 'center',
            headerName: 'Delete',
            renderCell: ({ row }) => {
                return isDeleteChronicleLoading && deleting === row.id ? (
                    <div
                        style={{
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Spinner />
                    </div>
                ) : (
                    <IconButton onClick={() => handleDeleteChronicle(row.id)}>
                        <DeleteIcon />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box
            component={Paper}
            elevation={6}
            p={2}
            style={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: 300 }}
        >
            <div className={classes.header}>
                <Typography>Chronicles:</Typography>
                <NewChronicleModal />
            </div>
            {isUninitialized ? (
                <Typography>Loading...</Typography>
            ) : (
                <DataGridPremium
                    slots={{
                        toolbar: GridToolbar,
                        noRowsOverlay: () => (
                            <Box
                                style={{
                                    // height: '100%',
                                    flex: 1,
                                    flexDirection: 'column',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography color={'primary'}>No Chronicles Found</Typography>
                            </Box>
                        ),
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            excelOptions: {
                                disableToolbarButton: true,
                            },
                            printOptions: { disableToolbarButton: true },
                            csvOptions: { disableToolbarButton: true },
                        },
                    }}
                    pagination
                    pageSizeOptions={[10, 25, 50, 100]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    density={'compact'}
                    loading={isUninitialized || isLoading}
                    columns={columns}
                    rows={chronicles ?? []}
                />
            )}
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {},
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export default ChroniclesTable;

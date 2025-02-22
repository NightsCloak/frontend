import Typography from '@mui/material/Typography';
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium';
import { useGetUserChroniclesQuery } from '@/redux/features/chronciles';
import { Box, Paper } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import NewChronicleModal from '@/screens/users/dashboard/modals/NewChronicleModal';

const Chronicles = () => {
    const { classes } = useStyles();

    const { data: chronicles, isLoading, isUninitialized } = useGetUserChroniclesQuery();

    if (chronicles)
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
                            noRowsOverlay: () => <div>No Chronicles</div>,
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
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        density={'compact'}
                        loading={isUninitialized || isLoading}
                        columns={[
                            { field: 'name', headerName: 'Chronicle' },
                            {
                                field: 'email',
                                headerName: 'Email',
                            },
                        ]}
                        rows={chronicles}
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

export default Chronicles;

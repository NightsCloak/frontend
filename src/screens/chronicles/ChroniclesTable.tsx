import Typography from '@mui/material/Typography';
import { DataGridPremium, GridColDef, GridToolbar } from '@mui/x-data-grid-premium';
import { Box, Paper } from '@mui/material';
import NCLink from '@/components/NCLink';
import useChronicles from '@/hooks/useChronicles';

const ChroniclesTable = () => {
    const { chroniclesList } = useChronicles();

    const columns: GridColDef<Chronicle>[] = [
        {
            field: 'name',
            headerName: 'Chronicle',
            minWidth: 250,
            renderCell: ({ row }) => <NCLink to={`/chronicles/${row.id}`}>{row.name}</NCLink>,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 250,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            renderCell: ({ row }) =>
                row?.genres?.map((genre, index, array) => (
                    <>
                        <Typography variant={'caption'}>
                            {genre.name}
                            {array.length - 1 > index && ','}
                        </Typography>
                        &nbsp;
                    </>
                )),
            minWidth: 250,
        },
    ];

    return (
        <Box
            component={Paper}
            elevation={6}
            p={2}
            style={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: 300 }}
        >
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
                getRowHeight={() => 'auto'}
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
                loading={chroniclesList.data.length === 0}
                columns={columns}
                rows={chroniclesList?.data ?? []}
            />
        </Box>
    );
};

export default ChroniclesTable;

import Typography from '@mui/material/Typography';
import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { useDeleteChronicleMutation, useGetUserChroniclesMutation } from '@/redux/features/chronciles';
import { Box, IconButton, Paper } from '@mui/material';
import NCLink from '@/components/NCLink';
import { Spinner } from 'react-activity';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import useMeta from '@/hooks/useMeta';
import CustomToolbar from '@/components/CustomToolbar';
import NewChronicleModal from '@/screens/chronicles/modals/NewChronicleModal';
import { makeStyles } from 'tss-react/mui';

const UserChroniclesTable = () => {
    const { classes } = useStyles();
    const [deleting, setDeleting] = useState<string | null>(null);
    const [getUserChronicles, userChroniclesState] = useGetUserChroniclesMutation();
    const [deleteChronicle, { isLoading: isDeleteChronicleLoading }] = useDeleteChronicleMutation();

    const {
        data: chroniclesList,
        rowLimit,
        rowCount,
        page,
        pageLimit,
        setPage,
        setRowLimit,
        setSortBy,
        setNameSearchDebounce,
    } = useMeta<ChronicleResponse>(getUserChronicles, userChroniclesState);

    const handleDeleteChronicle = (id: string) => {
        setDeleting(id);
        deleteChronicle(id);
    };

    const columns: GridColDef<Chronicle>[] = [
        {
            field: 'name',
            headerName: 'Chronicle',
            minWidth: 250,
            renderCell: ({ row }) => <NCLink to={`/user/chronicles/${row.id}`}>{row.name}</NCLink>,
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
                    <Typography key={`${row.id}_${genre.value}`} variant={'caption'}>
                        {genre.name}
                        {array.length - 1 > index && `, `}
                    </Typography>
                )),
            minWidth: 250,
        },
        {
            field: 'type',
            headerName: 'Type',
            valueFormatter: (value: Chronicle['type'], row) => value[0].toUpperCase() + value.slice(1),
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
                <NewChronicleModal />
            </div>
            <DataGridPremium
                pagination
                pageSizeOptions={[10, 25, 50, 100]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                showToolbar
                density={'compact'}
                loading={!chroniclesList}
                columns={columns}
                rows={chroniclesList?.data ?? []}
                //Sorting
                paginationMode={'server'}
                sortingMode={'server'}
                filterMode={'server'}
                rowCount={rowCount}
                paginationModel={{ pageSize: rowLimit, page: page.current - 1 }}
                paginationMeta={{ hasNextPage: page.current < pageLimit }}
                onPaginationModelChange={(paginationModel) => {
                    setPage(paginationModel.page + 1);
                    setRowLimit(paginationModel.pageSize);
                }}
                onSortModelChange={(sortModel) => {
                    console.log('sortModel', sortModel);
                    setSortBy(
                        sortModel.reduce((previousValue, currentValue, index, array) => {
                            const field = currentValue.field;
                            console.log(
                                'field',
                                currentValue,
                                `${index === 0 ? previousValue : `${previousValue},`}${currentValue.sort === 'desc' ? '-' : ''}${field}`
                            );
                            return `${index === 0 ? previousValue : `${previousValue},`}${currentValue.sort === 'desc' ? '-' : ''}${field}`;
                        }, '')
                    );
                }}
                onFilterModelChange={(filterModel) => {
                    console.log('filterModel', filterModel);
                    let filter = '';
                    const filters = filterModel.items;
                    let first = true;
                    for (const item in filters) {
                        if (filters[item].field === 'name') {
                            filter += `${!first ? ',' : ''}${filters[item]}`;
                            first = false;
                        }
                    }

                    if (filterModel.quickFilterValues && filterModel.quickFilterValues.length > 0) {
                        filter += `${!first ? ',' : ''}${filterModel.quickFilterValues.join(',')}`;
                    }

                    setNameSearchDebounce(filter);
                }}
                slots={{
                    toolbar: CustomToolbar,
                }}
            />
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

export default UserChroniclesTable;

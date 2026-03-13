import Typography from '@mui/material/Typography';
import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { Box, Paper } from '@mui/material';
import NCLink from '@/components/NCLink';
import useChronicles from '@/hooks/useChronicles';
import useMeta from '@/hooks/useMeta';
import CustomToolbar from '@/components/CustomToolbar';

const ChroniclesTable = () => {
    const { getChroniclesList, chroniclesListState } = useChronicles();
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
    } = useMeta<ChronicleResponse>(getChroniclesList, chroniclesListState);
    const columns: GridColDef<Chronicle>[] = [
        {
            field: 'name',
            headerName: 'Name',
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
    ];

    return (
        <Box
            component={Paper}
            elevation={6}
            p={2}
            style={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: 300 }}
        >
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
                    for (const item of filters) {
                        console.log('name');
                        if (item.field === 'name') {
                            filter += `${!first ? ',' : ''}${item.value}`;
                            first = false;
                        }
                    }

                    if (filterModel.quickFilterValues && filterModel.quickFilterValues.length > 0) {
                        filter += `${!first ? ',' : ''}${filterModel.quickFilterValues.join(',')}`;
                    }
                    console.log('filter', filter.toString());
                    setNameSearchDebounce(filter);
                }}
                slots={{
                    toolbar: CustomToolbar,
                }}
            />
        </Box>
    );
};

export default ChroniclesTable;

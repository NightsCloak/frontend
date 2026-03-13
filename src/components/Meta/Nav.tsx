import { Autocomplete, Box, Chip, IconButton, InputAdornment, Menu, MenuItem, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { makeStyles } from 'tss-react/mui';
import {
    ChangeEventHandler,
    CSSProperties,
    FC,
    MouseEvent,
    MouseEventHandler,
    ReactNode,
    SyntheticEvent,
    useEffect,
    useState,
} from 'react';
import { customBaseQuery } from '@/redux/apiSlice';
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import useScreenSize from '@/hooks/useScreenSize';
import { Close, North, South, SwapVert } from '@mui/icons-material';

type NavProps = {
    style?: CSSProperties;
    tags?: TypedUseQueryHookResult<Tag[], unknown, typeof customBaseQuery>;
    showPagination?: boolean;
    Pagination: () => ReactNode;
    pageLimit: number;
    initialSortBy?: Sorting['by'];
    setSortBy: (sort: Sorting['by']) => void;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    nameSearchDebounce: string;
    setNameSearchDebounce: Dispatch<SetStateAction<string>>;
    useSearch: boolean;
    setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
    selectedTags: Tag[];
    sortSize?: boolean;
    sortLastActive?: boolean;
    sortName?: boolean;
    sortFirst?: boolean;
    sortLast?: boolean;
    useTrashed?: boolean;
    showTrashed?: boolean;
    setShowTrashed: Dispatch<SetStateAction<boolean>>;
};

const Nav: FC<NavProps> = ({
    style,
    tags,
    Pagination,
    showPagination,
    pageLimit,
    initialSortBy,
    setSortBy,
    setName,
    name,
    setNameSearchDebounce,
    nameSearchDebounce,
    setSelectedTags,
    selectedTags,
    useSearch,
    sortFirst,
    sortLast,
    sortName,
    sortLastActive,
    sortSize,
    useTrashed,
    showTrashed,
    setShowTrashed,
}) => {
    const { classes } = useStyles();
    const elmId = () => Date.now();
    const { isSmallScreen } = useScreenSize();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = !!anchorEl;

    const [sort, setSort] = useState<{
        field: Sorting['by'] | null;
        direction: Sorting['direction'];
    }>({ field: null, direction: null });

    const handleSortChange = (update: Sorting['by'], sort: Sorting['direction']) => {
        console.log('sort', update, sort);
        if (sort === null) {
            setSort({ field: null, direction: null });
            return;
        }
        setSort({ field: update, direction: sort });
    };

    const getSortDirection = (field: Sorting['by']): Sorting['direction'] => {
        if (sort.field === field) {
            if (sort.direction === 'asc') {
                return 'desc';
            }
            return null;
        }
        return 'asc';
    };

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNameSearchDebounce(e.target.value);
    };

    const handleClearSearch = () => {
        if (name.length > 0) {
            setName('');
            setNameSearchDebounce('');
        }
    };

    const handleOpen: MouseEventHandler = (e) => {
        console.log('open', e);
        if (!open) {
            setAnchorEl(e.target as HTMLElement);
        }
    };

    const handleClose: MouseEventHandler = () => {
        setAnchorEl(null);
    };

    const filterOptions = createFilterOptions({
        stringify: (option: Tag) => option.name,
    });

    const handleTagsChanged = (_event: SyntheticEvent, newValue: Tag[]) => {
        setSelectedTags(newValue);
    };

    useEffect(() => {
        if (sort.field !== null) {
            setSortBy(`${sort.direction === 'asc' ? '' : '-'}${sort.field}`);
            return;
        }
        setSortBy(initialSortBy);
    }, [sort]);

    return (
        <div style={{ ...style }} className={classes.root}>
            {showPagination && pageLimit > 1 && <Pagination />}
            {tags?.data && (
                <Autocomplete
                    sx={{ width: 'auto', minWidth: isSmallScreen ? 75 : 150, m: 1 }}
                    multiple={true}
                    id={`filter-tags-${elmId}`}
                    options={tags.data}
                    getOptionLabel={(option) => option.id}
                    filterOptions={filterOptions}
                    onChange={handleTagsChanged}
                    value={selectedTags}
                    autoHighlight
                    size={'small'}
                    noOptionsText={'No available tags'}
                    loadingText={'Loading tags...'}
                    filterSelectedOptions={true}
                    renderTags={(value: readonly Tag[], getTagProps) =>
                        value.map((tag: Tag, index: number) => {
                            const { key, ...restProps } = getTagProps({ index });
                            return (
                                <Chip
                                    key={key}
                                    size={'small'}
                                    color={'success'}
                                    variant={'outlined'}
                                    label={tag.name}
                                    {...restProps}
                                />
                            );
                        })
                    }
                    renderOption={(props, option) => {
                        const { key, ...restProps } = props;
                        return (
                            <Box key={key} component={'li'} {...restProps}>
                                {option.name}
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={'Tags'}
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                },
                            }}
                        />
                    )}
                />
            )}
            {useSearch && (
                <TextField
                    InputProps={{
                        endAdornment: nameSearchDebounce.length ? (
                            <InputAdornment position={'end'}>
                                <IconButton
                                    size={'small'}
                                    aria-label={'Clear'}
                                    onClick={handleClearSearch}
                                    onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                                    edge={'end'}
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        ) : undefined,
                    }}
                    label={'Search'}
                    value={nameSearchDebounce.length > 0 ? nameSearchDebounce : name}
                    variant={'outlined'}
                    onChange={handleSearchChange}
                    margin={'none'}
                    size={'small'}
                    // InputLabelProps={{ shrink: true }}
                    sx={(theme) => ({ marginRight: theme.spacing(2), width: 220 })}
                />
            )}
            <IconButton
                aria-label={'sort menu'}
                onClick={handleOpen}
                sx={(theme) => ({ marginRight: isSmallScreen ? 0 : theme.spacing(1) })}
            >
                <SwapVert />
            </IconButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                {sortName && (
                    <MenuItem
                        key={'name'}
                        onClick={() => handleSortChange('name', getSortDirection('name'))}
                        selected={sort.field === 'name'}
                    >
                        Name: {sort.field !== 'name' ? <SwapVert /> : sort.direction === 'desc' ? <North /> : <South />}
                    </MenuItem>
                )}
                {sortFirst && (
                    <MenuItem
                        key={'first'}
                        onClick={() => handleSortChange('first', getSortDirection('first'))}
                        selected={sort.field === 'first'}
                    >
                        First:{' '}
                        {sort.field !== 'first' ? <SwapVert /> : sort.direction === 'desc' ? <North /> : <South />}
                    </MenuItem>
                )}
                {sortLast && (
                    <MenuItem
                        key={'last'}
                        onClick={() => handleSortChange('last', getSortDirection('last'))}
                        selected={sort.field === 'last'}
                    >
                        Last: {sort.field !== 'last' ? <SwapVert /> : sort.direction === 'desc' ? <North /> : <South />}
                    </MenuItem>
                )}
                {sortSize && (
                    <MenuItem
                        key={'size'}
                        onClick={() => handleSortChange('size', getSortDirection('size'))}
                        selected={sort.field === 'size'}
                    >
                        Size: {sort.field !== 'size' ? <SwapVert /> : sort.direction === 'desc' ? <North /> : <South />}
                    </MenuItem>
                )}
                {sortLastActive && (
                    <MenuItem
                        key={'active'}
                        onClick={() => handleSortChange('active', getSortDirection('active'))}
                        selected={sort.field === 'active'}
                    >
                        Last Active:
                        {sort.field !== 'active' ? <SwapVert /> : sort.direction === 'desc' ? <North /> : <South />}
                    </MenuItem>
                )}
                <MenuItem
                    key={'created'}
                    onClick={() => handleSortChange('created', getSortDirection('created'))}
                    selected={sort.field === 'created'}
                >
                    Created:{' '}
                    {sort.field !== 'created' ? <SwapVert /> : sort.direction === 'desc' ? <North /> : <South />}
                </MenuItem>
                <MenuItem
                    key={'updated'}
                    onClick={() => handleSortChange('updated', getSortDirection('updated'))}
                    selected={sort.field === 'updated'}
                    divider={useTrashed}
                >
                    Updated:{' '}
                    {sort.field !== 'updated' ? <SwapVert /> : sort.direction === 'desc' ? <North /> : <South />}
                </MenuItem>
                {useTrashed && (
                    <MenuItem key={'trashed'} selected={showTrashed} onClick={() => setShowTrashed(!showTrashed)}>
                        Show Trashed
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 32,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        // paddingRight: theme.spacing(3),
    },
}));

export default Nav;

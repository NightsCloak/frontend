/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ChangeEvent,
    ChangeEventHandler,
    CSSProperties,
    MouseEvent,
    MouseEventHandler,
    SyntheticEvent,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import queryFilterOptions from '@/components/queryFilterOptions';
import {
    Autocomplete,
    Box,
    Chip,
    createFilterOptions,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Pagination,
    TextField,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import SwapVert from '@mui/icons-material/SwapVert';
import South from '@mui/icons-material/South';
import North from '@mui/icons-material/North';
import { Close } from '@mui/icons-material';
import useScreenSize from '@/hooks/useScreenSize';
import { TypedMutationTrigger, TypedUseMutationResult, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@/redux/apiSlice';

// Ignore ESLint as Mutations can truly be <any>

interface Sorting {
    direction: 'asc' | 'desc';
    by: 'created' | 'name' | 'trashed' | 'updated' | 'size' | 'first' | 'last' | string;
}

const useMeta = (
    trigger: TypedMutationTrigger<any, any, typeof customBaseQuery>,
    state: TypedUseMutationResult<any, any, typeof customBaseQuery>,
    {
        triggerParams,
        showPagination = true,
        useSearch = true,
        useTrashed = true,
        sortSize = false,
        sortName = true,
        sortFirst = false,
        sortLast = false,
        tags,
        initialTags,
        include,
        queryStrings,
        skip = false,
        initialLimit = 25,
        initialSortBy = 'created',
        initialSortDirection = 'desc',
    }: {
        triggerParams?: any;
        showPagination?: boolean;
        useSearch?: boolean;
        useTrashed?: boolean;
        sortSize?: boolean;
        sortName?: boolean;
        sortFirst?: boolean;
        sortLast?: boolean;
        tags?: TypedUseQueryHookResult<Tag[], any, typeof customBaseQuery>;
        initialTags?: string[];
        include?: string;
        queryStrings?: {
            [_key: string]: string | number | boolean | undefined | (string | number)[];
        };
        skip?: boolean;
        initialLimit?: number;
        initialSortBy?: Sorting['by'];
        initialSortDirection?: Sorting['direction'];
    } = {},
) => {
    const { isSmallScreen } = useScreenSize();
    const { classes } = useStyles();
    const [isSkipping, setIsSkipping] = useState<boolean>(skip);
    const [page, updatePage] = useState<number>(1);
    const [pageLimit, updatePageLimit] = useState<number>(1);
    const [limit, updateLimit] = useState<number>(initialLimit ?? 25);
    const [sortBy, updateSortBy] = useState<Sorting['by']>(initialSortBy);
    const [sortDirection, updateSortDirection] = useState<Sorting['direction']>(initialSortDirection);
    const [showTrashed, updateShowTrashed] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [nameSearchDebounce, setNameSearchDebounce] = useState<string>('');
    const [currentParams, setCurrentParams] = useState(triggerParams);
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [currentData, setCurrentData] = useState<any>();
    const elmId = useMemo(() => Date.now(), []);

    const open = useMemo(() => {
        return !!anchorEl;
    }, [anchorEl]);

    const { data } = useMemo(() => {
        return state;
    }, [state]);

    const queryOptions = useMemo(() => {
        return queryFilterOptions({
            limit,
            page,
            ...(include && { include }),
            ...(useSearch && { name }),
            sort: `${sortDirection === 'desc' ? '-' : ''}${sortBy}`,
            showTrashed,
            tags: filterTags.join(','),
            ...queryStrings,
        });
    }, [page, limit, name, sortBy, sortDirection, showTrashed, include, useSearch, skip, queryStrings, filterTags]);

    const nextPage = () => {
        if (page < currentData?.meta?.last_page) updatePage((prevState) => prevState + 1);
    };
    const prevPage = () => {
        //Check if on first page
        if (page > 1) updatePage((prevState) => prevState - 1);
    };

    const handlePage = (_e: ChangeEvent<unknown>, page: number) => {
        updatePage(page);
    };

    const setPage = (page: number) => {
        updatePage(page);
    };

    const setLimit = (limit: number) => {
        updateLimit(limit);
    };

    const setSortBy = (sortBy: Sorting['by']) => {
        updateSortBy(sortBy);
    };

    const handleSortChange = (update: Sorting['by']) => {
        updateSortBy(update);
        if (sortBy === update) {
            updateSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            updateSortDirection('desc');
            updateSortBy(update);
        }
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

    const pagination = useMemo(() => {
        return (
            <div className={classes.numbers}>
                <Pagination
                    style={{ display: 'flex', justifyContent: 'center' }}
                    count={pageLimit}
                    page={page}
                    onChange={handlePage}
                />
            </div>
        );
    }, [page, pageLimit]);

    const handleOpen: MouseEventHandler = (e) => {
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

    const handleTagChipClicked = (tag: string): void => {
        setSelectedTags((selectedTags) => {
            const selected = selectedTags.find((item) => item.name === tag);
            let match: Tag | undefined;

            if (selected) {
                return selectedTags.filter((item) => item.id !== selected.id);
            }

            if (tags?.data) {
                match = tags.data.find((item) => item.name === tag);
            }

            return match ? [...selectedTags, match] : selectedTags;
        });
    };

    /**
     *  Checks if triggerParams have updated, prevents infinite loop
     */
    useEffect(() => {
        if (triggerParams && JSON.stringify(currentParams) !== JSON.stringify(triggerParams)) {
            setCurrentParams(triggerParams ?? {});
        }

        if (skip !== isSkipping) {
            setIsSkipping(skip);
        }
    }, [triggerParams, skip]);

    /**
     * actual trigger effect
     */
    useEffect(() => {
        //something changed let's update
        !isSkipping && trigger({ options: queryOptions, ...currentParams });
    }, [queryOptions, currentParams, isSkipping]);

    useEffect(() => {
        if (data !== currentData) {
            setCurrentData(data);
        }
    }, [data]);

    /**
     * search Debounce Effect
     */
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPage(1);
            setName(nameSearchDebounce);
        }, 200);
        return () => clearTimeout(timeout);
    }, [nameSearchDebounce]);

    /**
     * Updates page number limit
     */
    useLayoutEffect(() => {
        if (currentData && currentData.meta && pageLimit !== currentData?.meta?.last_page) {
            updatePageLimit(currentData.meta.last_page);
        }
    }, [currentData]);

    useEffect(() => {
        if (tags?.data && initialTags) {
            setFilterTags(initialTags);
            setSelectedTags(tags.data.filter((tag) => initialTags.includes(tag.name)));
        }
    }, [tags, initialTags]);

    useEffect(() => {
        const timeout = setTimeout(() => setFilterTags(selectedTags.map((item) => item.name)), 250);
        return () => clearTimeout(timeout);
    }, [selectedTags]);

    const nav = (style?: CSSProperties) => {
        return (
            <div style={{ ...style }} className={classes.root}>
                {showPagination && pageLimit > 1 && pagination}
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
                            endAdornment: (
                                <>
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
                                </>
                            ),
                        }}
                        label={'Search'}
                        value={nameSearchDebounce}
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
                        <MenuItem key={'name'} onClick={() => handleSortChange('name')} selected={sortBy === 'name'}>
                            Name: {sortBy !== 'name' ? <SwapVert /> : sortDirection === 'desc' ? <North /> : <South />}
                        </MenuItem>
                    )}
                    {sortFirst && (
                        <MenuItem key={'first'} onClick={() => handleSortChange('first')} selected={sortBy === 'first'}>
                            First:{' '}
                            {sortBy !== 'first' ? <SwapVert /> : sortDirection === 'desc' ? <North /> : <South />}
                        </MenuItem>
                    )}
                    {sortLast && (
                        <MenuItem key={'last'} onClick={() => handleSortChange('last')} selected={sortBy === 'last'}>
                            Last: {sortBy !== 'last' ? <SwapVert /> : sortDirection === 'desc' ? <North /> : <South />}
                        </MenuItem>
                    )}
                    {sortSize && (
                        <MenuItem key={'size'} onClick={() => handleSortChange('size')} selected={sortBy === 'size'}>
                            Size: {sortBy !== 'size' ? <SwapVert /> : sortDirection === 'desc' ? <North /> : <South />}
                        </MenuItem>
                    )}
                    <MenuItem
                        key={'created'}
                        onClick={() => handleSortChange('created')}
                        selected={sortBy === 'created'}
                    >
                        Created:{' '}
                        {sortBy !== 'created' ? <SwapVert /> : sortDirection === 'desc' ? <North /> : <South />}
                    </MenuItem>
                    <MenuItem
                        key={'updated'}
                        onClick={() => handleSortChange('updated')}
                        selected={sortBy === 'updated'}
                        divider={useTrashed}
                    >
                        Updated:{' '}
                        {sortBy !== 'updated' ? <SwapVert /> : sortDirection === 'desc' ? <North /> : <South />}
                    </MenuItem>
                    {useTrashed && (
                        <MenuItem
                            key={'trashed'}
                            selected={showTrashed}
                            onClick={() => updateShowTrashed(!showTrashed)}
                        >
                            Show Trashed
                        </MenuItem>
                    )}
                </Menu>
            </div>
        );
    };

    return {
        nav,
        page: {
            next: nextPage,
            prev: prevPage,
            set: setPage,
            current: page,
        },
        pageLimit,
        pagination,
        setLimit,
        setSortBy,
        handleTagChipClicked,
        queryOptions,
        showTrashed,
        data: currentData,
    };
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
    numbers: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        '& > *': {},
    },
    number: {
        width: 'auto',
        marginRight: theme.spacing(2),
    },
}));

export default useMeta;
/* eslint-enable @typescript-eslint/no-explicit-any */

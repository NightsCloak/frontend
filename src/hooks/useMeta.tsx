import { createElement, CSSProperties, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import queryFilterOptions from '@/components/queryFilterOptions';
import { TypedMutationTrigger, TypedUseMutationResult } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@/redux/apiSlice';
import Nav from '@/components/Meta/Nav';
import { default as NavPagination } from '@/components/Meta/Pagination';
import isPaginated from '@/utils/isPaginated';

const useMeta = <T,>(
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    trigger: TypedMutationTrigger<ResultType<T>, any, typeof customBaseQuery>,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    state: TypedUseMutationResult<ResultType<T>, any, typeof customBaseQuery>,
    {
        triggerParams,
        showPagination = true,
        useSearch = true,
        useTrashed = true,
        sortSize = false,
        sortLastActive = false,
        sortName = true,
        sortFirst = false,
        sortLast = false,
        tags,
        initialTags,
        include,
        queryStrings,
        skip = false,
        initialLimit,
        initialSortBy = '-created',
    }: OptionsType = { triggerParams: { options: '' } }
) => {
    const [isSkipping, setIsSkipping] = useState<boolean>(skip);
    const [page, updatePage] = useState<number>(1);
    const [pageLimit, updatePageLimit] = useState<number>(1);
    const [rowLimit, updateRowLimit] = useState<number>(initialLimit ?? 25);
    const [rowCount, updateRowCount] = useState<number>(0);
    const [sortBy, updateSortBy] = useState<Sorting['by']>(initialSortBy);
    const [showTrashed, setShowTrashed] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [nameSearchDebounce, setNameSearchDebounce] = useState<string>('');
    const [currentParams, setCurrentParams] = useState(triggerParams);
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [currentData, setCurrentData] = useState<ResultType<T>>();

    const { data } = state;
    const queryOptions = useMemo(() => {
        return queryFilterOptions({
            limit: rowLimit,
            page,
            ...(include && { include }),
            ...(useSearch && { name }),
            sort: sortBy,
            showTrashed,
            tags: filterTags.join(','),
            ...queryStrings,
        });
    }, [page, rowLimit, name, sortBy, showTrashed, include, useSearch, skip, queryStrings, filterTags]);

    const nextPage = () => {
        if (isPaginated(currentData) && page < currentData?.meta?.last_page) updatePage((prevState) => prevState + 1);
    };
    const prevPage = () => {
        //Check if on first page
        if (isPaginated(currentData) && page > 1) updatePage((prevState) => prevState - 1);
    };

    const setPage = (page: number) => {
        isPaginated(currentData) && updatePage(page);
    };

    const setRowLimit = (limit: number) => {
        isPaginated(currentData) && updateRowLimit(limit);
    };

    const setSortBy = (sortBy: Sorting['by']) => {
        updateSortBy(sortBy);
    };

    const handleSetShowTrashed = (showTrashed: boolean) => {
        updatePage(1);
        setShowTrashed(showTrashed);
    };

    const Pagination = () => createElement(NavPagination, { page, pageLimit, updatePage });

    const nav = ({ style }: { style?: CSSProperties }) =>
        createElement(Nav, {
            style,
            nameSearchDebounce,
            setNameSearchDebounce,
            setName,
            useSearch,
            initialSortBy,
            setSortBy,
            pageLimit,
            showPagination,
            Pagination,
            name,
            setSelectedTags,
            selectedTags,
            sortSize,
            sortLastActive,
            sortName,
            sortFirst,
            sortLast,
            useTrashed,
            showTrashed,
            setShowTrashed,
        });

    const handleTagChipClicked = (tag: string): void => {
        setSelectedTags((selectedTags) => {
            const selected = selectedTags.find((item) => item.name === tag);
            let match: Tag | undefined;

            if (selected) {
                return selectedTags.filter((item) => item.id !== selected.id);
            }

            if (tags?.data) {
                match = tags.data.find((item: { name: string }) => item.name === tag);
            }

            return match ? [...selectedTags, match] : selectedTags;
        });
    };

    /**
     *  Checks if triggerParams have updated, prevents infinite loop
     */
    useEffect(() => {
        if (triggerParams && JSON.stringify(currentParams) !== JSON.stringify(triggerParams)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
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
        !isSkipping && trigger({ ...currentParams, options: queryOptions });
    }, [queryOptions, currentParams, isSkipping]);

    useEffect(() => {
        if (data !== currentData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentData(data);
        }
    }, [data]);

    /**
     * search Debounce Effect
     */
    useEffect(() => {
        if (nameSearchDebounce.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName('');
            return;
        }

        const timeout = setTimeout(() => {
            setPage(1);
            setName(nameSearchDebounce);
        }, 300);
        return () => clearTimeout(timeout);
    }, [nameSearchDebounce]);

    /**
     * Updates page number limit
     */
    useLayoutEffect(() => {
        if (isPaginated(currentData)) {
            if (currentData && currentData.meta) {
                if (pageLimit !== currentData?.meta?.last_page) {
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    updatePageLimit(currentData.meta.last_page);
                }
                if (rowCount !== currentData?.meta?.total) {
                    updateRowCount(currentData?.meta?.total);
                }
            }
        }
    }, [currentData]);

    useEffect(() => {
        //todo init
        if (tags?.data && initialTags) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFilterTags(initialTags);
            setSelectedTags(tags.data.filter((tag: { name: string }) => initialTags.includes(tag.name)));
        }
    }, [tags, initialTags]);

    useEffect(() => {
        const timeout = setTimeout(() => setFilterTags(selectedTags.map((item) => item.name)), 250);
        return () => clearTimeout(timeout);
    }, [selectedTags]);

    return {
        Nav: nav,
        page: {
            next: nextPage,
            prev: prevPage,
            set: setPage,
            current: page,
        },
        rowCount,
        setPage,
        rowLimit,
        pageLimit,
        Pagination,
        setRowLimit,
        setSortBy,
        handleTagChipClicked,
        setNameSearchDebounce,
        queryOptions,
        showTrashed,
        setShowTrashed: handleSetShowTrashed,
        data: currentData,
    };
};

export default useMeta;

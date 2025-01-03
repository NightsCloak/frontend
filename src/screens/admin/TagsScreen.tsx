import {
    Chip,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import useMeta from '@intractinc/base/hooks/useMeta';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import ReactTimeAgo from 'react-timeago';
import { Label } from '@mui/icons-material';
import { useGetTagsMutation } from '@intractinc/base/redux/features/tag';
import RenameTag from '@intractinc/base/components/Tags/RenameTag';
import DeleteTag from '@intractinc/base/components/Tags/DeleteTag';
import AddTag from '@intractinc/base/components/Tags/AddTag';

const TagsScreen: FC = () => {
    const { classes } = useStyles();
    const [tags, setTags] = useState<Tag[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle, updateTools } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const [getTags, getTagsState] = useGetTagsMutation();
    const [filterType, setFilterType] = useState<TagType>('unknown');

    const { nav, queryOptions } = useMeta(getTags, getTagsState, {
        useTrashed: false,
        queryStrings: filterType !== 'unknown' ? { 'filter[type]': filterType } : undefined,
    });

    const refetchTags = () => getTags({ options: queryOptions });

    const radioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterType(event.target.value as TagType);
    };

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Tags' }]);
        updateTabTitle('Tags');
        updateTools([<AddTag key={'add_tag'} {...{ onSuccess: refetchTags }} />]);
    }, []);

    useEffect(() => {
        getTagsState.data && setTags(getTagsState.data);
    }, [getTagsState]);

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <Stack direction={'row'} className={classes.innerNav}>
                    <RadioGroup
                        row={true}
                        aria-labelledby={'filter-tag-type-group'}
                        name={'filter-tag-type-group'}
                        value={filterType}
                        onChange={radioChange}
                    >
                        <FormControlLabel value={'unknown'} control={<Radio color={'success'} />} label={'All'} />
                        <FormControlLabel value={'texture'} control={<Radio color={'success'} />} label={'Texture'} />
                        <FormControlLabel value={'asset'} control={<Radio color={'success'} />} label={'Asset'} />
                    </RadioGroup>
                </Stack>
                {nav()}
            </div>
            <Grid className={classes.container} container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table size={'small'} aria-label={'users'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!tags ? (
                                    [...Array(25)].map((el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={4}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={25}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : tags.length > 0 ? (
                                    tags.map((tag) => (
                                        <TableRow hover={true} key={tag.id}>
                                            <TableCell>
                                                <Typography variant={'body1'}>{tag.name}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    size={'small'}
                                                    label={tag.type}
                                                    color={tag.type === 'texture' ? 'info' : 'warning'}
                                                    variant={'outlined'}
                                                    icon={<Label />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${tag.id}_created`}
                                                        date={new Date(tag.created_at)}
                                                        title={toLocaleDateString(tag.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Stack justifyContent={'end'} direction={'row'} spacing={1}>
                                                    <RenameTag {...{ tag, onSuccess: refetchTags }} />
                                                    <DeleteTag {...{ tag, onSuccess: refetchTags }} />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>No tags.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        height: 'auto',
        paddingRight: theme.spacing(2),
    },
    nav: {
        display: 'flex',
        marginLeft: theme.spacing(2.125),
    },
    innerNav: {
        width: '100%',
    },
}));

export default TagsScreen;

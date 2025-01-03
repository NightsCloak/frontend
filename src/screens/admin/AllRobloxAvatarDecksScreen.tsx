import { FC, useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { makeStyles } from 'tss-react/mui';
import useMeta from '@intractinc/base/hooks/useMeta';
import {
    Avatar,
    AvatarGroup,
    Chip,
    Grid,
    IconButton,
    Link,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import ImageAvatar from '@intractinc/base/layout/navbar/ImageAvatar';
import ReactTimeAgo from 'react-timeago';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import imagePaths from '@intractinc/base/hooks/imagePaths';
import { Spinner } from 'react-activity';
import CloseIcon from '@mui/icons-material/Close';
import { OpenInNew } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useGetRobloxAvatarDecksAdminMutation } from '@intractinc/base/redux/features/adminRobloxAvatarDeck';
import RobloxAvatarDeckMenu from '@intractinc/base/components/Admin/Projects/RobloxAvatarDeckMenu';

const AllRobloxAvatarDecks: FC = () => {
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const { classes } = useStyles();
    const [getAvatarDecks, getAvatarDecksState] = useGetRobloxAvatarDecksAdminMutation();
    const [decks, setDecks] = useState<RobloxAvatarDeck[] | null>(null);
    const navigate = useNavigate();

    const { nav, queryOptions } = useMeta(getAvatarDecks, getAvatarDecksState, {
        useTrashed: false,
        include: 'assets.version,sources.version,user,project',
    });

    const deckScreen = (deck: RobloxAvatarDeck) => `/admin/roblox-avatar-decks/${deck.id}`;

    const refetchDecks = () => getAvatarDecks({ options: queryOptions });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Roblox Avatar Decks' }]);

        updateTabTitle(`Roblox Avatar Decks`);
    }, []);

    useEffect(() => {
        getAvatarDecksState.data?.data && setDecks(getAvatarDecksState.data.data);
    }, [getAvatarDecksState]);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                <TableContainer component={Paper}>
                    <Table size={'small'} aria-label={'decks'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Project</TableCell>
                                <TableCell>Avatars</TableCell>
                                <TableCell>Models</TableCell>
                                <TableCell>Creator</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell align={'right'}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {decks ? (
                                decks.length ? (
                                    decks.map((deck) => (
                                        <TableRow hover={true} key={deck.id}>
                                            <TableCell>
                                                <Link
                                                    component={RouterLink}
                                                    to={deckScreen(deck)}
                                                    className={classes.link}
                                                >
                                                    <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                        <Typography noWrap={true} variant={'body1'}>
                                                            {deck.name}
                                                        </Typography>
                                                        {deck.status === 'processing' && (
                                                            <Chip
                                                                size={'small'}
                                                                label={'Processing'}
                                                                color={'info'}
                                                                variant={'outlined'}
                                                                icon={<Spinner style={{ fontSize: 9 }} />}
                                                            />
                                                        )}
                                                        {deck.status === 'failed' && (
                                                            <Chip
                                                                size={'small'}
                                                                label={'Failed'}
                                                                color={'error'}
                                                                variant={'outlined'}
                                                                icon={<CloseIcon />}
                                                            />
                                                        )}
                                                    </Stack>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {deck.project && (
                                                    <Link
                                                        component={RouterLink}
                                                        to={`/admin/projects/${deck.project.id}`}
                                                        sx={(theme) => ({
                                                            color: theme.palette.text.primary,
                                                            textDecoration: 'none',
                                                        })}
                                                    >
                                                        <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                            <ImageAvatar
                                                                {...{
                                                                    type: 'project',
                                                                    avatar: deck.project.avatar_route,
                                                                    name: deck.project.name,
                                                                    size: 35,
                                                                    disableClickable: true,
                                                                }}
                                                            />
                                                            <Typography noWrap={true} variant={'body1'}>
                                                                {deck.project.name}
                                                            </Typography>
                                                        </Stack>
                                                    </Link>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip
                                                    placement={'top'}
                                                    title={
                                                        <Typography>
                                                            {deck.sources?.map((source) => source.name).join(', ') ??
                                                                ''}
                                                        </Typography>
                                                    }
                                                    arrow
                                                >
                                                    <AvatarGroup sx={{ justifyContent: 'left' }} max={8}>
                                                        {deck.sources?.map((source) => (
                                                            <Avatar
                                                                key={source.id}
                                                                alt={'avatar'}
                                                                src={
                                                                    source.version?.thumbnail_route ??
                                                                    source.thumbnail_route ??
                                                                    imagePaths.model
                                                                }
                                                            />
                                                        ))}
                                                    </AvatarGroup>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip
                                                    placement={'top'}
                                                    title={
                                                        <Typography>
                                                            {deck.assets?.map((asset) => asset.name).join(', ') ?? ''}
                                                        </Typography>
                                                    }
                                                    arrow
                                                >
                                                    <AvatarGroup sx={{ justifyContent: 'left' }} max={8}>
                                                        {deck.assets?.map((asset) => (
                                                            <Avatar
                                                                key={asset.id}
                                                                alt={'avatar'}
                                                                src={
                                                                    asset.version?.thumbnail_route ??
                                                                    asset.thumbnail_route ??
                                                                    imagePaths.model
                                                                }
                                                            />
                                                        ))}
                                                    </AvatarGroup>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                {deck.user && (
                                                    <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                        <ImageAvatar
                                                            {...{
                                                                type: 'user',
                                                                avatar: deck.user.avatar_route,
                                                                name: deck.user.name,
                                                                size: 35,
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{ cursor: 'pointer' }}
                                                            noWrap={true}
                                                            variant={'body1'}
                                                        >
                                                            {deck.user.name}
                                                        </Typography>
                                                    </Stack>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${deck.id}_created`}
                                                        date={new Date(deck.created_at)}
                                                        title={toLocaleDateString(deck.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Stack
                                                    alignItems={'center'}
                                                    justifyContent={'end'}
                                                    direction={'row'}
                                                    spacing={2}
                                                >
                                                    {deck.status === 'ready' && (
                                                        <Tooltip
                                                            placement={'top-end'}
                                                            title={<Typography>View</Typography>}
                                                            arrow
                                                        >
                                                            <IconButton
                                                                size={'small'}
                                                                onClick={() => navigate(deckScreen(deck))}
                                                                color={'inherit'}
                                                                aria-label={'Download'}
                                                            >
                                                                <OpenInNew />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                    <RobloxAvatarDeckMenu {...{ deck, refetch: refetchDecks }} />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <Typography>No avatar decks found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <>
                                    {[...Array(10)].map((_el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={7}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={35}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
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
        paddingRight: theme.spacing(2),
    },
    container: {
        display: 'flex',
        justifyContent: 'start',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        height: 'auto',
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        height: '100%',
    },
}));

export default AllRobloxAvatarDecks;

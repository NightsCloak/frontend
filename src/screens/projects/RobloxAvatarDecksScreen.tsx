import { FC, useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
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
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import ProjectNavigation from '@intractinc/base/components/Projects/ProjectNavigation';
import ImageAvatar from '@intractinc/base/layout/navbar/ImageAvatar';
import ReactTimeAgo from 'react-timeago';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import { useGetRobloxAvatarDecksMutation } from '@intractinc/base/redux/features/robloxAvatarDeck';
import StoreRobloxAvatarDeck from '@intractinc/base/components/RobloxAvatarDecks/StoreRobloxAvatarDeck';
import imagePaths from '@intractinc/base/hooks/imagePaths';
import { Spinner } from 'react-activity';
import CloseIcon from '@mui/icons-material/Close';
import RobloxAvatarDeckMenu from '@intractinc/base/components/RobloxAvatarDecks/RobloxAvatarDeckMenu';
import { OpenInNew, Science } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const RobloxAvatarDecks: FC = () => {
    const {
        organization,
        organizationErrorMsg,
        project,
        projectSocket,
        workspaceProjectId,
        projectErrorMsg,
        refetchProject,
        refetchProjects,
    } = useWorkspace();
    const currentMember = project?.member;
    const { updateBreadcrumbs, updateTabTitle, updateTools } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const { classes } = useStyles();
    const [getAvatarDecks, getAvatarDecksState] = useGetRobloxAvatarDecksMutation();
    const [decks, setDecks] = useState<RobloxAvatarDeck[] | null>(null);
    const navigate = useNavigate();

    const { nav, queryOptions } = useMeta(getAvatarDecks, getAvatarDecksState, {
        skip: !project || project.id !== workspaceProjectId,
        triggerParams: project && { projectId: project.id },
        useTrashed: false,
        include: 'assets.version,sources.version,user',
    });

    const refetchDecks = () => getAvatarDecks({ projectId: project?.id ?? 'unknown', options: queryOptions });

    const deckScreen = (deck: RobloxAvatarDeck) =>
        `/organizations/${organization?.id}/projects/${project?.id}/roblox-avatars/${deck.id}`;

    useEffect(() => {
        updateBreadcrumbs([
            {
                skeleton: !organization,
                type: 'organization',
                name: organization?.name,
                avatar: organization?.avatar_route,
                uri: `/organizations/${organization?.id}`,
                chip: <OrganizationTierChip {...{ organization }} />,
            },
            {
                skeleton: !project,
                type: 'project',
                name: project?.name,
                avatar: project?.avatar_route,
                uri: `/organizations/${organization?.id}/projects/${project?.id}`,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
            {
                name: 'Roblox Avatars',
                chip: <Chip size={'small'} label={'Beta'} color={'info'} variant={'outlined'} icon={<Science />} />,
            },
        ]);

        if (!project) {
            return;
        }

        if (organization?.has_testing_access) {
            updateTools([<StoreRobloxAvatarDeck key={'store_deck'} {...{ project, onSuccess: refetchDecks }} />]);
        }

        updateTabTitle(`${project.name} - Roblox Avatars`);
    }, [project]);

    useEffect(() => {
        getAvatarDecksState.reset();
        setDecks(null);
    }, [workspaceProjectId]);

    useEffect(() => {
        getAvatarDecksState.data?.data && setDecks(getAvatarDecksState.data.data);
    }, [getAvatarDecksState]);

    useEffect(() => {
        if (!projectSocket || !project || !workspaceProjectId) {
            return;
        }

        projectSocket
            .listen('.roblox.avatar.deck.created', refetchDecks)
            .listen('.roblox.avatar.deck.updated', refetchDecks)
            .listen('.roblox.avatar.deck.deleted', refetchDecks);

        return () => {
            if (projectSocket) {
                projectSocket
                    .stopListening('.roblox.avatar.deck.created', refetchDecks)
                    .stopListening('.roblox.avatar.deck.updated', refetchDecks)
                    .stopListening('.roblox.avatar.deck.deleted', refetchDecks);
            }
        };
    }, [projectSocket, project?.id, workspaceProjectId, queryOptions]);

    if (projectErrorMsg || organizationErrorMsg) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg ?? projectErrorMsg,
                    navigateTo: organizationErrorMsg ? `/home` : `/organizations/${organization?.id}`,
                }}
            />
        );
    }

    if (!project) {
        return <Holding />;
    }

    if (!currentMember || !currentMember.hasTestingAccess || !currentMember.projectGates.viewer) {
        return (
            <ErrorScreen
                navigateTo={`/organizations/${organization?.id}/projects/${project.id}`}
                message={'Invalid permissions.'}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>
                <div>
                    <ProjectNavigation {...{ project, refetch: refetchProject, refetchProjects }} />
                </div>
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                <TableContainer component={Paper}>
                    <Table size={'small'} aria-label={'users'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
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
                                        <TableCell colSpan={6}>
                                            <Typography>No avatar decks found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <>
                                    {[...Array(10)].map((_el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={6}>
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
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        height: '100%',
    },
}));

export default RobloxAvatarDecks;

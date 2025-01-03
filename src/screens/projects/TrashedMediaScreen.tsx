import { FC, useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { makeStyles } from 'tss-react/mui';
import useMeta from '@intractinc/base/hooks/useMeta';
import {
    Alert,
    Chip,
    Grid,
    Paper,
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
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import { useGetProjectMediaMutation } from '@intractinc/base/redux/features/projectMedia';
import ImageAvatar from '@intractinc/base/layout/navbar/ImageAvatar';
import { Attachment, Audiotrack, AutoDelete, Cloud, FolderZip, Movie } from '@mui/icons-material';
import ReactTimeAgo from 'react-timeago';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import ProjectMediaMenu from '@intractinc/base/components/ProjectMedia/ProjectMediaMenu';
import EmptyProjectMediaTrash from '@intractinc/base/components/Projects/EmptyProjectMediaTrash';

const TrashedMediaScreen: FC = () => {
    const { organization, organizationErrorMsg, project, projectSocket, workspaceProjectId, projectErrorMsg } =
        useWorkspace();
    const currentMember = project?.member;
    const { updateBreadcrumbs, updateTabTitle, updateTools } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const { classes } = useStyles();
    const [getProjectMedia, getProjectMediaState] = useGetProjectMediaMutation();
    const [media, setMedia] = useState<ProjectMedia[] | null>(null);
    const imageExt = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'tiff', 'bmp'];
    const audioExt = ['mp3', 'wav', 'aac', 'flac', 'weba'];
    const videoExt = ['avi', 'mp4', 'mpeg', 'mov', 'webm', 'wmv'];
    const zipExt = ['zip', 'rar', 'tar', 'gz', '7z'];

    const { nav, queryOptions } = useMeta(getProjectMedia, getProjectMediaState, {
        skip: !project || project.id !== workspaceProjectId,
        triggerParams: project && { projectId: project.id },
        useTrashed: false,
        sortSize: true,
        include: 'user',
        queryStrings: { 'filter[trashed]': 'only' },
    });

    const refetchMedia = () => getProjectMedia({ projectId: project?.id ?? 'unknown', options: queryOptions });

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
            { name: 'Trash', uri: `/organizations/${organization?.id}/projects/${project?.id}/trash` },
            { name: 'Media' },
        ]);

        if (!project) {
            return;
        }

        updateTools([
            <EmptyProjectMediaTrash
                key={'empty_media_trash'}
                {...{ project, member: project.member, large: true, onSuccess: refetchMedia }}
            />,
        ]);

        updateTabTitle(`${project.name} - Trash - Media`);
    }, [project, queryOptions]);

    useEffect(() => {
        getProjectMediaState.reset();
        setMedia(null);
    }, [workspaceProjectId]);

    useEffect(() => {
        getProjectMediaState.data?.data && setMedia(getProjectMediaState.data.data);
    }, [getProjectMediaState]);

    useEffect(() => {
        if (!projectSocket || !project || !workspaceProjectId) {
            return;
        }

        projectSocket
            .listen('.project.media.purged', refetchMedia)
            .listen('.project.media.restored', refetchMedia)
            .listen('.project.media.archived', refetchMedia);

        return () => {
            if (projectSocket) {
                projectSocket
                    .stopListening('.project.media.purged', refetchMedia)
                    .stopListening('.project.media.restored', refetchMedia)
                    .stopListening('.project.media.archived', refetchMedia);
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

    if (!currentMember || !currentMember.projectGates.contributor) {
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
                    <Alert icon={<AutoDelete />} severity={'warning'} style={{ width: 'auto' }}>
                        <Typography noWrap={true}>
                            Media that have been in trash for more than 7 days will be deleted forever.
                        </Typography>
                    </Alert>
                </div>
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                <TableContainer component={Paper}>
                    <Table size={'small'} aria-label={'users'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Creator</TableCell>
                                <TableCell>Trashed</TableCell>
                                <TableCell align={'right'}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {media ? (
                                media.length ? (
                                    media.map((mediaItem) => (
                                        <TableRow hover={true} key={mediaItem.id}>
                                            <TableCell>
                                                <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                    {mediaItem.extension && imageExt.includes(mediaItem.extension) ? (
                                                        <ImageAvatar
                                                            {...{
                                                                type: 'texture',
                                                                avatar: mediaItem.file_route,
                                                                name: mediaItem.name,
                                                                size: 35,
                                                            }}
                                                        />
                                                    ) : (
                                                        <ImageAvatar
                                                            {...{
                                                                type: 'icon',
                                                                icon: mediaItem.extension ? (
                                                                    audioExt.includes(mediaItem.extension) ? (
                                                                        <Audiotrack />
                                                                    ) : videoExt.includes(mediaItem.extension) ? (
                                                                        <Movie />
                                                                    ) : zipExt.includes(mediaItem.extension) ? (
                                                                        <FolderZip />
                                                                    ) : (
                                                                        <Attachment />
                                                                    )
                                                                ) : (
                                                                    <Attachment />
                                                                ),
                                                                name: mediaItem.name,
                                                                size: 35,
                                                            }}
                                                        />
                                                    )}
                                                    <Typography noWrap={true} variant={'body1'}>
                                                        {mediaItem.name ?? ''}
                                                        {mediaItem.extension ? `.${mediaItem.extension}` : ''}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    icon={<Cloud />}
                                                    label={mediaItem.file_size.human}
                                                    color={'success'}
                                                    variant={'outlined'}
                                                    size={'small'}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {mediaItem.user && (
                                                    <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                        <ImageAvatar
                                                            {...{
                                                                type: 'user',
                                                                avatar: mediaItem.user.avatar_route,
                                                                name: mediaItem.user.name,
                                                                size: 35,
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{ cursor: 'pointer' }}
                                                            noWrap={true}
                                                            variant={'body1'}
                                                        >
                                                            {mediaItem.user.name}
                                                        </Typography>
                                                    </Stack>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${mediaItem.id}_trashed`}
                                                        date={new Date(mediaItem.deleted_at ?? 'unknown')}
                                                        title={toLocaleDateString(mediaItem.deleted_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            <TableCell align={'right'}>
                                                <ProjectMediaMenu
                                                    {...{
                                                        media: mediaItem,
                                                        refetch: refetchMedia,
                                                        member: currentMember,
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Typography>No media in trash found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <>
                                    {[...Array(10)].map((_el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={5}>
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
}));

export default TrashedMediaScreen;

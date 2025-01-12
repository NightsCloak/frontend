import { FC, useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { makeStyles } from 'tss-react/mui';
import useMeta from '@intractinc/base/hooks/useMeta';
import {
    Chip,
    Grid,
    IconButton,
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
import { Attachment, Audiotrack, Cloud, Download, FolderZip, Movie } from '@mui/icons-material';
import ReactTimeAgo from 'react-timeago';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import { useGetProjectMediaAdminMutation } from '@intractinc/base/redux/features/adminProjectMedia';
import { useParams } from 'react-router-dom';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useGetProjectAdminQuery } from '@intractinc/base/redux/features/adminProject';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';

const ProjectMediaScreen: FC = () => {
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const { projectId } = useParams() as { projectId: string };
    const [media, setMedia] = useState<ProjectMedia[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { classes } = useStyles();
    const [getProjectMedia, getProjectMediaState] = useGetProjectMediaAdminMutation();
    const {
        data: project,
        error,
        isLoading,
    } = useGetProjectAdminQuery(
        { projectId },
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const imageExt = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'tiff', 'bmp'];
    const audioExt = ['mp3', 'wav', 'aac', 'flac', 'weba'];
    const videoExt = ['avi', 'mp4', 'mpeg', 'mov', 'webm', 'wmv'];
    const zipExt = ['zip', 'rar', 'tar', 'gz', '7z'];

    const { nav } = useMeta(getProjectMedia, getProjectMediaState, {
        useTrashed: false,
        sortSize: true,
        include: 'user',
        queryStrings: { 'filter[project]': projectId },
    });

    const downloadMedia = (media: ProjectMedia) => {
        if (!media.file_route) {
            return;
        }

        const link = document.createElement('a');
        link.href = media.file_route;
        link.download = `${media.name}.${media.extension}`;
        link.click();
        link.remove();
    };

    useEffect(() => {
        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Organizations', uri: '/admin/organizations' },
            {
                skeleton: !project?.organization,
                type: 'organization',
                name: project?.organization?.name,
                uri: `/admin/organizations/${project?.organization_id}`,
                avatar: project?.organization?.avatar_route,
                chip: <OrganizationTierChip {...{ organization: project?.organization }} />,
            },
            {
                skeleton: !project?.organization,
                type: 'project',
                name: project?.name,
                uri: `/admin/projects/${project?.id}`,
                avatar: project?.avatar_route,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
            { name: 'Media' },
        ]);

        if (project) {
            updateTabTitle(project.name);
        }
    }, [project]);

    useEffect(() => {
        getProjectMediaState.data?.data && setMedia(getProjectMediaState.data.data);
    }, [getProjectMediaState]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!project || !project.organization || isLoading) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                <TableContainer component={Paper}>
                    <Table size={'small'} aria-label={'users'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Creator</TableCell>
                                <TableCell>Created</TableCell>
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
                                                        key={`${mediaItem.id}_created`}
                                                        date={new Date(mediaItem.created_at)}
                                                        title={toLocaleDateString(mediaItem.created_at)}
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
                                                    {mediaItem.file_route && (
                                                        <Tooltip
                                                            placement={'top-end'}
                                                            title={<Typography>Download</Typography>}
                                                            arrow
                                                        >
                                                            <IconButton
                                                                size={'small'}
                                                                onClick={() => downloadMedia(mediaItem)}
                                                                color={'inherit'}
                                                                aria-label={'Download'}
                                                            >
                                                                <Download />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Typography>No media found.</Typography>
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
}));

export default ProjectMediaScreen;

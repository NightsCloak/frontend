import {
    Chip,
    Grid,
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
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import useMeta from '@intractinc/base/hooks/useMeta';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import ReactTimeAgo from 'react-timeago';
import { Link as RouterLink } from 'react-router-dom';
import ImageAvatar from '@intractinc/base/layout/navbar/ImageAvatar';
import { useGetProjectsAdminMutation } from '@intractinc/base/redux/features/adminProject';
import { Cloud } from '@mui/icons-material';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import ProjectMenu from '@intractinc/base/components/Admin/Projects/ProjectMenu';

const ProjectsScreen: FC = () => {
    const { classes } = useStyles();
    const [projects, setProjects] = useState<Project[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const [getProjects, getProjectsState] = useGetProjectsAdminMutation();

    const { nav, showTrashed, queryOptions } = useMeta(getProjects, getProjectsState, {
        include: 'assetsCount,assetCollectionsCount,membersCount,organization',
    });

    const refetchProjects = () => getProjects({ options: queryOptions });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Proje' }]);
        updateTabTitle('Proje');
    }, []);

    useEffect(() => {
        getProjectsState.data && setProjects(getProjectsState.data.data);
    }, [getProjectsState]);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table size={'small'} aria-label={'users'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Organization</TableCell>
                                    <TableCell>Members</TableCell>
                                    <TableCell>Models</TableCell>
                                    <TableCell>Folders</TableCell>
                                    <TableCell>Storage</TableCell>
                                    <TableCell>Created</TableCell>
                                    {showTrashed && <TableCell>Archived</TableCell>}
                                    <TableCell align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!projects ? (
                                    [...Array(25)].map((el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={showTrashed ? 9 : 8}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={25}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : projects.length > 0 ? (
                                    projects.map((project) => (
                                        <TableRow hover={true} key={project.id}>
                                            <TableCell>
                                                <Link
                                                    component={RouterLink}
                                                    to={`/admin/projects/${project.id}`}
                                                    sx={(theme) => ({
                                                        color: theme.palette.text.primary,
                                                        textDecoration: 'none',
                                                    })}
                                                >
                                                    <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                        <ImageAvatar
                                                            {...{
                                                                type: 'project',
                                                                avatar: project.avatar_route,
                                                                name: project.name,
                                                                size: 35,
                                                                disableClickable: true,
                                                            }}
                                                        />
                                                        <Typography noWrap={true} variant={'body1'}>
                                                            {project.name}
                                                        </Typography>
                                                    </Stack>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {project.organization && (
                                                    <Link
                                                        component={RouterLink}
                                                        to={`/admin/organizations/${project.organization_id}`}
                                                        sx={(theme) => ({
                                                            color: theme.palette.text.primary,
                                                            textDecoration: 'none',
                                                        })}
                                                    >
                                                        <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                            <ImageAvatar
                                                                {...{
                                                                    type: 'organization',
                                                                    avatar: project.organization.avatar_route,
                                                                    name: project.organization.name,
                                                                    size: 35,
                                                                    disableClickable: true,
                                                                }}
                                                            />
                                                            <Typography noWrap={true} variant={'body1'}>
                                                                {project.organization.name}
                                                            </Typography>
                                                            <OrganizationTierChip
                                                                {...{ organization: project.organization }}
                                                            />
                                                        </Stack>
                                                    </Link>
                                                )}
                                            </TableCell>
                                            <TableCell>{project.members_count}</TableCell>
                                            <TableCell>{project.assets_count}</TableCell>
                                            <TableCell>{project.asset_collections_count}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    size={'small'}
                                                    label={project.used_storage.human}
                                                    color={'success'}
                                                    variant={'outlined'}
                                                    icon={<Cloud />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${project.id}_created`}
                                                        date={new Date(project.created_at)}
                                                        title={toLocaleDateString(project.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            {project.deleted_at && (
                                                <TableCell>
                                                    <Typography noWrap={true} variant={'body2'}>
                                                        <ReactTimeAgo
                                                            key={`${project.id}_deleted`}
                                                            date={new Date(project.deleted_at)}
                                                            title={toLocaleDateString(project.deleted_at)}
                                                        />
                                                    </Typography>
                                                </TableCell>
                                            )}
                                            <TableCell align={'right'}>
                                                <ProjectMenu {...{ project, refetch: refetchProjects }} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8}>No projects.</TableCell>
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
}));

export default ProjectsScreen;

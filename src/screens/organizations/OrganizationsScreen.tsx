import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton, Typography } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { AutoDelete } from '@mui/icons-material';
import { useGetOrganizationsMutation } from '@intractinc/base/redux/features/organization';
import OrganizationCard from '@intractinc/base/components/Organizations/OrganizationCard';
import AddOrganization from '@intractinc/base/components/Organizations/AddOrganization';

const OrganizationsScreen: FC = () => {
    const { classes } = useStyles();
    const [organizations, setOrganizations] = useState<Organization[] | null>(null);
    const [getOrganizations, getOrganizationsState] = useGetOrganizationsMutation();
    const { updateTools, updateBreadcrumbs, updateTabTitle } = useTools();

    const { nav, queryOptions, showTrashed } = useMeta(getOrganizations, getOrganizationsState, {
        include: 'membersCount,projectsCount',
    });

    const refetchOrganizations = () => getOrganizations({ options: queryOptions });

    useEffect(() => {
        getOrganizationsState.data?.data && setOrganizations(getOrganizationsState.data.data);
    }, [getOrganizationsState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'My Organizations' }]);
        updateTabTitle('My Organizations');
        updateTools([<AddOrganization key={'add'} {...{ asButton: true }} />]);
    }, []);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {showTrashed && (
                    <Grid item xs={15}>
                        <Alert icon={<AutoDelete />} severity={'warning'} style={{ width: 'auto' }}>
                            <Typography>
                                Organizations that have been in trash for more than 7 days will be automatically deleted
                                forever.
                            </Typography>
                        </Alert>
                    </Grid>
                )}
                {organizations ? (
                    organizations.length ? (
                        organizations.map((organization) => (
                            <Grid key={`org_${organization.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <OrganizationCard
                                    key={`org_card_${organization.id}`}
                                    {...{ organization, refetch: refetchOrganizations }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No organizations found.
                            </Alert>
                        </Grid>
                    )
                ) : (
                    [...Array(15)].map((_el, i) => (
                        <Grid key={i} item xs={15} sm={5} lg={3} p={2}>
                            <Card sx={{ backgroundColor: 'transparent' }} elevation={0}>
                                <Skeleton
                                    style={{ flexGrow: 1 }}
                                    animation={'wave'}
                                    variant={'rectangular'}
                                    height={300}
                                />
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
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

export default OrganizationsScreen;

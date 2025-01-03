import { makeStyles } from 'tss-react/mui';
import { FC, useEffect } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import OrganizationCard from '@intractinc/base/components/Organizations/OrganizationCard';
import { useGetUserPendingOrganizationMembersQuery } from '@intractinc/base/redux/features/user';

const PendingOrganizationsScreen: FC = () => {
    const { classes } = useStyles();
    const { data: members } = useGetUserPendingOrganizationMembersQuery(null, {
        refetchOnMountOrArgChange: true,
    });
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Pending Organizations' }]);
        updateTabTitle('Pending Organizations');
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}></div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {members ? (
                    members.length ? (
                        members.map((member) => (
                            <Grid key={`org_${member.id}`} item xs={15} sm={5} lg={3} p={2}>
                                {member.organization && (
                                    <OrganizationCard
                                        key={`org_card_${member.id}`}
                                        {...{
                                            organization: member.organization,
                                            refetch: () => {},
                                            member,
                                        }}
                                    />
                                )}
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No pending organizations found.
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

const useStyles = makeStyles()((theme) => ({
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
    leftNav: {
        marginTop: theme.spacing(2),
    },
}));

export default PendingOrganizationsScreen;

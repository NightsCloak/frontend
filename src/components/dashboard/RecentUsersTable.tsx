import { useGetRecentUsersAdminQuery } from '@intractinc/base/redux/features/adminUser';
import { Grid2 as Grid, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReactTimeAgo from 'react-timeago';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';

const RecentUsersTable = () => {
    const { classes } = useStyles();
    const { data: users } = useGetRecentUsersAdminQuery(null, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });
    const { toLocaleDateString } = useDateUtils();
    console.log('recent', users);
    return (
        <div className={classes.root}>
            <Typography variant={'h5'} color={'intract.main'}>
                Recent Users
            </Typography>
            <Grid className={classes.gridRoot} container direction={'column'}>
                <Grid container className={classes.gridHeaderRow} size={12}>
                    <Grid size={{ xs: 12, sm: 3 }} className={classes.gridHeaderName}>
                        Name
                    </Grid>
                    <Grid size={5} className={classes.gridHeader}>
                        Email
                    </Grid>
                    <Grid size={2} className={classes.gridHeader}>
                        Verified
                    </Grid>
                    <Grid size={2} className={classes.gridHeader}>
                        Joined
                    </Grid>
                </Grid>
                <Grid className={classes.content} size={12}>
                    {users?.map((user) => (
                        <Grid container size={12}>
                            <Grid size={{ xs: 12, sm: 3 }} className={classes.gridRowName}>
                                <Typography variant={'caption'}>{user.name}</Typography>
                            </Grid>
                            <Grid size={5} className={classes.gridRow}>
                                <Typography variant={'caption'}>{user.email}</Typography>
                            </Grid>
                            <Grid size={2} className={classes.gridRow}>
                                <Typography variant={'caption'}>
                                    {user.is_verified ? (
                                        <CheckIcon sx={{ color: 'success.main' }} />
                                    ) : (
                                        <CloseIcon sx={{ color: 'error.main' }} />
                                    )}
                                </Typography>
                            </Grid>
                            <Grid size={2} className={classes.gridRow}>
                                <Typography variant={'caption'}>
                                    <ReactTimeAgo
                                        key={`${user.id}_created`}
                                        date={new Date(user.created_at)}
                                        title={toLocaleDateString(user.created_at)}
                                    />
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        height: 350,
        overflow: 'hidden',
    },
    gridRoot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: 350,
    },
    content: {
        height: 300,
        overflow: 'auto',
    },
    gridHeaderName: {},
    gridHeader: {
        height: 24,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    gridHeaderRow: {
        color: theme.palette.mode === 'dark' ? theme.palette.intract.light : theme.palette.intract.dark,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    gridRowName: {},
    gridRow: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

export default RecentUsersTable;

import { useAppSelector } from '@/redux/hooks';
import { makeStyles } from 'tss-react/mui';

const AdminDashboard = () => {
    const user = useAppSelector((state) => state.user);
    const { classes } = useStyles();

    return <div className={classes.root}>Welcome {user.name}</div>;
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
}));

export default AdminDashboard;

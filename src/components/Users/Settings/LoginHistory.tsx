import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useGetUserLoginsQuery } from '@/redux/features/user';
import { Sentry } from 'react-activity';

const LoginHistory: FC = () => {
    const { classes } = useStyles();
    const { data, isSuccess, isLoading } = useGetUserLoginsQuery(null, { refetchOnMountOrArgChange: true });

    if (isLoading || !isSuccess) {
        return (
            <div className={classes.spinnerRoot}>
                <Sentry style={{ fontSize: 30 }} />
            </div>
        );
    }

    return (
        <div className={classes.formRoot}>
            <TableContainer elevation={5} component={Paper}>
                <Table size="small" aria-label="logins history">
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>IP</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Region</TableCell>
                            <TableCell>City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((login) => (
                            <TableRow key={login.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {new Date(login.created_at).toLocaleString()}
                                </TableCell>
                                <TableCell>{login?.ip ?? ''}</TableCell>
                                <TableCell>{login.country ?? ''}</TableCell>
                                <TableCell>{login.region_name ?? ''}</TableCell>
                                <TableCell>{login.city ?? ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    spinnerRoot: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    formRoot: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    sectionForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '75%',
        },
        '& .MuiFormControl-root': {
            borderRadius: 4,
        },
    },
}));

export default LoginHistory;

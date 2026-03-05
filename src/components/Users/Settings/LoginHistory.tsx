import { FC } from 'react';
import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useGetUserLoginsQuery } from '@/redux/features/user';

const LoginHistory: FC = () => {
    const { classes } = useStyles();
    const { data } = useGetUserLoginsQuery(null, { refetchOnMountOrArgChange: true });

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
                        {!data
                            ? [...Array(10)].map((_el, i) => (
                                  <TableRow key={i}>
                                      <TableCell colSpan={6}>
                                          <Skeleton
                                              style={{ flexGrow: 1 }}
                                              animation={'wave'}
                                              variant={'rectangular'}
                                              height={20}
                                          />
                                      </TableCell>
                                  </TableRow>
                              ))
                            : data.data.map((login) => (
                                  <TableRow
                                      hover={true}
                                      key={login.id}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
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

const useStyles = makeStyles()(() => ({
    formRoot: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default LoginHistory;

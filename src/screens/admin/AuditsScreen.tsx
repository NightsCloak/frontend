import {
    Grid,
    Paper,
    Skeleton,
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
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useGetAuditsMutation } from '@intractinc/base/redux/features/adminAudits';
import AuditableCell from '@intractinc/base/components/Admin/AuditableCell';
import ReactTimeAgo from 'react-timeago';
import useMeta from '@intractinc/base/hooks/useMeta';
import AuditableProperties from '@intractinc/base/components/Admin/AuditableProperties';

const AuditsScreen: FC = () => {
    const { classes } = useStyles();
    const [audits, setAudits] = useState<AuditLog[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const [getAudits, getAuditsState] = useGetAuditsMutation();

    const { nav } = useMeta(getAudits, getAuditsState, {
        useTrashed: false,
        sortName: false,
        useSearch: false,
        include: 'subject,causer,referenced',
    });

    useEffect(() => {
        getAuditsState.data?.data && setAudits(getAuditsState.data.data);
    }, [getAuditsState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Audits' }]);
        updateTabTitle('Audits');
    }, []);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table size={'small'} aria-label={'users'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Event</TableCell>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Causer</TableCell>
                                    <TableCell>Referenced</TableCell>
                                    <TableCell>Properties</TableCell>
                                    <TableCell>Created</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {audits ? (
                                    audits.map((audit) => (
                                        <TableRow hover={true} key={audit.id}>
                                            <TableCell>
                                                <Typography variant={'caption'} noWrap={true}>
                                                    {audit.event}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <AuditableCell
                                                    {...{ auditableType: audit.subject_type, auditable: audit.subject }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <AuditableCell
                                                    {...{ auditableType: audit.causer_type, auditable: audit.causer }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <AuditableCell
                                                    {...{
                                                        auditableType: audit.referenced_type,
                                                        auditable: audit.referenced,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <AuditableProperties {...{ properties: audit.properties }} />
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${audit.id}_created`}
                                                        date={new Date(audit.created_at)}
                                                        title={toLocaleDateString(audit.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <>
                                        {[...Array(25)].map((_el, i) => (
                                            <TableRow key={i}>
                                                <TableCell colSpan={6}>
                                                    <Skeleton
                                                        style={{ flexGrow: 1 }}
                                                        animation={'wave'}
                                                        variant={'rectangular'}
                                                        height={25}
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

export default AuditsScreen;

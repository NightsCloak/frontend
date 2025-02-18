import { FC, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { FactCheck } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import { useTools } from '@/contexts/ToolsContext';
import { useAppSelector } from '@/redux/hooks';

const TermsScreen: FC = () => {
    const auth = useAppSelector((state) => state.auth.status);
    const { classes } = useStyles({ auth });
    const { updateTabTitle, updateBreadcrumbs } = useTools();

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Terms of use' }]);
        updateTabTitle('Terms of use');
    }, []);

    return (
        <Paper className={classes.paper}>
            {!auth && (
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant={'h4'}>
                        <FactCheck sx={{ fontSize: 26 }} /> Terms of Use
                    </Typography>
                </div>
            )}
            <Typography sx={{ marginY: 1, fontWeight: 'bold' }} variant={'h6'}>
                These Terms of Use are effective as of: November 10, 2023
            </Typography>
        </Paper>
    );
};

const useStyles = makeStyles<{ auth: boolean }>()((theme, { auth }) => ({
    paragraph: {
        marginBottom: theme.spacing(1.5),
    },
    paragraphIndented: {
        marginLeft: theme.spacing(2),
    },
    header: {
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
    },
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    bold: {
        fontWeight: 'bold',
    },
    mailLink: {
        fontWeight: 'bold',
        color: theme.palette.info.main,
    },
    paper: {
        paddingTop: theme.spacing(auth ? 0 : 3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

export default TermsScreen;

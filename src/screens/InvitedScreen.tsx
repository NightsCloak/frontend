import { makeStyles } from 'tss-react/mui';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Holding from '@intractinc/base/layout/Holding';
import RegisterScreen from '@intractinc/base/layout/screens/RegisterScreen';
import { useGetInvitedOrganizationMemberQuery } from '@intractinc/base/redux/features/organizationMember';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import imagePaths from '@intractinc/base/hooks/imagePaths';

const InvitedScreen: FC = () => {
    const { code } = useParams() as { code: string };
    const { updateTabTitle } = useTools();
    const auth = useAppSelector((state) => state.auth);
    const { data: member, isLoading } = useGetInvitedOrganizationMemberQuery(
        { code },
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const { classes } = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        updateTabTitle('Invited');
    }, []);

    useEffect(() => {
        auth.status && navigate('/home');
    }, []);

    if (isLoading) {
        return <Holding />;
    }

    return (
        <Grid container className={classes.root}>
            {member && (
                <Grid item>
                    <Card className={classes.card}>
                        <div className={classes.content}>
                            <img src={member.organization?.avatar_route ?? imagePaths.organization} alt={'Avatar'} />
                        </div>
                        <CardContent>
                            <Typography variant={'h4'}>
                                You have been invited to join {member.organization?.name ?? 'Organization'}!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
            <Grid sx={{ marginTop: 10 }} item xs={12}>
                <RegisterScreen
                    {...{
                        code,
                        invitedEmail: member?.email,
                    }}
                />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    },
    card: {
        maxWidth: 650,
        '& .MuiCardMedia-img': {
            display: 'flex',
            flexGrow: 1,
            maxWidth: 375,
            justifyContent: 'center',
            justifyItems: 'center',
        },
    },
    content: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        '& img': {
            marginTop: 10,
            maxWidth: 375,
            maxHeight: 200,
            borderRadius: 10,
        },
    },
}));

export default InvitedScreen;

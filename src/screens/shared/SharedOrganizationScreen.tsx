import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { useGetSharedOrganizationQuery } from '@intractinc/base/redux/features/organization';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import RegisterScreen from '@intractinc/base/layout/screens/RegisterScreen';
import LoginScreen from '@intractinc/base/layout/screens/LoginScreen';
import JoinOrganization from '@intractinc/base/components/Organizations/Members/JoinOrganization';

const SharedOrganizationScreen: FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [currentForm, setCurrentForm] = useState<'register' | 'login'>('login');
    const { code } = useParams() as { code: string };
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.auth?.status);
    const {
        data: organization,
        refetch,
        isLoading,
        error,
    } = useGetSharedOrganizationQuery(
        { code },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (organization?.member?.organizationMember) {
            navigate(`/organizations/${organization.id}`);
        }
    }, [organization]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (isLoading || !organization || !organization.member || organization.member.organizationMember) {
        return <Holding />;
    }

    return (
        <Grid container justifyContent={'center'} alignItems={'center'}>
            <Grid sx={{ borderRadius: 4, padding: 2 }} item xs={12} sm={10} md={8} lg={6} xl={4} component={Paper}>
                <JoinOrganization
                    {...{
                        organization,
                        code,
                        isGuest: !auth,
                        onSuccess: () => navigate(`/organizations/${organization.id}`),
                    }}
                />
            </Grid>
            {!auth && (
                <Grid item xs={12}>
                    {currentForm === 'register' ? (
                        <RegisterScreen
                            {...{
                                login: () => setCurrentForm('login'),
                            }}
                        />
                    ) : (
                        <LoginScreen {...{ register: () => setCurrentForm('register'), success: refetch }} />
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default SharedOrganizationScreen;

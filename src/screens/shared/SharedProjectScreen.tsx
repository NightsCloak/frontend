import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import RegisterScreen from '@intractinc/base/layout/screens/RegisterScreen';
import LoginScreen from '@intractinc/base/layout/screens/LoginScreen';
import { useGetSharedProjectQuery } from '@intractinc/base/redux/features/project';
import JoinProject from '@intractinc/base/components/Projects/Members/JoinProject';

const SharedProjectScreen: FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [currentForm, setCurrentForm] = useState<'register' | 'login'>('login');
    const { code } = useParams() as { code: string };
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.auth?.status);
    const {
        data: project,
        refetch,
        isLoading,
        error,
    } = useGetSharedProjectQuery(
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
        if (project?.member?.projectMember) {
            navigate(`/organizations/${project.organization_id}/projects/${project.id}`);
        }
    }, [project]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (isLoading || !project || !project.member || project.member.projectMember) {
        return <Holding />;
    }

    return (
        <>
            <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid sx={{ borderRadius: 4, padding: 2 }} item xs={12} sm={10} md={8} lg={6} xl={4} component={Paper}>
                    <JoinProject
                        {...{
                            project,
                            code,
                            isGuest: !auth,
                            onSuccess: () =>
                                navigate(`/organizations/${project.organization_id}/projects/${project.id}`),
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
        </>
    );
};

export default SharedProjectScreen;

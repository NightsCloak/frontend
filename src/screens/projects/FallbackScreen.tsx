import { FC, useEffect, useState } from 'react';
import { useGetProjectMutation } from '@intractinc/base/redux/features/project';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';

const FallbackScreen: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectId } = useParams() as { projectId?: string };
    const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
    const [getProject, { data: project, error }] = useGetProjectMutation();

    useEffect(() => {
        if (!projectId) {
            setErrorMsg('Invalid project.');
            return;
        }

        if (!project) {
            getProject({ projectId: projectId ?? 'unknown' });
            return;
        }

        navigate(`/organizations/${project.organization_id}${location.pathname}`);
    }, [project, projectId]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMsg(response.data.message);
        }
    }, [error]);

    if (errorMsg) {
        return <ErrorScreen message={errorMsg} />;
    }

    return <Holding />;
};

export default FallbackScreen;

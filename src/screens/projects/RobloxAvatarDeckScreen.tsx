import { FC, useEffect, useRef, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import { useGetRobloxAvatarDeckMutation } from '@intractinc/base/redux/features/robloxAvatarDeck';
import Portal from '@intractinc/base/components/RobloxAvatarDecks/Portal/Portal';
import { Chip } from '@mui/material';
import { Science } from '@mui/icons-material';
import RobloxAvatarDeckProvider from '@intractinc/base/providers/RobloxAvatarDeckProvider';

const RobloxAvatarDeckScreen: FC = () => {
    const { organization, organizationErrorMsg, project, projectErrorMsg } = useWorkspace();
    const parent = useRef<HTMLDivElement>(null!);
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [deck, setDeck] = useState<RobloxAvatarDeck | undefined>(undefined);
    const { deckId } = useParams() as { deckId: string };
    const [getDeck, { data: deckResponse, error: deckError }] = useGetRobloxAvatarDeckMutation();
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const navigate = useNavigate();

    const onExit = () => {
        navigate(`/organizations/${project?.organization_id}/projects/${project?.id}/roblox-avatars`);
    };

    const fetchDeck = () => {
        if (!project) {
            return;
        }

        getDeck({
            projectId: project.id,
            deckId,
        });
    };

    useEffect(() => {
        project && fetchDeck();
    }, [project?.id]);

    useEffect(() => {
        if (deck && deck.id !== deckId) {
            setDeck(undefined);
            fetchDeck();
        }
    }, [deck, deckId]);

    useEffect(() => {
        deckResponse && setDeck(deckResponse);
    }, [deckResponse]);

    useEffect(() => {
        if (deckError) {
            const error = deckError;
            if (error) {
                const response = error as NotFoundError;
                setErrorMessage(response.data.message);
            }
        }
    }, [deckError]);

    useEffect(() => {
        updateBreadcrumbs([
            {
                skeleton: !organization,
                type: 'organization',
                name: organization?.name,
                avatar: organization?.avatar_route,
                uri: `/organizations/${organization?.id}`,
                chip: <OrganizationTierChip {...{ organization }} />,
            },
            {
                skeleton: !project,
                type: 'project',
                name: project?.name,
                avatar: project?.avatar_route,
                uri: `/organizations/${project?.organization_id}/projects/${project?.id}`,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
            {
                name: 'Roblox Avatars',
                uri: `/organizations/${project?.organization_id}/projects/${project?.id}/roblox-avatars`,
                chip: <Chip size={'small'} label={'Beta'} color={'info'} variant={'outlined'} icon={<Science />} />,
            },
            {
                skeleton: !deck,
                name: deck?.name,
            },
        ]);

        if (deck) {
            updateTabTitle(deck.name);
        }
    }, [deck, organization, project]);

    if (projectErrorMsg || organizationErrorMsg || errorMessage) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg ?? projectErrorMsg ?? errorMessage,
                    navigateTo: organizationErrorMsg
                        ? `/home`
                        : projectErrorMsg
                          ? `/organizations/${organization?.id}`
                          : `/organizations/${organization?.id}/projects/${project?.id}/roblox-avatars`,
                }}
            />
        );
    }

    if (!deck || !project) {
        return (
            <div className={classes.root}>
                <Holding />
            </div>
        );
    }

    if (deck.status !== 'ready') {
        return (
            <ErrorScreen
                {...{
                    message: `${deck.name} is not viewable.`,
                    navigateTo: `/organizations/${project.organization_id}/projects/${project.id}/roblox-avatars`,
                }}
            />
        );
    }

    return (
        <div className={classes.root} ref={parent}>
            <RobloxAvatarDeckProvider {...{ deck, fetchDeck, parent, canvas }}>
                <Portal {...{ onExit }} />
            </RobloxAvatarDeckProvider>
            <canvas className={classes.canvas} ref={canvas} />
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        overflow: 'hidden',
        height: '100vh',
        width: '100%',
    },
    canvas: {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        minHeight: 100,
        minWidth: 100,
        transition: theme.transitions.easing.easeOut,
        outline: 'none',
        border: 'none',
    },
}));

export default RobloxAvatarDeckScreen;

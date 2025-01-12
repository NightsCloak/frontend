import { FC, useEffect, useRef, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import Portal from '@intractinc/base/components/RobloxAvatarDecks/Portal/Portal';
import { useGetRobloxAvatarDeckAdminMutation } from '@intractinc/base/redux/features/adminRobloxAvatarDeck';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import RobloxAvatarDeckProvider from '@intractinc/base/providers/RobloxAvatarDeckProvider';

const RobloxAvatarDeckScreen: FC = () => {
    const parent = useRef<HTMLDivElement>(null!);
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [deck, setDeck] = useState<RobloxAvatarDeck | undefined>(undefined);
    const { deckId } = useParams() as { deckId: string };
    const [getDeck, { data: deckResponse, error: deckError }] = useGetRobloxAvatarDeckAdminMutation();
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const navigate = useNavigate();

    const onExit = () => {
        navigate(`/admin/roblox-avatar-decks`);
    };

    useEffect(() => {
        getDeck({ deckId });
    }, [deckId]);

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
            { name: 'Admin', uri: '/admin' },
            { name: 'Organizations', uri: '/admin/organizations' },
            {
                skeleton: !deck,
                type: 'organization',
                name: deck?.project?.organization?.name,
                uri: `/admin/organizations/${deck?.project?.organization_id}`,
                avatar: deck?.project?.organization?.avatar_route,
                chip: <OrganizationTierChip {...{ organization: deck?.project?.organization }} />,
            },
            {
                skeleton: !deck,
                type: 'project',
                name: deck?.project?.name,
                uri: `/admin/projects/${deck?.project_id}`,
                avatar: deck?.project?.avatar_route,
            },
            {
                skeleton: !deck,
                name: deck?.name,
            },
        ]);

        if (deck) {
            updateTabTitle(deck.name);
        }
    }, [deck]);

    if (errorMessage) {
        return (
            <ErrorScreen
                {...{
                    message: errorMessage,
                    navigateTo: `/admin/roblox-avatar-decks`,
                }}
            />
        );
    }

    if (!deck) {
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
                    navigateTo: `/admin/roblox-avatar-decks`,
                }}
            />
        );
    }

    return (
        <div className={classes.root} ref={parent}>
            <RobloxAvatarDeckProvider
                {...{
                    deck,
                    fetchDeck: () => {},
                    parent,
                    canvas,
                }}
            >
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

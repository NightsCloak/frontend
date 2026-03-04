import { useEffect, useRef, useState } from 'react';
import Pusher, { ChannelAuthorizationCallback } from 'pusher-js';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Echo, { Channel } from 'laravel-echo';
import { useBroadcastingMutation } from '@/redux/features/auth';
import { useTools } from '@/contexts/ToolsContext';
import { setEchoStatus, setSocketId } from '@/redux/reducers/appSlice';
import apiSlice from '@/redux/apiSlice';
import { EchoContext } from '@/contexts/EchoContext';


const EchoProvider = ({ children }: EchoProps) => {
    const [echoRef, setEchoRef] = useState<Echo<'reverb'> | null>(null);
    const clientRef = useRef<Pusher | null>(null);
    const disabled = import.meta.env.VITE_DISABLE_WEBSOCKETS === 'true';
    const user = useAppSelector((state) => state.user);
    const socket = useAppSelector((state) => state.app.socket);
    const [privateChannel, setPrivateChannel] = useState<Channel | null>(null);
    const [broadcastingTrigger] = useBroadcastingMutation();
    const dispatch = useAppDispatch();
    const { playChime } = useTools();

    const customHandler = (
        { socketId, channelName }: { socketId: string; channelName: string },
        callback: ChannelAuthorizationCallback
    ) => {
        broadcastingTrigger({ socket_id: socketId, channel_name: channelName })
            .then((success) => {
                if ('data' in success) {
                    callback(null, success.data ?? null);
                }
            })
            .catch((failed: BasicError) => callback(new Error(failed.data.message), null));
    };

    useEffect(() => {
        if (disabled) {
            return;
        }

        //User Logged out/lost session
        if (!user.data?.id && privateChannel && socket === 'connected') {
            echoRef?.leaveAllChannels();
            setPrivateChannel(null);
        }
    }, [user.data?.id]);

    //Setup State changed listener
    useEffect(() => {
        if (disabled) {
            return;
        }

        if (!(clientRef.current instanceof Pusher)) {
            clientRef.current = new Pusher(`${import.meta.env.VITE_PUSHER_APP_KEY}`, {
                cluster: 'NaN',
                wsPath: import.meta.env.VITE_PUSHER_APP_PATH,
                wsHost: import.meta.env.VITE_URI,
                wssPort: parseInt(import.meta.env.VITE_PUSHER_APP_WSS_PORT as string),
                wsPort: parseInt(import.meta.env.VITE_PUSHER_APP_WS_PORT as string),
                forceTLS: (import.meta.env.VITE_DEPLOY_ENV as string) !== 'local',
                enableStats: false,
                enabledTransports: ['ws', 'wss'],
                channelAuthorization: {
                    customHandler,
                    transport: 'ajax',
                    endpoint: '',
                },
            });
        }

        if (!(echoRef instanceof Echo) && !disabled) {
            setEchoRef(
                new Echo({
                    broadcaster: 'reverb',
                    client: disabled ? null : clientRef.current,
                })
            );
        }

        const onStateChanged = ({ current, _previous }: { current: string; _previous: 'string' }) => {
            dispatch(setEchoStatus(current));
            if (current === 'connected') {
                dispatch(setSocketId(echoRef?.socketId() ?? ''));
            }
        };

        echoRef?.connector.pusher.connection.bind('state_change', onStateChanged);

        return () => {
            echoRef?.connector.pusher.connection.unbind('state_change', onStateChanged);
        };
    }, []);

    //Connect to user's private channel once we are connected
    useEffect(() => {
        if (disabled || !user.data?.id) {
            return;
        }

        if (!privateChannel) {
            setPrivateChannel(echoRef?.private(`intract.user.${user.data.id}`) ?? null);
            return;
        }

        const invalidateUser = () => dispatch(apiSlice.util.invalidateTags(['User']));

        const onNotification = () => {
            playChime();
            invalidateUser();
        };

        privateChannel
            .listen('.notification', onNotification)
            .listen('.user.archived', invalidateUser)
            .listen('.user.updated', invalidateUser)
            .listen('.user.subscription.updated', invalidateUser);

        return () => {
            privateChannel
                .stopListening('.notification', onNotification)
                .stopListening('.user.archived', invalidateUser)
                .stopListening('.user.updated', invalidateUser)
                .stopListening('.user.subscription.updated', invalidateUser);
            echoRef?.leave(`intract.user.${user.data.id}`);
            setPrivateChannel(null);
        };
    }, [socket, privateChannel, user.data?.id]);

    return <EchoContext.Provider value={{ echo: echoRef, privateChannel }}>{children}</EchoContext.Provider>;
};

export default EchoProvider;

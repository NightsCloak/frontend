import { createContext, use } from 'react';

export const EchoContext = createContext<EchoContextType>({ echo: null!, privateChannel: null! });

const useEcho = () => {
    return { ...use(EchoContext) };
};

export default EchoContext;
export { useEcho };

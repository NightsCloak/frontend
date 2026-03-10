import { FC } from 'react';
import {
    useGetChronicleGenresListQuery,
    useGetChronicleRegionsListQuery,
    useGetChroniclesQuery,
    useGetChronicleTypesListQuery,
} from '@/redux/features/chronciles';
import ChroniclesContext, { initialState } from '@/contexts/ChroniclesContext';

type ChroniclesProviderProps = {
    children: ReactNode;
};

const ChroniclesProvider: FC<ChroniclesProviderProps> = ({ children }) => {
    const { data: genresList } = useGetChronicleGenresListQuery(undefined, { pollingInterval: 300000 });
    const { data: regionsList } = useGetChronicleRegionsListQuery(undefined, { pollingInterval: 300000 });
    const { data: typesList } = useGetChronicleTypesListQuery(undefined, { pollingInterval: 300000 });
    const { data: chroniclesList } = useGetChroniclesQuery(undefined, { pollingInterval: 300000 });
    return (
        <ChroniclesContext
            value={{
                genresList: genresList ?? [],
                regionsList: regionsList ?? [],
                typesList: typesList ?? [],
                chroniclesList: chroniclesList ?? initialState['chroniclesList'],
            }}
        >
            {children}
        </ChroniclesContext>
    );
};

export default ChroniclesProvider;

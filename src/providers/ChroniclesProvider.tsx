import { FC } from 'react';
import {
    useGetChronicleGenresListQuery,
    useGetChronicleRegionsListQuery,
    useGetChroniclesMutation,
    useGetChronicleTypesListQuery,
} from '@/redux/features/chronciles';
import ChroniclesContext from '@/contexts/ChroniclesContext';

type ChroniclesProviderProps = {
    children: ReactNode;
};

const ChroniclesProvider: FC<ChroniclesProviderProps> = ({ children }) => {
    const { data: genresList, refetch: refetchGenresList } = useGetChronicleGenresListQuery(undefined, {
        pollingInterval: 300000,
    });
    const { data: regionsList, refetch: refetchRegionsList } = useGetChronicleRegionsListQuery(undefined, {
        pollingInterval: 300000,
    });
    const { data: typesList, refetch: refetchTypesList } = useGetChronicleTypesListQuery(undefined, {
        pollingInterval: 300000,
    });
    const [getChroniclesList, chroniclesListState] = useGetChroniclesMutation();

    return (
        <ChroniclesContext
            value={{
                genresList: genresList ?? [],
                refetchGenresList,
                regionsList: regionsList ?? [],
                refetchRegionsList,
                typesList: typesList ?? [],
                refetchTypesList,
                getChroniclesList,
                chroniclesListState,
            }}
        >
            {children}
        </ChroniclesContext>
    );
};

export default ChroniclesProvider;

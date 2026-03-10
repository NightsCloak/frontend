import { use } from 'react';
import ChroniclesContext from '@/contexts/ChroniclesContext';

const useChronicles = () => {
    return { ...use(ChroniclesContext) };
};

export default useChronicles;

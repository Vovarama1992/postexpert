import {create} from 'zustand';
import {BlogData} from "@/types/landing";

interface LastNewsStore {
    lastNews: BlogData | null;
    setLastNews: (locale: BlogData) => void;
}

const useLastNewsStore = create<LastNewsStore>((set) => ({
    lastNews: null, // Значение по умолчанию
    setLastNews: (lastNews) => set({ lastNews }),
}));

export default useLastNewsStore;

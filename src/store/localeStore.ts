import {create} from 'zustand';

interface LocaleStore {
    locale: string;
    setLocale: (locale: string) => void;
}

const useLocaleStore = create<LocaleStore>((set) => ({
    locale: 'en', // Значение по умолчанию
    setLocale: (locale) => set({ locale }),
}));

export default useLocaleStore;

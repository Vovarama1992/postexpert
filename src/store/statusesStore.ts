import {create} from 'zustand';
import {ParcelStatuses} from "@/types";

interface StatusStore {
    statuses: ParcelStatuses[];
    setStatuses: (locale: ParcelStatuses[]) => void;
}

const useStatusStore = create<StatusStore>((set) => ({
    statuses: [],
    setStatuses: (statuses) => set({ statuses }),
}));

export default useStatusStore;

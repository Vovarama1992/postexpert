import {create} from 'zustand';
import { Parcel } from "@/types";

interface ParcelState {
    parcel: Parcel | null;
    createdParcel: any | null;
    setParcel: (parcel: Parcel | null) => void;
    setCreatedParcel: (parcel: any | null) => void;
    clearParcel: () => void;
}

const useParcelStore = create<ParcelState>((set) => ({
    parcel: null,
    createdParcel: null,
    setParcel: (parcel: Parcel | null) => set({ parcel }),
    setCreatedParcel: (parcel: any) => set({ createdParcel: parcel }),
    clearParcel: () => set({ parcel: null }),
}));

export default useParcelStore;

import {create} from 'zustand'
import {Parcel} from "@/types";

export const useStore = create<{
    newParcel: Parcel | null, 
    error: string | null,
    getLabelByCode:  (code: string) => string ,
    locales: {[key: string]: any}
    setNewParcel: (parcel: Parcel | null) => void,
}>((set) => ({
    newParcel: null,
    error: null,
    getLabelByCode: (code) => code,
    setNewParcel: (newParcel: Parcel | null) => set({ newParcel }),
    locales: {}
}))
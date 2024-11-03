import {create} from 'zustand'

interface PayStore {
    isOpen: boolean;
    loading: boolean;
    amount: number | null;
    setIsOpen: (isOpen: boolean) => void;
    onPay: (amount: number, parcelId: number) => void;
    closePay: () => void;
    parcelId: number | null;
    setLoading: (loading: boolean) => void;
}

const usePayStore = create<PayStore>((set) => ({
    isOpen: false,
    loading: false,
    amount: null,
    parcelId: null,
    setIsOpen: (isOpen) => set({ isOpen }),
    onPay: (amount, parcelId) => set({ isOpen: true, amount, parcelId, loading: true }),
    setLoading: (loading) => set({ loading }),
    closePay: () => set({ amount: null, isOpen: false, parcelId: null }),
}));

export default usePayStore;

import { create } from 'zustand';

interface TourModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useBlogModal = create<TourModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({isOpen:false})
}))

export default useBlogModal;
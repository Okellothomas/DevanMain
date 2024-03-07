import { create } from 'zustand';

interface BlogModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useBlogModal = create<BlogModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }) // Fixed: Set isOpen to false directly
}));

export default useBlogModal;

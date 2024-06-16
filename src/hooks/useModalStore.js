import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useModalStore = create(devtools((set, get) => ({
  modals: {},
  openModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: true },
  })),
  closeModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: false },
  })),
  isModalOpen: (modalName) => get().modals[modalName] || false,
})));

export default useModalStore;
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useModalStore = create(devtools((set, get) => ({
  modals: {},
  modalData: {}, // Добавление состояния для данных модального окна

  openModal: (modalName, data = null) => set((state) => ({
    modals: { ...state.modals, [modalName]: true },
    modalData: { ...state.modalData, [modalName]: data }, // Сохранение данных для конкретного модального окна
  })),

  closeModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: false },
    modalData: { ...state.modalData, [modalName]: null }, // Очистка данных при закрытии модального окна
  })),

  isModalOpen: (modalName) => get().modals[modalName] || false,
  getModalData: (modalName) => get().modalData[modalName] || null, // Получение данных для конкретного модального окна
})));

export default useModalStore;

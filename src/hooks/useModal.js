import useModalStore from '@/hooks/useModalStore';

const useModal = (modalName) => {
  const { isModalOpen, openModal, closeModal, getModalData } = useModalStore();

  return {
    isOpen: isModalOpen(modalName),
    open: (data = null) => openModal(modalName, data),
    close: () => closeModal(modalName),
    data: getModalData(modalName),
  };
};

export default useModal;
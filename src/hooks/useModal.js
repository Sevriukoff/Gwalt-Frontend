import useModalStore from "@/hooks/useModalStore";

const useModal = (modalName) => {
  const { isModalOpen, openModal, closeModal } = useModalStore();

  return {
    isOpen: isModalOpen(modalName),
    open: () => openModal(modalName),
    close: () => closeModal(modalName),
  };
};

export default useModal;
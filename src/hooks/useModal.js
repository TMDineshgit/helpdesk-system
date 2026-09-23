import { useState } from 'react';

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => {
    setIsOpen((previous) => !previous);
  };

  return { isOpen, openModal, closeModal, toggleModal };
}

export default useModal;
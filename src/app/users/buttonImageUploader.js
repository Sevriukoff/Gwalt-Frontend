'use client';

import React, { useRef } from 'react';
import ActionButton from '@/components/actionButton';
import ModalNames from '@/constants/modalNames';
import useModal from '@/hooks/useModal';

const ButtonImageUploader = ({ className }) => {
  const inputRef = useRef();
  const imageCropperModal = useModal(ModalNames.IMAGE_CROPPER_MODAL);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      imageCropperModal.open({ file, fileUrl });
    }
  };

  return (
    <>
      <ActionButton
        className={ className }
        onClick={ () => inputRef.current.click() }>
        Редактировать
      </ActionButton>

      <input
        type='file'
        accept='image/*'
        ref={ inputRef }
        onChange={ handleImageChange }
        className='hidden'
      />
    </>

  );
};

export default ButtonImageUploader;
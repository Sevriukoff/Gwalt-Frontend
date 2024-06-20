'use client';

import React, { useEffect, useState } from 'react';
import AuthModal from '@/components/modals/authModal/authModal';
import EditProfileModal from '@/components/modals/editProfileModal';
import ImageCropperModal from '@/components/modals/imageCropperModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return null;

  return (
    <>
      <AuthModal />
      <ImageCropperModal />
      <EditProfileModal />
    </>
  );
};

export default ModalProvider;
import React from 'react';
import Modal from '@/components/modals/modal';
import modalNames from '@/constants/modalNames';
import useModal from '@/hooks/useModal';
import ImageCropper from '@/components/imageCropper';
import fetchRest from '@/utils/common/fetchRest';
import { usePatchUser } from '@/services/mutations/userMutations';
import { updateServerCache } from '@/utils/server/cache';

const ImageCropperModal = () => {
  const { isOpen, close, data } = useModal(modalNames.IMAGE_CROPPER_MODAL);
  const { trigger } = usePatchUser(16);

  const handleCropSubmit = async (croppedAreaPixels) => {
    try {
      debugger
      const file = data.file;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onloadend = async () => {
        const arrayBuffer = reader.result;

        const cropUrl = `/v1/files?x=${ croppedAreaPixels.x }&y=${ croppedAreaPixels.y }&width=${ croppedAreaPixels.width }&height=${ croppedAreaPixels.height }`;

        const res = await fetchRest(cropUrl, {
          method: 'POST',
          headers: {
            'Content-Type': file.type,
          },
          credentials: 'include',
          body: arrayBuffer,
        });

        if (res.ok) {
          const { id: fileId } = await res.json();
          //TODO: Path user avatar to PATCH /v1/users/16
          //[
          //     { "op": "replace", "path": "/avatarUrl", "value": `${ fileId }` }
          // ]
          trigger({ avatarUrl: fileId });
          updateServerCache(16);
          close();
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  const updateUserAvatar = async (userId, avatarUrl) => {
    const patchUrl = `/v1/users/${ userId }`;
    const patchData = [
      { op: 'replace', path: '/avatarUrl', value: avatarUrl },
    ];

    const response = await fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(patchData),
    });

    if (!response.ok) {
      throw new Error('Failed to update avatar');
    }

    return response.json();
  };

  const handleCropCancel = () => {

    close();
  };

  const handleChangeOpen = (isOpen) => {
    if (!isOpen)
      close();
  };

  return (
    <Modal modalName={ modalNames.IMAGE_CROPPER_MODAL }
           isOpen={ isOpen }
           onChange={ handleChangeOpen }
           height={ 780 }
           width={ 650 }
           title='Редактировать фото профиля'
           description='Для получения наилучших результатов загружайте изображения размером не менее 1000×1000 пикселей. Размер файла не должен превышать 2 МБ.'>
      <ImageCropper imageSrc={ data?.fileUrl } onCropCancel={ handleCropCancel } onCropSubmit={ handleCropSubmit } />
    </Modal>
  );
};

export default ImageCropperModal;
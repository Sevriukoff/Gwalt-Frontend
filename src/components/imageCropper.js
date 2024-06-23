'use client';

import Cropper from 'react-easy-crop';
import { useCallback, useState } from 'react';
import RangeSlider from '@/components/slider/rangeSlider';
import ActionButton from '@/components/buttons/actionButton';

const ImageCropper = ({ imageSrc, onCropCancel, onCropSubmit }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteHandler = useCallback(async () => {
    try {

      if (onCropSubmit) {
        onCropSubmit(croppedAreaPixels);
      }

    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSrc, onCropSubmit]);

  if (!imageSrc) {
    return null;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='space-y-5'>
        <div className='relative w-[500px] h-[500px] bg-white'>
          <Cropper
            classes={ {
              cropAreaClassName: 'rounded-full bg-transparent',
              containerClassName: 'bg-white',
              mediaClassName: 'bg-white',
            } }
            image={ imageSrc }
            crop={ crop }
            zoom={ zoom }
            showGrid={ false }
            aspect={ 1 }
            onCropChange={ setCrop }
            onZoomChange={ setZoom }
            onCropComplete={ (croppedArea, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            } }
          />
        </div>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center w-1/3 gap-3'>
            <button className='font-bold text-gray-500'>-</button>
            <RangeSlider
              type='range'
              value={ zoom }
              min={ 1 }
              max={ 3 }
              step={ 0.1 }
              onChange={ (value) => setZoom(value) }
              className='mt-[2.5px]'
            />
            <button className='font-bold text-gray-500'>+</button>
          </div>
          <div className='flex gap-3'>
            <ActionButton onClick={ onCropCancel }>
              Отмена
            </ActionButton>
            <ActionButton isOutline={ true }
                          onClick={ onCropCompleteHandler }>
              Сохранить
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
import React, { memo } from 'react';
import MaskedIcon from '@/components/maskedIcon';
import RangeSlider from '@/components/slider/rangeSlider';

const VolumeControl = memo(({ volume, setShowVolumeSlider, showVolumeSlider, handleVolumeChange }) => {
  console.log('render VolumeControl');
  
  return (
    <div
      className='relative'
      onMouseEnter={ () => setShowVolumeSlider(true) }
      onMouseLeave={ () => setShowVolumeSlider(false) }
    >
      <button className='flex items-center w-6 h-6'>
        <MaskedIcon
          src={ volume === 0 ? '/mute.svg' : '/volume.svg' }
          alt='Volume'
          className={ `text-textDefault ${ volume === 0 ? 'w-[20px] h-[20px]' : 'w-4 h-4' }` }
        />
      </button>
      <div
        className={ `absolute bottom-[30px] left-1/2 transform -translate-x-1/2 w-5 bg-[#F2F2F2] rounded py-2 px-1 flex items-center justify-center shadow-md transition-all duration-200 ${ showVolumeSlider ? 'h-36 opacity-100' : 'h-0 opacity-0' }` }
      >
        <RangeSlider
          min='0'
          max='100'
          value={ volume }
          orientation='vertical'
          onChange={ handleVolumeChange }
          className='bg-gray-300'
        />
      </div>
    </div>
  );
});

export default VolumeControl;
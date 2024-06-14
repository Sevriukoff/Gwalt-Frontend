import React, { memo } from 'react';
import MaskedIcon from '@/components/maskedIcon';

const PlayControls = memo(({ isPlaying, togglePlayPause, onNext, onPrevious }) => {
  console.log('render PlayControls');

  return (
    <div className='flex gap-3 text-textDefault'>
      <button onClick={ onPrevious }>
        <MaskedIcon src='/backward.svg' alt='Previous' className='w-[14px] h-[14px]' />
      </button>
      <button onClick={ togglePlayPause }>
        <MaskedIcon src={ isPlaying ? '/pause.svg' : '/play.svg' } alt='Play/Pause' className='w-[14px] h-[14px]' />
      </button>
      <button onClick={ onNext }>
        <MaskedIcon src='/forward.svg' alt='Next' className='w-[14px] h-[14px]' />
      </button>
      <button className='flex items-center' onClick={ () => { /* TODO: shuffle functionality */
      } }>
        <MaskedIcon src='/shuffle.svg' alt='Shuffle' className='w-[19px] h-[19px]' />
      </button>
      <button className='flex items-center' onClick={ () => { /* TODO: repeat functionality */
      } }>
        <MaskedIcon src='/repeat.svg' alt='Repeat' className='w-[19px] h-[19px]' />
      </button>
    </div>
  );
});

export default PlayControls;
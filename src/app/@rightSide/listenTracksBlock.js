import React from 'react';
import MaskedIcon from '@/components/maskedIcon';
import TracksBlock from '@/components/tracksBlock';
import { HistoryTrackItem } from '@/components/trackItem';

const ListenTracksBlock = async ({ listenPromise }) => {
  const listens = await listenPromise;

  return (
    <TracksBlock
      icon={ (<MaskedIcon src='/calendar.svg' alt='like-icon' className='text-[#999] w-4 h-4' />) }
      title='Прослушанные'
      tracks={ listens }
      trackItem={ HistoryTrackItem }>
      {
        listens && listens.length !== 0 ? null : (
          <div className='flex flex-col items-center gap-6'>
            <div className='flex items-center gap-3 mt-3'>
              <span className='flex items-center justify-center bg-gray-200 p-2.5 rounded-full'>
                <MaskedIcon src='/search.svg' alt='like-icon' className='text-gray-500 w-4 h-4' />
              </span>
              <p className='text-base text-[#999]'>Нет прослушанных треков</p>
            </div>
          </div>
        )
      }
    </TracksBlock>
  );
};

export default ListenTracksBlock;
'use client';

import TracksBlock from '@/components/tracksBlock';
import MaskedIcon from '@/components/maskedIcon';
import React from 'react';
import useMusicPlayer from '@/hooks/useMusicPlayer';
import { useTracks } from '@/services/client/queries/trackQueries';

const QueueTracksBlock = () => {
  const tracksIds = useMusicPlayer(state => state.ids);
  const { data: tracks, isLoading, error } = useTracks(tracksIds);

  if (error || isLoading)
    return null;

  return (
    <TracksBlock
      icon={ (<MaskedIcon src='/track-queue.svg' alt='like-icon' className='text-[#999] w-4 h-4 mb-1' />) }
      title='Очередь треков'
      tracks={ tracks }>
      {
        tracks && tracks.length !== 0 ? null : (
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

export default QueueTracksBlock;
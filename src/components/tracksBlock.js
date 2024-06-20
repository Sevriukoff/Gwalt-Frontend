'use client';

import React from 'react';
import TrackItem, { TrackItemSkeleton } from '@/components/trackItem';

const TracksBlock = ({ icon, title, tracks = [], children }) => {
  return (
    <div className=''>
      <div className='flex justify-between border-b border-b-gray-100 mb-2'>
        <div className='flex items-center gap-1.5'>
          { icon }
          <span className='text-sm text-[#999]'>{ title }</span>
        </div>
        <span className='text-sm text-[#999] mb-4'>Все</span>
      </div>
      <div className='flex flex-col gap-3'>
        { children ? children : tracks.map(x => <TrackItem key={ x.id } track={ x } />) }
      </div>
    </div>
  );
};

export const TracksBlockSkeleton = ({ icon, title, blocksCount }) => {
  return (
    <TracksBlock icon={ icon } title={ title }>
      { Array.from({ length: blocksCount }).map((_, index) => (
        <TrackItemSkeleton key={ index } />
      )) }
    </TracksBlock>
  );
};

export default TracksBlock;
import React from 'react';
import TrackItem, { TrackItemSkeleton } from '@/components/trackItem';

const TracksBlock = ({ icon, title, tracks = [], children, trackItem: TrackItemComponent = TrackItem }) => {
  return (
    <div className=''>
      <div className='flex items-center justify-between border-b border-b-gray-100 pb-2 mb-2'>
        <div className='flex items-center gap-1.5'>
          { icon }
          <span className='text-sm text-[#999]'>{ title }</span>
        </div>
        <span className='text-sm text-[#999]'>Все</span>
      </div>
      <div className='flex flex-col gap-0.5'>
        { children ? children : tracks.map(x => <TrackItemComponent key={ x.id }
                                                                    track={ x }
                                                                    tracksIds={ tracks.map(x => x.id) } />) }
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
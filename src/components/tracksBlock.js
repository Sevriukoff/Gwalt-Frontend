import React from 'react';
import SongItem from './SongItem';

const TracksBlock = ({ icon, title, songs = [] }) => {
  return (
      <div className=''>
        <div className='flex justify-between border-b border-b-gray-100 mb-2'>
          <div className='flex items-center gap-1.5'>
            {icon}
            <span className="text-sm text-[#999]">{ title }</span>
          </div>
          <span className="text-sm text-[#999] mb-4">Все</span>
        </div>
        <div className='flex flex-col gap-3'>
          {
            songs.map(x => (
                <SongItem song={x}/>
            ))
          }
        </div>
      </div>
  );
};

export default TracksBlock;
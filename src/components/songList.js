import React from 'react';
import Image from 'next/image'
import MaskedIcon from "@/components/maskedIcon";

const SongList = ({ songs }) => {
  return (
      <div className='flex bg-gradient-to-r group from-gray-800 via-amber-950 to-emerald-950 p-6 rounded-lg'>
        <div className='relative'>
          <Image
              src='https://storage.yandexcloud.net/id-gwalt-storage/image/1ae609b2-2b95-4d01-a3d1-632faaab8d06-20240517053259-968865.jpeg'
              alt='Station Cover'
              width={180}
              height={180}
              className='rounded-lg'
          />
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300'>
            <button>
              <img src='/purple-play.svg' alt='Play Icon' className='w-9 h-9'/>
            </button>
          </div>
        </div>
        <div className='flex flex-col flex-grow gap-2 ml-4 h-48 overflow-y-scroll custom-scrollbar'>
          {songs.map((song, index) => (
              <div key={index} className='relative flex items-center justify-between py-2 px-3 bg-gray-700 bg-opacity-35 rounded-md hover:bg-gray-600 transition duration-300'>
                <div>
                  <p className='text-[#D9D4D8] text-sm'>{song.artist} — <span className='text-white text-sm'>{song.title}</span></p>
                </div>
                <div className='absolute right-3 flex items-center space-x-2 transition duration-300'>
                  <MaskedIcon src='play.svg' alt='play-icon' className='text-white w-3 h-3'/>
                  <span className='text-[11px] text-white'>
                    {song.listenCount}
                  </span>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default SongList;
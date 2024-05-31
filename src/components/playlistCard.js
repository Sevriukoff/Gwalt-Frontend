import React from 'react';
import Image from "next/image";
import MaskedIcon from "@/components/maskedIcon";

const PlaylistCard = (
    {
      coverUrl = 'https://storage.yandexcloud.net/id-gwalt-storage/image/1ae609b2-2b95-4d01-a3d1-632faaab8d06-20240517053259-968865.jpeg',
      title = 'Techo #'
    }
) => {
  return (
      <div className='flex flex-col w-full group'>
        <div className='relative w-full pb-[100%] overflow-hidden rounded-[4px]'>
          <Image
              src={coverUrl}
              alt='Imagine Dragons Live in Vegas'
              layout='fill'
              objectFit='cover'
              className='rounded-[4px] border border-gray-100 group-hover:scale-110 transform transition duration-300'
          />
          <div className='absolute opacity-0 z-10 bottom-1 right-1 group-hover:opacity-80 transition duration-300'>
            <button>
              <MaskedIcon src='/like.svg' alt='like' className='text-white opacity-80 w-5 h-5'/>
            </button>
          </div>
          <div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-75 transition duration-300'></div>
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300'>
            <button>
              <MaskedIcon src='/purple-play.svg' alt='Play Icon' className='w-12 h-12 text-accentPurple'/>
            </button>
          </div>
        </div>
        <div className='mt-1.5 flex flex-col flex-grow'>
          <a className='text-base text-black font-normal'>{ title }</a>
          <p className='text-xs text-gray-500'>Trending Music</p>
        </div>
      </div>
  );
};

export default PlaylistCard;
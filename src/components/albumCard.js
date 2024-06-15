import React from 'react';
import Link from 'next/link';
import CoverImage from '@/components/coverImage';
import MaskedIcon from '@/components/maskedIcon';

const AlbumCard = (
  {
    albumId = 0,
    coverUrl = 'https://storage.yandexcloud.net/id-gwalt-storage/image/1ae609b2-2b95-4d01-a3d1-632faaab8d06-20240517053259-968865.jpeg',
    title = 'Techo #',
    genre = 'hip-hop & rap',
  },
) => {
  return (
    <div className='flex flex-col w-full'>
      <CoverImage coverUrl={ coverUrl } clasName='w-full pb-[100%]'>
        <div className='absolute opacity-0 z-10 bottom-1 right-1 group-hover:opacity-80 transition duration-300'>
          <button>
            <MaskedIcon src='/like.svg' alt='like' className='text-white opacity-80 w-5 h-5' />
          </button>
        </div>
      </CoverImage>
      <div className='mt-1.5 flex flex-col flex-grow'>
        <Link href={ `/albums/${ albumId }` }
              className='text-base text-black font-normal cursor-pointer'>{ title }</Link>
        <p className='text-xs text-gray-500'>{ genre }</p>
      </div>
    </div>
  );
};

export default AlbumCard;
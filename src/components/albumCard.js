'use client';

import React from 'react';
import Link from 'next/link';
import CoverImage from '@/components/coverImage';
import MaskedIcon from '@/components/maskedIcon';
import SoundBar from '@/components/soundBar';
import AlbumPlayButton from '@/components/buttons/albumPlayButton';

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
      <CoverImage coverUrl={ coverUrl } clasName='w-full pb-[100%]'
                  playButton={ <AlbumPlayButton iconWidth={ 26 }
                                                iconHeight={ 26 }
                                                className='p-4'
                                                fetchTracksUrl={ `/v1/albums/${ albumId }/tracks?onlyId=true` }
                  >
                    <div className='relative z-10 flex items-center justify-center'>
                      <SoundBar barWidth={ 4 } gap={ '3px' } />
                    </div>
                  </AlbumPlayButton> }>
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

export const AlbumCardSkeleton = () => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='w-[170px] h-[170px] rounded bg-accentPurple/10 animate-pulse' />
      <div className='w-[90px] h-[10px] rounded-sm bg-accentPurple/10 animate-pulse' />
      <div className='w-[50px] h-[10px] rounded-sm bg-accentPurple/10 animate-pulse' />
    </div>
  );
};

export default AlbumCard;
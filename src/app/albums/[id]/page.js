import React from 'react';
import { getGradientStyles } from '@/services/server/color';
import isIdValid from '@/services/common/idChecker';
import { getAlbumAsync, getAlbumAuthorsAsync } from '@/services/server/getters/albumGetters';
import { formatDuration, getTimeAgo } from '@/services/common/dateService';
import { PlayButton } from '@/components/playButton';
import Image from 'next/image';

const Page = async ({ params }) => {
  const albumId = params.id;

  if (!isIdValid(albumId)) {
    throw new Error('Invalid album id');
  }

  const album = await getAlbumAsync(albumId);
  const authors = await getAlbumAuthorsAsync(albumId);

  const formattedDuration = formatDuration(album.duration);
  const formattedReleaseDate = getTimeAgo(new Date(album.releaseDate));
  const gradient = await getGradientStyles(album.coverUrl);

  return (
    <div className='grid grid-cols-[1fr_auto] gap-8 text-white p-6' style={ gradient }>
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between'>

          <div className='flex items-center'>
            <PlayButton iconWidth={ 21 } iconHeight={ 21 } containerClassName='bg-transparent' className='p-4 mr-4' />
            <div className='flex flex-col gap-3'>
              <h1 className='text-2xl font-bold bg-black bg-opacity-50 px-2 py-1 rounded w-max'>{ album.title }</h1>
              <p
                className='text-base text-gray-300 bg-black bg-opacity-50 px-2 py-1 rounded w-max'>{ authors[0]?.name }</p>
            </div>
          </div>

          <div className='flex flex-col items-end space-y-2'>
            <p className='text-gray-400'>{ formattedReleaseDate }</p>
            <p className='bg-black/50 p-1 rounded inline-block'>#{ album.genre }</p>
          </div>

        </div>

        <div className='mr-auto bg-black opacity-80 px-[27px] py-4 rounded-full text-center inline-block'>
          <span className='block text-2xl font-bold'>{ album.tracksCount }</span>
          <span className='block text-xs'>Треков</span>
          <span className='block text-gray-400 text-xs'>{ formattedDuration }</span>
        </div>
      </div>

      <Image src={ album.coverUrl } alt='Album cover' width={ 340 } height={ 340 } className='rounded' />
    </div>
  );
};

export default Page;
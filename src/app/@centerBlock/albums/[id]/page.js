import React from 'react';
import ActionButton from '@/components/actionButton';
import Image from 'next/image';
import { AlbumTrackList } from '@/components/albumTrackList';

const fetchAlbum = async (albumId) => {
  const response = await fetch(
    `http://localhost:5135/api/v1/albums/${ albumId }?includes=Tracks;Authors`,
  );

  return await response.json();
};

const Page = async ({ params }) => {
  const albumId = params.id;
  const album = await fetchAlbum(albumId);

  return (
    <div className='p-6 grid grid-cols-[auto_1fr] gap-5 bg-white text-black'>
      <div className='flex justify-between border-b border-b-gray-300 col-span-2 pb-3'>
        <div className='flex gap-3'></div>
        <div className='flex gap-3'>
          <ActionButton icon={ { src: '/like.svg' } } isOutline={ false }>
            Понравилось
          </ActionButton>
        </div>
      </div>
      <div>
        <div className='relative w-[120px] h-[120px]'>
          <Image
            src={ album.authors[0].avatarUrl }
            alt='Album cover'
            layout='fill'
            className='object-cover rounded-full'
          />
        </div>
        <div>
          <h2 className='text-xl font-bold'>{ album.artist }</h2>
        </div>
      </div>
      <div>
        <p className='text-gray-600 text-sm'>
          Album release date: { album.releaseDate }
        </p>
        <AlbumTrackList coverUrl={ album.coverUrl } tracks={ album.tracks } />
      </div>
    </div>
  );
};

export default Page;

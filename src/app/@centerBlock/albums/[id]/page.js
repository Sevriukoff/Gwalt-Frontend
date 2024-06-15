import React from 'react';
import ActionButton from '@/components/actionButton';
import { AlbumTrackList } from '@/components/albumTrackList';
import ArtistCard from '@/components/artistCard';

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
    <div className='p-6 grid grid-cols-[120px_1fr] gap-5 bg-white text-black'>
      <div className='flex justify-between border-b border-b-gray-300 col-span-2 pb-3'>
        <div className='flex gap-3'></div>
        <div className='flex gap-3'>
          <ActionButton icon={ { src: '/like.svg', width: 15, height: 15 } } isOutline={ false }>
            Понравилось
          </ActionButton>
        </div>
      </div>
      <div>
        { album.authors.map(author => (
          <ArtistCard id={ author.id }
                      name={ author.name }
                      avatarUrl={ author.avatarUrl }
                      followerCount={ author.followerCount } />
        )) }
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

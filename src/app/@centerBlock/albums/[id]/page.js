import React from 'react';
import { AlbumTrackList } from '@/components/albumTrackList';
import ArtistCard from '@/components/artistCard';
import { getAlbumAsync, getAlbumAuthorsAsync, getAlbumTracksAsync } from '@/services/server/getters/albumGetters';
import isIdValid from '@/services/common/idChecker';
import { formatDate } from '@/services/common/dateService';
import AlbumActions from '@/app/@centerBlock/albums/[id]/albumActions';

const CenterBlockAlbumPage = async ({ params }) => {
  const albumId = params.id;

  if (!isIdValid(albumId)) {
    throw new Error('Invalid album id');
  }

  const album = await getAlbumAsync(albumId);
  const releaseDate = formatDate(new Date(album.releaseDate));
  const authors = await getAlbumAuthorsAsync(albumId);
  const tracks = await getAlbumTracksAsync(albumId);

  return (
    <div className='grid grid-cols-[180px_1fr] gap-5 bg-white text-black'>
      <AlbumActions initialAlbum={ album } />
      <div>
        { authors.map(author => (
          <ArtistCard key={ author.id }
                      id={ author.id }
                      name={ author.name }
                      avatarUrl={ author.avatarUrl }
                      followerCount={ author.followerCount } />
        )) }
        <div>
          <h2 className='text-xl font-bold'>{ album.artist }</h2>
        </div>
      </div>
      <div>
        <p className='text-gray-600 text-sm mb-3'>
          Альбом вышел: { releaseDate }
        </p>
        <AlbumTrackList coverUrl={ album.coverUrl } initialAlbum={ album } tracks={ tracks } />
      </div>
    </div>
  );
};

export default CenterBlockAlbumPage;

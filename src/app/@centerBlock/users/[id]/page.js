import React from 'react';
import fetchRest from '@/utils/common/fetchRest';
import Track from '@/components/track';

const fetchUser = async (id) => {
  try {
    const response = await fetchRest(`/v1/users/${ id }`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const fetchTracks = async (id) => {
  try {
    const response = await fetchRest(`/v1/users/${ id }/tracks?includes=Peaks;Album.Authors;Genres`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const CenterBlockUserPage = async ({ params }) => {
  const userPageId = params.id;
  const tracks = await fetchTracks(userPageId);

  return (
    <div className='flex flex-col gap-8'>
      {
        tracks.map((track) => (
          <Track id={ track.id }
                 title={ track.title }
                 trackDuration={ track.duration }
                 imgUrl={ track.coverUrl }
                 genres={ track.genres }
                 author={ track.authors }
                 date={ track.releaseDate }
                 like={ track.likesCount }
                 listensCount={ track.listensCount }
                 peaks={ track.peaks } />
        ))
      }
    </div>
  );
};

export default CenterBlockUserPage;
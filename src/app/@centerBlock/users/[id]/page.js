import React from 'react';
import fetchRest from '@/services/common/fetchRest';
import Track from '@/components/track';
import isIdValid from '@/services/common/idChecker';

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

  if (!isIdValid(userPageId)) {
    return null;
  }

  const tracks = await fetchTracks(userPageId);
  const tracksIds = tracks.map(x => x.id);

  return (
    <div className='flex flex-col gap-8'>
      {
        tracks.map((track) => (
          <Track key={ track.id }
                 id={ track.id }
                 tracksIds={ tracksIds }
                 title={ track.title }
                 trackDuration={ track.duration }
                 imgUrl={ track.coverUrl }
                 genres={ track.genres }
                 authors={ track.authors }
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
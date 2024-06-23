import React, { Suspense } from 'react';
import { TracksBlockSkeleton } from '@/components/tracksBlock';
import fetchRest from '@/services/common/fetchRest';
import { cookies } from 'next/headers';
import LikeTracksBlock from '@/app/@rightSide/likeTracksBlock';
import ListenTracksBlock from '@/app/@rightSide/listenTracksBlock';
import MaskedIcon from '@/components/maskedIcon';
import { getAuthUserId, isAuth } from '@/services/server/auth';
import QueueTracksBlock from '@/app/@rightSide/queueTracksBlock';

const fetchLikes = async (userId) => {
  const response = await fetchRest(`/v1/users/${ userId }/likes?type=track&pageNumber=1&pageSize=10`);
  return await response.json();
};

const fetchListensHistory = async (sessionId) => {
  const response = await fetchRest(`/v1/users/${ sessionId }/listens?orderBy=ReleaseDate&includes=Track.Album.Authors`);
  return await response.json();
};

const RightSide = async () => {
  const cookieStore = cookies();

  const listensPromise = cookieStore.has('session-id') ? fetchListensHistory(cookieStore.get('session-id').value) : [];
  const likesPromise = isAuth() ? fetchLikes(getAuthUserId()) : [];

  return (
    <div className='top-6 right-0'>
      <div className='flex flex-col gap-6'>

        <Suspense fallback={ <TracksBlockSkeleton
          icon={ (<MaskedIcon src='/like.svg' alt='like-icon' className='text-[#999] w-4 h-4' />) }
          title='Понравившиеся'
          blocksCount={ 3 } /> }>
          <LikeTracksBlock likesPromise={ likesPromise } />
        </Suspense>

        <Suspense fallback={ <TracksBlockSkeleton
          icon={ (<MaskedIcon src='/calendar.svg' alt='like-icon' className='text-[#999] w-4 h-4' />) }
          title='Прослушанные'
          blocksCount={ 2 } /> }>
          <ListenTracksBlock listenPromise={ listensPromise } />
        </Suspense>

        <QueueTracksBlock />

      </div>
    </div>
  );
};

export default RightSide;
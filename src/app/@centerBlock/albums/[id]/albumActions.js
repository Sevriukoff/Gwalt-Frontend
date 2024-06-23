'use client';

import React from 'react';
import useSWR from 'swr';
import LikeButton from '@/components/buttons/likeButtons/likeButton';
import useMusicPlayer from '@/hooks/useMusicPlayer';

const AlbumActions = ({ initialAlbum }) => {
  const { data: album, error, mutate, isLoading } = useSWR(`/v1/albums/${ initialAlbum.id }`, {
    initialData: initialAlbum,
  });

  const store = useMusicPlayer();

  if (error) return null;
  if (isLoading) return <AlbumActionsSkeleton />;

  const afterToggleLike = (isLiked) => {
    if (isLiked)
      mutate({ ...album, likesCount: album.likesCount - 1 }, { revalidate: false });
    else
      mutate({ ...album, likesCount: album.likesCount + 1 }, { revalidate: false });
  };

  return (
    <div className='flex justify-between border-b border-b-gray-300 col-span-2 pb-3'>
      <div className='flex gap-3'>
        <LikeButton likeableId={ album.id } likeableType='album' iconWidth={ 15 } iconHeight={ 15 } isOutline={ false }
                    afterToggleLike={ afterToggleLike }>
          Понравилось
        </LikeButton>
      </div>
      <div className='flex gap-3'>
        <p>{ `лайки: ${ album.likesCount }` }</p>
        <p>{ `прослушиваний: ${ album.listensCount }` }</p>
      </div>
    </div>
  );
};

export const AlbumActionsSkeleton = () => {
  return (
    <div className='flex justify-between border-b border-b-gray-300 col-span-2 pb-3'>
      <div className='flex gap-3'>
        <div className='w-[136px] h-[30px] rounded bg-accentPurple/10 animate-pulse' />
      </div>
      <div className='flex gap-3'>
        <div className='w-[90px] h-[30px] rounded bg-accentPurple/10 animate-pulse' />
        <div className='w-[90px] h-[30px] rounded bg-accentPurple/10 animate-pulse' />
      </div>
    </div>
  );
};

export default AlbumActions;
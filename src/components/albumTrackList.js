'use client';

import Image from 'next/image';
import { ExplicitContent } from '@/components/explicitContent';
import MaskedIcon from '@/components/maskedIcon';
import React from 'react';
import LikeButton from '@/components/buttons/likeButtons/likeButton';
import useSWR from 'swr';
import SoundBar from '@/components/soundBar';
import TrackPlayButton from '@/components/buttons/trackPlayButton';
import useMusicPlayer from '@/hooks/useMusicPlayer';

export const AlbumTrackList = ({ coverUrl = '', initialAlbum, tracks = [] }) => {
  const { data: album, error, mutate, isLoading } = useSWR(`/v1/albums/${ initialAlbum.id }`, {
    initialData: initialAlbum,
  });

  const setActiveTracksIds = useMusicPlayer(state => state.setIds);

  if (error) return null;
  if (isLoading) return null;

  const afterToggleLike = (isLiked) => {
    if (isLiked)
      mutate({ ...album, likesCount: album.likesCount - 1 }, { revalidate: false });
    else
      mutate({ ...album, likesCount: album.likesCount + 1 }, { revalidate: false });
  };

  return (
    <ul>
      { tracks.map((track, index) => (
        <li
          key={ track.id }
          className='flex justify-between items-center py-2 border-b border-gray-200 group hover:bg-gray-100 hover:cursor-pointer'
        >
          <div className='flex items-center gap-1'>
            <div className='relative'>
              <Image src={ coverUrl } alt={ `Cover for ${ track.title }` } width={ 45 } height={ 45 }
                     className='object-cover rounded'>

              </Image>
              <div
                className='absolute inset-0 flex items-center justify-center'>
                <TrackPlayButton iconWidth={ 12 }
                                 iconHeight={ 12 }
                                 className='p-2'
                                 trackId={ track.id }
                                 onClick={ () => {
                                   setActiveTracksIds(tracks.map(x => x.id));
                                 } }
                >
                  <div className='relative z-10 flex items-center justify-center'>
                    <SoundBar barWidth={ 3 } minHeight={ 5 } maxHeight={ 20 } gap={ '2px' } />
                  </div>
                </TrackPlayButton>
              </div>
            </div>
            <span>{ index + 1 }. { track.title }</span>
            { track.isExplicit && <ExplicitContent /> }
          </div>
          <div className='flex items-center space-x-2'>
            <div className='hidden group-hover:flex gap-2'>
              <LikeButton likeableType='track' likeableId={ track.id } afterToggleLike={ afterToggleLike } />
            </div>
            <div>
              <MaskedIcon src='/play.svg' alt='like' className='w-3 h-3 text-gray-300 mr-2' />
              <span className='text-gray-600'>{ track.listensCount }</span>
            </div>
          </div>
        </li>
      )) }
    </ul>
  );
};
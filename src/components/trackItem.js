'use client';

import React from 'react';
import MaskedIcon from '@/components/maskedIcon';
import CoverImage from '@/components/coverImage';
import LikeButton from '@/components/buttons/likeButtons/likeButton';
import useMusicPlayer from '@/hooks/useMusicPlayer';
import SoundBar from '@/components/soundBar';
import TrackPlayButton from '@/components/buttons/trackPlayButton';
import { twMerge } from 'tailwind-merge';
import { getTimeAgo } from '@/services/common/dateService';

const TrackItem = ({ track, tracksIds }) => {
  return (
    <BaseTrackItem track={ track } tracksIds={ tracksIds }>
      <div className='hidden group-hover:block absolute top-0 right-0'>
        <LikeButton likeableType='track' likeableId={ track.id } />
      </div>
      <div className='flex gap-1'>
        { track.authors.map(x => (
          <p key={ x.id } className='text-sm text-[#999] leading-none'>{ x.name }</p>
        )) }
      </div>
      <p className='text-sm mb-1'>{ track.title }</p>
    </BaseTrackItem>
  );
};

const getGradientColor = (quality) => {
  const minQuality = 100;
  const maxQuality = 1000;

  const normalizedQuality = (quality - minQuality) / (maxQuality - minQuality);

  const startColor = [95, 159, 235]; // RGB для #5F9FEB
  const endColor = [95, 227, 235]; // RGB для #5FE3EB

  const color = startColor.map((start, index) => {
    const end = endColor[index];
    return Math.round(start + (end - start) * normalizedQuality);
  });

  return `rgb(${ color.join(',') })`;
};


export const HistoryTrackItem = ({ track, tracksIds }) => {
  const qualityColor = getGradientColor(track.listenQuality);
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, #725FEB, ${ qualityColor })`,
    width: `${ track.listenPercent }%`,
  };

  return (
    <>
      <BaseTrackItem track={ track } tracksIds={ tracksIds }>
        <div className='hidden group-hover:block absolute top-0 right-0'>
          <LikeButton likeableType='track' likeableId={ track.id } />
        </div>
        <div className='hidden group-hover:block absolute bottom-0 right-0'>
          <p className='text-xs text-[#999] leading-none'>прослушано { getTimeAgo(new Date(track.listenTrackDate)) }</p>
        </div>
        <div className='flex gap-1'>
          { track.authors.map(x => (
            <p key={ x.id } className='text-sm text-[#999] leading-none'>{ x.name }</p>
          )) }
        </div>
        <p className='text-sm mb-1'>{ track.title }</p>
      </BaseTrackItem>
      <div className='w-full bg-gray-200 rounded-full h-1'>
        <div
          className='h-1 rounded-full transition-width duration-300 ease-in-out'
          style={ gradientStyle }
        />
      </div>
    </>
  );
};

const BaseTrackItem = ({ children, className, track, tracksIds }) => {
  const setActiveTracksIds = useMusicPlayer(state => state.setIds);

  const activeTrackId = useMusicPlayer(state => state.activeId);
  const shouldBeActive = track.id === activeTrackId;

  const containerClassName = twMerge(`flex gap-3 rounded ${ shouldBeActive ? 'bg-accentPurple/10' : 'bg-transparent' } transition-colors duration-300 ease-in-out group hover:bg-gray-300/10 p-3`, className);

  return (
    <div
      className={ containerClassName }>
      <CoverImage coverUrl={ track.coverUrl } clasName='w-[58px] h-[58px]'
                  playButton=
                    {
                      <TrackPlayButton iconWidth={ 12 }
                                       iconHeight={ 12 }
                                       className='p-2'
                                       trackId={ track.id }
                                       onClick={ () => {
                                         setActiveTracksIds(tracksIds);
                                       } }
                      >
                        <div className='relative z-10 flex items-center justify-center'>
                          <SoundBar barWidth={ 3 } minHeight={ 5 } maxHeight={ 20 } gap={ '2px' } />
                        </div>
                      </TrackPlayButton>
                    }
      />
      <div className='relative flex flex-grow flex-col justify-between mt-1'>
        <div>
          { children }
        </div>

        <div className='flex gap-3 text-[11px] text-gray-500'>
          <div className='flex gap-3 text-xs text-[#999]'>
            <IconWithText iconSrc='/play.svg' text={ track.listensCount } iconClass='w-3 h-3' />
            <IconWithText iconSrc='/like.svg' text={ track.likesCount } iconClass='w-3 h-3' />
          </div>
        </div>
      </div>
    </div>
  );
};

const IconWithText = ({ iconSrc, text, iconClass }) => (
  <div className='flex gap-1 items-center'>
    <MaskedIcon src={ iconSrc } alt='icon' className={ `text-[#999] ${ iconClass }` } />
    <span>{ text }</span>
  </div>
);

export const TrackItemSkeleton = () => {
  return (
    <div className='flex gap-3 rounded p-3 animate-pulse'>
      <div className='w-[64px] h-[64px] bg-accentPurple/10 rounded'></div>
      <div className='block flex-grow'>
        <p className='h-4 bg-accentPurple/10 rounded-[2px] mb-2 w-3/4'></p>
        <p className='h-4 bg-accentPurple/10 rounded-[2px] w-1/2'></p>
      </div>
    </div>
  );
};

export default TrackItem;
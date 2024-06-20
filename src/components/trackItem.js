import React from 'react';
import MaskedIcon from '@/components/maskedIcon';
import CoverImage from '@/components/coverImage';
import LikeButton from '@/components/likeButtons/likeButton';

const TrackItem = ({ track }) => {
  return (
    <div
      className='flex gap-3 rounded transition-colors duration-300 ease-in-out group hover:bg-gray-300/10 p-3'>
      <CoverImage coverUrl={ track.coverUrl } clasName='w-[64px] h-[64px]' playWidth={ 12 }
                  playHeight={ 12 } playClassName='p-2' />
      <div className='relative flex flex-grow flex-col justify-between mt-1'>
        <div>
          <div className='hidden group-hover:block absolute top-0 right-0'>
            <LikeButton likeableType='track' likeableId={ track.id } />
          </div>
          <div className='flex gap-1'>
            { track.authors.map(x => (
              <p key={ x.id } className='text-sm text-[#999] leading-none'>{ x.name }</p>
            )) }
          </div>
          <p className='text-sm mb-1'>{ track.title }</p>
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
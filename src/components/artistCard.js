'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ActionButton from '@/components/actionButton';
import FollowButton from '@/components/followButton';
import { useAuth } from '@/hoc/authContext';
import { toast } from 'react-hot-toast';

const ArtistCard = (
  {
    id = 0,
    name = '',
    avatarUrl = '',
    followerCount = 0,
  }) => {
  const [followersCount, setFollowersCount] = useState(followerCount);
  const { userId } = useAuth();

  return (
    <div className='flex flex-col w-full group'>
      <div className='relative rounded-full w-full pb-[100%] overflow-hidden'>
        <div className='absolute inset-0 rounded-full shadow-lg'></div>
        <Image
          src={ avatarUrl }
          alt='avatar'
          layout='fill'
          objectFit='cover'
          className='rounded-full border border-gray-100 group-hover:scale-110 transform transition duration-300'
        />
        <div
          className='absolute h-full rounded-full bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-25 transition duration-300' />
        {
          userId != id &&
          <div
            className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300'>
            <FollowButton followingId={ id }>
              {
                (isFollowed, isLoading, handleToggleFollow) => {
                  const handleFollow = () => {
                    handleToggleFollow(() => {
                      if (isFollowed) {
                        setFollowersCount(prevState => prevState - 1);
                        toast.success(`Вы отписались от "${ name }"`);
                      } else {
                        setFollowersCount(prevState => prevState + 1);
                        toast.success(`Вы подписались на "${ name }"`);
                      }
                    });
                  };

                  return (
                    <ActionButton icon={ { src: '/like.svg', width: 25, height: 25, className: 'text-white mt-[1px]' } }
                                  className={ `${ isLoading ? 'bg-white opacity-80 text-white' : '' } ${ !isLoading && isFollowed ? '' : 'bg-transparent hover:border-accentPurple border-[2px]' } rounded-full p-3` }
                                  isOutline={ !isLoading && isFollowed }
                                  isLoading={ isLoading }
                                  onClick={ handleFollow }
                    />
                  );
                }
              }
            </FollowButton>
          </div>
        }
      </div>
      <div className='mt-1.5 flex flex-col gap-1 items-center flex-grow'>
        <a className='text-base text-center text-black font-normal'>{ name }</a>
        <p className='text-xs text-gray-500'>{ followersCount } followers</p>
      </div>
    </div>
  );
};

export default ArtistCard;
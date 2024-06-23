'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hoc/authContext';
import RoundFollowButton from '@/components/buttons/followButtons/RoundFollowButton';
import Link from 'next/link';

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
    <div className='flex flex-col w-full p-3'>
      <div className='relative rounded-full w-full pb-[100%] overflow-hidden group'>
        <div className='absolute inset-0 rounded-full shadow-lg' />
        <Image
          src={ avatarUrl }
          alt='avatar'
          placeholder={ 'blur' }
          blurDataURL={ '/cover-default.svg' }
          layout='fill'
          objectFit='cover'
          className='rounded-full border border-gray-100 group-hover:scale-110 transform transition duration-300'
        />
        <div
          className='absolute h-full rounded-full bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-25 transition duration-300' />
        {
          userId !== id &&
          <div
            className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300'>
            <RoundFollowButton followingId={ id } name={ name } setFollowersCount={ setFollowersCount } />
          </div>
        }
      </div>
      <div className='mt-1.5 flex flex-col gap-1 items-center flex-grow'>
        <Link href={ `/users/${ id }` }
              className='text-base text-center text-black font-normal cursor-pointer'>{ name }</Link>
        <p className='text-xs text-gray-500'>{ followersCount } followers</p>
      </div>
    </div>
  );
};

export const ArtistCardSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='w-[170px] h-[170px] rounded-full bg-accentPurple/10 animate-pulse' />
      <div className='w-[90px] h-[10px] rounded bg-accentPurple/10 animate-pulse' />
      <div className='w-[50px] h-[10px] rounded bg-accentPurple/10 animate-pulse' />
    </div>
  );
};

export default ArtistCard;
import React from 'react';
import { ArtistCardSkeleton } from '@/components/artistCard';
import { AlbumActionsSkeleton } from '@/app/@centerBlock/albums/[id]/albumActions';

const Loading = () => {
  return (
    <div className='grid grid-cols-[180px_1fr] gap-10 bg-white text-black'>
      <AlbumActionsSkeleton />
      <div>
        <ArtistCardSkeleton />
      </div>
      <div className='flex flex-col gap-5'>
        <div className='w-[125px] h-[20px] rounded-full bg-accentPurple/10 animate-pulse mb-3' />
        <div className='flex items-center justify-between py-2 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='w-[45px] h-[45px] rounded bg-accentPurple/10 animate-pulse' />
            <div className='w-[110px] h-[25px] rounded bg-accentPurple/10 animate-pulse' />
          </div>
          <div className='w-[50px] h-[25px] rounded bg-accentPurple/10 animate-pulse' />
        </div>
        <div className='flex items-center justify-between py-2 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='w-[45px] h-[45px] rounded bg-accentPurple/10 animate-pulse' />
            <div className='w-[110px] h-[25px] rounded bg-accentPurple/10 animate-pulse' />
          </div>
          <div className='w-[50px] h-[25px] rounded bg-accentPurple/10 animate-pulse' />
        </div>
        <div className='flex items-center justify-between py-2 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='w-[45px] h-[45px] rounded bg-accentPurple/10 animate-pulse' />
            <div className='w-[110px] h-[25px] rounded bg-accentPurple/10 animate-pulse' />
          </div>
          <div className='w-[50px] h-[25px] rounded bg-accentPurple/10 animate-pulse' />
        </div>
      </div>
    </div>
  );
};

export default Loading;
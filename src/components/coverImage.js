import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { PlayButton } from '@/components/playButton';
import React from 'react';

const CoverImage = ({ coverUrl, clasName = '', onPlayClick, children }) => {

  const containerClasName = twMerge('relative overflow-hidden rounded-[4px] group', clasName);

  return (
    <div className={ containerClasName }>
      <Image
        src={ coverUrl }
        alt='Imagine Dragons Live in Vegas'
        layout='fill'
        objectFit='cover'
        className='rounded-[4px] border border-gray-100 group-hover:scale-110 transform transition duration-300'
      />
      { children }
      <div
        className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-75 transition duration-300' />
      <div
        className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300'>
        <PlayButton iconWidth={ 20 }
                    iconHeight={ 20 }
                    className='p-3'
                    onClick={ onPlayClick }
        />
      </div>
    </div>
  );
};

export default CoverImage;
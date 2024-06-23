import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import React from 'react';

const CoverImage = ({
                      coverUrl,
                      clasName = '',
                      children,
                      playButton,
                    }) => {

  const containerClasName = twMerge('relative overflow-hidden rounded-[4px] group', clasName);

  return (
    <div className={ containerClasName }>
      <Image
        src={ coverUrl }
        alt='Cover'
        layout='fill'
        objectFit='cover'
        placeholder={ 'blur' }
        blurDataURL={ '/cover-default.svg' }
        className='rounded-[4px] border border-gray-100 group-hover:scale-110 transform transition duration-300'
      />
      { children && children }
      <div
        className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-75 transition duration-300' />
      <div
        className='absolute inset-0 flex items-center justify-center'>
        { playButton }
      </div>
    </div>
  );
};

export default CoverImage;
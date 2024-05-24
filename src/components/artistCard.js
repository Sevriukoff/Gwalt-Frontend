'use client'

import React, {useEffect, useState} from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";

const ArtistCard = (
    {
        id = 0,
        name = '',
        imageUrl = '',
        genres = [],
        description = '',
        tracksCount = 0,
        likesCount = 0,
        playsCount = 0
    }) => {
    const router = useRouter();

    return (
        <div className='flex flex-col w-full'>
          <div className='relative w-full pb-[100%]'>
            <Image
                src='https://storage.yandexcloud.net/id-gwalt-storage/image/1ae609b2-2b95-4d01-a3d1-632faaab8d06-20240517053259-968865.jpeg'
                alt="Imagine Dragons Live in Vegas"
                layout='fill'
                objectFit='cover'
                className='rounded-full'
            />
          </div>
          <div className='mt-1.5 flex flex-col items-center flex-grow'>
            <a className='text-base text-black font-normal'>{`Billie Eilish`}</a>
            <p className='text-xs text-gray-500'>2.22M followers</p>
          </div>
        </div>
    );
};

export default ArtistCard;
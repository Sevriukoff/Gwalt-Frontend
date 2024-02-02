'use client'

import React, {useEffect, useState} from 'react';
import { useRouter } from "next/navigation";

const getImageBlob = async (path) => {
    const response = await fetch(`/api/image/?path=${path}`, {cache: 'no-cache'})

    return await response.blob()
}

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

    const [image, setImage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () =>{
            const userImg = await getImageBlob(imageUrl);
            const userImgUrl = URL.createObjectURL(userImg);
            setImage(userImgUrl);
        }

        fetchData()
    }, []);

    return (
        <div className='flex w-[700px] cursor-pointer group hover:shadow-lg duration-300 ease-in-out' onClick={() => router.push(`/users/${id}`)}>
            <img className='min-w-[230px] h-[200px] object-cover transition-transform transform-gpu group-hover:scale-105 duration-300 ease-in-out' src={image} alt='avatar' />
            <div className='flex flex-col w-full justify-between border border-l-0 border-[#9388D8] px-5 py-2.5'>
                <div>
                    <h3 className='text-2xl font-medium mb-1 group-hover:text-[#9388D8] duration-300 ease-in-out'>{name}</h3>
                    {
                        genres.length > 0 &&

                        <div className='flex gap-3 mb-3'>
                            {genres.map(g => <span className='text-xs text-white bg-[#999] font-light rounded-full px-2'>#{g}</span>)}
                        </div>
                    }
                    <p className='text-[15px] leading-5 text-gray-500'>
                        {description ? description : 'Описание отсутствует'}
                    </p>
                </div>
                <div className='flex justify-between'>
                    <span className='text-[#9388D8]'>всего треков: {tracksCount}</span>
                    <div className='flex gap-3 text-sm text-gray-500'>
                        <div className='flex items-center gap-1'>
                            <img src='/like.svg' alt='like'/>
                            <span>{likesCount}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src='/gravity-play.svg' alt='play'/>
                            <span>{playsCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistCard;
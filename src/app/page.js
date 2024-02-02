import ArtistCard from "@/components/artistCard";
import React from "react";

const getArtists = async () => {
    const response = await fetch('http://localhost:3000/api/users/?genres=true&tracksCount=true&likesCount=true&playsCount=true')

    return await response.json();
}

export default async function Home() {
    const artists = await getArtists()

    return(
        <div className='flex flex-col items-center'>
            <div
                className='w-full flex items-center justify-center absolute h-[360px] p-8'
                style={{
                    backgroundImage: `url(https://images.wallpaperscraft.ru/image/single/el_derevo_siluet_185231_3840x2400.jpg)`,

                    backgroundPosition: 'center',
                }}
            >
                <div className='flex flex-col items-center gap-10'>
                    <h1 className='text-3xl text-white bg-black bg-opacity-80 px-2 py-1'>Добро пожаловать на площадку gWALT</h1>
                    <h1 className='text-xl text-white text-wrap w-[825px] text-center bg-black bg-opacity-80 px-2 py-1'>
                        Слушайте треки своих любимых исполнителей и получайте удовольствие.
                        Ничего лишнего, только вы и музыка
                    </h1>
                </div>
            </div>
            <div className='flex flex-col items-center gap-8 mt-[390px] w-full'>
                <h2 className='text-2xl font-medium w-full text-center border-b-[1px] border-solid border-b-[#f2] pb-5'>Популярные исполнители</h2>
                {artists.reverse().map(a => <ArtistCard id={a.UserID} name={a.Username} imageUrl={a.AvatarUrl} genres={a.Genres} description={a.Description} tracksCount={a.TracksCount} likesCount={a.LikesCount} playsCount={a.PlaysCount}/>)}
            </div>
        </div>
    )
}

import React from 'react';
import {ActionButton} from "@/components/actionButton";
import Image from "next/image";
import {PlayButton} from "@/components/playButton";
import MaskedIcon from "@/components/maskedIcon";
import {Exo} from "next/dist/compiled/@next/font/dist/google";

const album = {
  title: "HIT ME HARD AND SOFT",
  artist: "Billie Eilish",
  releaseDate: "17 May 2024",
  followerCount: "2.24M",
  coverImage: "/Bili.jpg",
  tracks: [
    { title: "SKINNY", coverImage: "/Bili.jpg", playCount: "1.33M" },
    { title: "LUNCH", coverImage: "/Bili.jpg", playCount: "807K" },
    { title: "CHIHIIRO", coverImage: "/Bili.jpg", playCount: "930K" },
    { title: "BIRDS OF A FEATHER", coverImage: "/Bili.jpg", playCount: "669K" },
    { title: "WILDFLOWER", coverImage: "/Bili.jpg", playCount: "580K" },
    { title: "THE GREATEST", coverImage: "/Bili.jpg", playCount: "444K" },
    { title: "L'AMOUR DE MA VIE", coverImage: "/Bili.jpg", playCount: "462K" },
    { title: "THE DINER", coverImage: "/Bili.jpg", playCount: "435K" },
    { title: "BITTERSUITE", coverImage: "/Bili.jpg", playCount: "433K" },
    { title: "BLUE", coverImage: "/Bili.jpg", playCount: "599K" },
  ]
};

const fetchAlbum = async (albumId) => {
  const response = await fetch(`http://localhost:5135/api/v1/albums/${albumId}?includes=Tracks;Authors`);

  return await response.json()
}

const Page = async ({ params }) => {
  const albumId = params.id;
  const album = await fetchAlbum(albumId);

  return (
      <div className="p-6 grid grid-cols-[auto_1fr] gap-5 bg-white text-black">
        <div className='flex justify-between border-b border-b-gray-300 col-span-2 pb-3'>
          <div className='flex gap-3'>
            <ActionButton iconSrc='/like.svg' label='Понравилось'/>
            <ActionButton iconSrc='/like.svg' label='Понравилось' isOutline />
          </div>
          <div className='flex gap-3'>
            <ActionButton iconSrc='/like.svg' label='Понравилось' isOutline />
            <ActionButton iconSrc='/like.svg' label='Понравилось' isOutline />
          </div>
        </div>
        <div>
          <Image src={album.authors[0].avatarUrl} alt="Album cover" width={120} height={120} className="min-width-[120px] min-h-[120px] object-cover rounded-full" />
          <div>
            <h2 className="text-xl font-bold">{album.artist}</h2>
            <p className="text-sm text-gray-600"><span className="font-bold">{album.followerCount}</span> followers</p>
            <button className="bg-orange-500 text-white px-3 py-1 rounded mt-2">Following</button>
          </div>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Album release date: {album.releaseDate}</p>
          <ul>
            {album.tracks.map((track, index) => (
                <li
                    key={track.id}
                    className="flex justify-between items-center py-2 border-b border-gray-200 group hover:bg-gray-100 hover:cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <div className='relative'>
                      <Image src={album.coverUrl} alt={`Cover for ${track.title}`} width={30} height={30} className="object-cover" />
                      <PlayButton iconWidth={10} iconHeight={10} className='hidden group-hover:flex p-1.5 absolute left-1 top-1'/>
                    </div>
                    <span>{index + 1}. {track.title}</span>
                    {track.isExplicit && <ExplicitContent/> }
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className='hidden group-hover:flex gap-2'>
                      <ActionButton iconSrc='/like.svg' className='px-1 py-1' iconWidth={12} iconHeight={12}/>
                      <ActionButton iconSrc='/repost.svg' className='px-1 py-1' iconWidth={16} iconHeight={12}/>
                      <ActionButton iconSrc='/comment.svg' className='px-1 py-1' iconWidth={12} iconHeight={12}/>
                    </div>
                    <div>
                      <MaskedIcon src='/play.svg' alt='like' className='w-3 h-3 text-gray-300 mr-2'/>
                      <span className="text-gray-600">{track.listensCount}</span>
                    </div>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

const ExplicitContent = () => {
  return (
      <span className='bg-gray-100 border border-gray-300 font-bold text-[9px] rounded text-textDefault px-[6px] py-[3px]'>E</span>
  )
}

export default Page;
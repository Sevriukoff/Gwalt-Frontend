import React from 'react';
import {ActionButton} from "@/components/actionButton";
import Image from "next/image";
import {AlbumTrackList} from "@/components/albumTrackList";

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
          <AlbumTrackList coverUrl={album.coverUrl} tracks={album.tracks}/>
        </div>
      </div>
  );
};

export default Page;
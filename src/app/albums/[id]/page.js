import React from 'react';
import Image from "next/image";
import {PlayButton} from "@/components/playButton";
import {getGradientStyles} from "@/utils/server/color";
import RangeSlider from "@/components/slider/rangeSlider";


const album = {
  title: "HIT ME HARD AND SOFT",
  artist: "Billie Eilish",
  releaseDate: "12 days ago",
  tracksCount: "10",
  genre: "Alternative",
  coverImage: "/Bili.jpg"
};

const fetchAlbum = async (albumId) => {
  const response = await fetch(`http://localhost:5135/api/v1/albums/${albumId}?includes=Tracks;Authors`);

  return await response.json()
}

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const getTotalDuration = (tracks) => {
  return tracks.reduce((total, track) => {
    const [hours, minutes, seconds] = track.duration.split(':').map(Number);
    return total + (hours * 3600) + (minutes * 60) + seconds;
  }, 0);
};

const Page = async ({ params }) => {
  const albumId = params.id;
  const album = await fetchAlbum(albumId);
  const trackCount = album.tracks.length;
  const totalDurationInSeconds = getTotalDuration(album.tracks);
  const formattedDuration = formatDuration(totalDurationInSeconds);
  const gradient = await getGradientStyles(album.coverUrl);

  return (
      <div className="grid grid-cols-[1fr_auto] gap-8 text-white p-6" style={gradient}>
        <div className='flex flex-col justify-between'>
          <div className="flex justify-between">

            <div className='flex items-center'>
              <PlayButton iconWidth={21} iconHeight={21} className='p-4 mr-4'/>
              <div className='flex flex-col gap-3'>
                <h1 className="text-2xl font-bold bg-black bg-opacity-50 px-2 py-1 rounded w-max">{album.title}</h1>
                <p className="text-base text-gray-300 bg-black bg-opacity-50 px-2 py-1 rounded w-max">{album.authors[0]?.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <p className="text-gray-400">{album.releaseDate}</p>
              <p className="bg-gray-700 p-1 rounded inline-block">#{album.genre}</p>
            </div>

          </div>

          <div className="mr-auto bg-black opacity-80 px-[27px] py-4 rounded-full text-center inline-block">
            <span className="block text-2xl font-bold">{trackCount}</span>
            <span className="block text-xs">Треков</span>
            <span className="block text-gray-400 text-xs">{formattedDuration}</span>
          </div>
        </div>

        <Image src={album.coverUrl} alt="Album cover" width={340} height={340} />
      </div>
  );
};

export default Page;
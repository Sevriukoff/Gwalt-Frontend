import React from 'react';
import Carousel from "@/components/Carousel";
import Album from "@/components/album";
import Image from "next/image";
import SongList from "@/components/songList";
import HomeComponent from "@/components/homeComponent";
import PlaylistCard from "@/components/playlistCard";
import ArtistCard from "@/components/artistCard";
import SongItem from "@/components/songItem";
import {serverFetch} from "@/utils/server/auth";

const items = [
  'Card 1',
  'Card 2',
  'Card 3',
  'Card 4',
  'Card 5',
  'Card 6',
  'Card 7',
  'Card 8',
  'Card 9',
  'Card 10',
  'Card 11',
  'Card 12',
  'Card 13',
  'Card 14',
  'Card 15',
  'Card 16',
  'Card 17',
  'Card 18',
  'Card 19',
  'Card 20',
  'Card 21',
];

const songs = [
  { artist: 'Billie Eilish', title: 'No Time To Die', listenCount: '7.81M' },
  { artist: 'Billie Eilish', title: 'No Time To Die', listenCount: '7.81M' },
  { artist: 'AURORA', title: 'Runaway', listenCount: '28.9M' },
  { artist: 'AURORA', title: 'Runaway', listenCount: '28.9M' },
  { artist: 'Sabrina Jade Marquardt', title: 'Sia - Elastic Heart [Lyrics]', listenCount: '30.1M' },
  { artist: 'Sabrina Jade Marquardt', title: 'Sia - Elastic Heart [Lyrics]', listenCount: '30.1M' },
  { artist: 'Billie Eilish', title: 'everything i wanted', listenCount: '27.4M' },
  { artist: 'Billie Eilish', title: 'everything i wanted', listenCount: '27.4M' },
  { artist: 'the neighbourhood', title: '"Sweater Weather"', listenCount: '32.4M' },
];

const fetchAlbums = async () =>{
  const response = await serverFetch('http://localhost:5135/api/v1/albums?includes=Tracks&orderBy=releaseDateDesc')
  console.log(response);

  return response.slice(0, 8);
}


const LeftSide = async () => {
  const albums = await fetchAlbums();

  return (
      <div className=''>
        <HomeComponent title='Популярная музыка на GWalt'>
          <Carousel gap={32} itemsPerSlide={5}>
            {
              items.map((item, index) => (
                  <PlaylistCard/>
              ))
            }
          </Carousel>
        </HomeComponent>

        <HomeComponent title='Плейлист дня'>
          <SongList songs={songs} />
        </HomeComponent>

        <HomeComponent title='Популярные актёры'>
          <Carousel gap={32} itemsPerSlide={5}>
            {
              items.map((item, index) => (
                  <ArtistCard/>
              ))
            }
          </Carousel>
        </HomeComponent>

        <HomeComponent title='Идеально для вечеринки'>
          <Carousel gap={32} itemsPerSlide={5}>
            {
              items.map((item, index) => (
                  <PlaylistCard/>
              ))
            }
          </Carousel>
        </HomeComponent>

        <HomeComponent title='Недавние релизы'>
          <Carousel gap={32} itemsPerSlide={5}>
            {
              albums.map((item, index) => (
                  <PlaylistCard coverUrl={item.coverUrl} title={item.title} />
              ))
            }
          </Carousel>
        </HomeComponent>

        <Album/>

      </div>
  );
};

export default LeftSide;
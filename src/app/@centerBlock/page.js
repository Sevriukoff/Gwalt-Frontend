import React, { Suspense } from 'react';
import SongList from '@/components/songList';
import HomeComponent from '@/components/homeComponent';
import fetchRest from '@/utils/common/fetchRest';
import AlbumsCarousel, { AlbumsCarouselSkeleton } from '@/app/@centerBlock/albumsCarousel';
import ArtistsCarousel, { ArtistsCarouselSkeleton } from '@/app/@centerBlock/artistsCarousel';

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

const fetchNewAlbums = async () => {
  const response = await fetchRest('/v1/albums?includes=Genre&orderBy=releaseDateDesc&pageNumber=1&pageSize=10');
  return await response.json();
};

const fetchPopularAlbums = async () => {
  const response = await fetchRest('/v1/albums?includes=Genre&orderBy=ListensCountDesc&pageNumber=1&pageSize=10');
  return await response.json();
};

const fetchPopularArtists = async () => {
  const response = await fetchRest('/v1/users?withStats=true&orderBy=FollowersCountDesc&pageNumber=1&pageSize=10');
  return await response.json();
};

const fetchAlbumByGenre = async (genres = []) => {
  const genreStr = genres.join(';');
  const response = await fetchRest(`/v1/albums?includes=Genre&genres=${ genreStr }&orderBy=releaseDateDesc&pageNumber=1&pageSize=10`);
  return await response.json();
};

const CenterBlockHomePage = async () => {
  const newAlbums = fetchNewAlbums();
  const popularAlbums = fetchPopularAlbums();
  const popularUsers = fetchPopularArtists();
  const postPunkAlbums = fetchAlbumByGenre(['post-punk']);
  const partyAlbums = fetchAlbumByGenre(['hip-hop %26 rap', 'pop']);

  return (
    <div className=''>

      <HomeComponent title='Популярная музыка на GWalt'>
        <Suspense fallback={ <AlbumsCarouselSkeleton /> }>
          <AlbumsCarousel dataPromise={ popularAlbums } />
        </Suspense>
      </HomeComponent>

      <HomeComponent title='Плейлист дня'>
        <SongList songs={ songs } />
      </HomeComponent>

      <HomeComponent title='Недавние релизы'>
        <Suspense fallback={ <AlbumsCarouselSkeleton /> }>
          <AlbumsCarousel dataPromise={ newAlbums } />
        </Suspense>
      </HomeComponent>

      <HomeComponent title='Популярные исполнители'>
        <Suspense fallback={ <ArtistsCarouselSkeleton /> }>
          <ArtistsCarousel dataPromise={ popularUsers } />
        </Suspense>
      </HomeComponent>

      <HomeComponent title='Идеально для вечеринки'>
        <Suspense fallback={ <AlbumsCarouselSkeleton /> }>
          <AlbumsCarousel dataPromise={ partyAlbums } />
        </Suspense>
      </HomeComponent>

      <HomeComponent title='Треки для самых грустных'>
        <Suspense fallback={ <AlbumsCarouselSkeleton /> }>
          <AlbumsCarousel dataPromise={ postPunkAlbums } />
        </Suspense>
      </HomeComponent>
    </div>
  );
};

export default CenterBlockHomePage;
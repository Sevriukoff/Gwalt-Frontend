import React from 'react';
import Carousel from '@/components/Carousel';
import SongList from '@/components/songList';
import HomeComponent from '@/components/homeComponent';
import AlbumCard from '@/components/albumCard';
import ArtistCard from '@/components/artistCard';
import fetchRest from '@/utils/common/fetchRest';

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
  const data = await response.json();

  return data;
};

const fetchPopularAlbums = async () => {
  const response = await fetchRest('/v1/albums?includes=Genre&orderBy=ListensCountDesc&pageNumber=1&pageSize=10');
  const data = await response.json();

  return data;
};

const fetchPopularArtists = async () => {
  const response = await fetchRest('/v1/users?withStats=true&orderBy=FollowersCountDesc&pageNumber=1&pageSize=10');
  const data = await response.json();

  return data;
};

const fetchAlbumByGenre = async (genres = []) => {
  const genreStr = genres.join(';');
  const response = await fetchRest(`/v1/albums?includes=Genre&genres=${ genreStr }&orderBy=releaseDateDesc&pageNumber=1&pageSize=10`);
  const data = await response.json();

  return data;
};


const LeftSide = async () => {
  const newAlbums = await fetchNewAlbums();
  const popularAlbums = await fetchPopularAlbums();
  const popularUsers = await fetchPopularArtists();
  const postPunkAlbums = await fetchAlbumByGenre(['post-punk']);
  const partyAlbums = await fetchAlbumByGenre(['hip-hop %26 rap', 'pop']);

  return (
    <div className=''>
      <HomeComponent title='Популярная музыка на GWalt'>
        <Carousel gap={ 32 } itemsPerSlide={ 5 }>
          {
            popularAlbums.map((album) => (
              <AlbumCard key={ album.id }
                         albumId={ album.id }
                         coverUrl={ album.coverUrl }
                         title={ album.title }
                         genre={ album.genre }
              />
            ))
          }
        </Carousel>
      </HomeComponent>

      <HomeComponent title='Плейлист дня'>
        <SongList songs={ songs } />
      </HomeComponent>

      <HomeComponent title='Недавние релизы'>
        <Carousel gap={ 32 } itemsPerSlide={ 5 }>
          {
            newAlbums.map((album) => (
              <AlbumCard key={ album.id }
                         albumId={ album.id }
                         coverUrl={ album.coverUrl }
                         title={ album.title }
                         genre={ album.genre }
              />
            ))
          }
        </Carousel>
      </HomeComponent>

      <HomeComponent title='Популярные исполнители'>
        <Carousel gap={ 32 } itemsPerSlide={ 5 }>
          {
            popularUsers.map((user) => (
              <ArtistCard key={ user.id }
                          id={ user.id }
                          avatarUrl={ user.avatarUrl }
                          name={ user.name }
                          followerCount={ user.followersCount }
              />
            ))
          }
        </Carousel>
      </HomeComponent>

      <HomeComponent title='Идеально для вечеринки'>
        <Carousel gap={ 32 } itemsPerSlide={ 5 }>
          {
            partyAlbums.map((album) => (
              <AlbumCard key={ album.id }
                         albumId={ album.id }
                         coverUrl={ album.coverUrl }
                         title={ album.title }
                         genre={ album.genre }
              />
            ))
          }
        </Carousel>
      </HomeComponent>

      <HomeComponent title='Треки для самых грустных'>
        <Carousel gap={ 32 } itemsPerSlide={ 5 }>
          {
            postPunkAlbums.map((album) => (
              <AlbumCard key={ album.id }
                         albumId={ album.id }
                         coverUrl={ album.coverUrl }
                         title={ album.title }
                         genre={ album.genre }
              />
            ))
          }
        </Carousel>
      </HomeComponent>

    </div>
  );
};

export default LeftSide;
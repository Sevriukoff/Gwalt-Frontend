import React from 'react';
import AlbumCard, { AlbumCardSkeleton } from '@/components/albumCard';
import Carousel from '@/components/carousel';

const AlbumsCarousel = async ({ dataPromise }) => {
  const albums = await dataPromise;

  return (
    <Carousel gap={ 32 } itemsPerSlide={ 5 }>
      { albums.map((album) => (
        <AlbumCard key={ album.id } albumId={ album.id } coverUrl={ album.coverUrl } title={ album.title }
                   genre={ album.genre } />
      )) }
    </Carousel>
  );
};

export const AlbumsCarouselSkeleton = () => {
  return (
    <Carousel gap={ 32 } itemsPerSlide={ 5 }>
      { Array.from({ length: 6 }).map((_, index) => (
        <AlbumCardSkeleton key={ index } />
      )) }
    </Carousel>
  );
};

export default AlbumsCarousel;
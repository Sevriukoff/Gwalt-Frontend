import React from 'react';
import Carousel from '@/components/carousel';
import ArtistCard, { ArtistCardSkeleton } from '@/components/artistCard';


const ArtistsCarousel = async ({ dataPromise }) => {
  const artists = await dataPromise;

  return (
    <Carousel gap={ 32 } itemsPerSlide={ 5 }>
      { artists.map((user) => (
        <ArtistCard key={ user.id } id={ user.id } avatarUrl={ user.avatarUrl } name={ user.name }
                    followerCount={ user.followersCount } />
      )) }
    </Carousel>
  );
};

export const ArtistsCarouselSkeleton = () => {
  return (
    <Carousel gap={ 32 } itemsPerSlide={ 5 }>
      { Array.from({ length: 6 }).map((_, index) => (
        <ArtistCardSkeleton key={ index } />
      )) }
    </Carousel>
  );
};

export default ArtistsCarousel;
import React from 'react';
import TracksBlock from '@/components/tracksBlock';
import MaskedIcon from '@/components/maskedIcon';

const LikeTracksBlock = async ({ likesPromise }) => {
  const likes = await likesPromise;

  return (
    <TracksBlock
      icon={ (<MaskedIcon src='/like.svg' alt='like-icon' className='text-[#999] w-4 h-4' />) }
      title='Понравившиеся'
      tracks={ likes }>
      {
        likes && likes.length !== 0 ? null : (
          <div className='flex flex-col items-center my-auto gap-6'>
            <p className='text-sm text-[#999]'>Войдите в аккаунт или создайте новый, что бы ставить лайки</p>
          </div>
        )
      }
    </TracksBlock>
  );
};

export default LikeTracksBlock;
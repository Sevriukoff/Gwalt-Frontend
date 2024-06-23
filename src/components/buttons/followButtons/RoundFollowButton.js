import ActionButton from '@/components/buttons/actionButton';
import React from 'react';
import useFollow from '@/hooks/useFollow';

const RoundFollowButton = ({ followingId, name, setFollowersCount }) => {
  const { isFollowed, isLoading, handleToggleFollow } = useFollow(followingId, name, setFollowersCount);

  return (
    <ActionButton icon={ { src: '/like.svg', width: 25, height: 25, className: 'text-white mt-[1px]' } }
                  className={ `${ isLoading ? 'bg-white opacity-80 text-white' : '' } ${ !isLoading && isFollowed ? '' : 'bg-transparent hover:border-accentPurple border-[2px]' } rounded-full p-3` }
                  isOutline={ !isLoading && isFollowed }
                  isLoading={ isLoading }
                  onClick={ handleToggleFollow }
    />
  );
};

export default RoundFollowButton;
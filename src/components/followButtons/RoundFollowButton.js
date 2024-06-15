import ActionButton from '@/components/actionButton';
import React from 'react';
import FollowButton from '@/components/followButton';

const RoundFollowButton = ({ followingId, name, setFollowersCount }) => {
  return (
    <FollowButton
      followingId={ followingId }
      name={ name }
      setFollowersCount={ setFollowersCount }
      render={ ({ isFollowed, isLoading, handleToggleFollow }) => (
        <ActionButton icon={ { src: '/like.svg', width: 25, height: 25, className: 'text-white mt-[1px]' } }
                      className={ `${ isLoading ? 'bg-white opacity-80 text-white' : '' } ${ !isLoading && isFollowed ? '' : 'bg-transparent hover:border-accentPurple border-[2px]' } rounded-full p-3` }
                      isOutline={ !isLoading && isFollowed }
                      isLoading={ isLoading }
                      onClick={ handleToggleFollow }
        />
      ) }
    />
  );
};

export default RoundFollowButton;
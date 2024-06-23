'use client';

import React from 'react';
import useFollow from '@/hooks/useFollow';
import ActionButton from '@/components/buttons/actionButton';

const FollowButton = ({ children, followingId, name, setFollowersCount }) => {
  const { isFollowed, isLoading, handleToggleFollow } = useFollow(followingId, name, setFollowersCount);

  return (
    <ActionButton icon={ { src: '/follow.svg', width: 18, height: 18, className: '' } }
                  isOutline={ true }
                  isLoading={ isLoading }
                  onClick={ handleToggleFollow }
    >
      { children }
    </ActionButton>
  );
};

export default FollowButton;
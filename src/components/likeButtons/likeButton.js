'use client';

import React from 'react';
import ActionButton from '@/components/actionButton';
import useLike from '@/hooks/useLike';

const LikeButton = ({ children, likeableType = 'track', likeableId = -1, setLikesCount }) => {
  const { isLiked, isLoading, handleToggleLike } = useLike({ likeableType, likeableId, setLikesCount });

  return (
    <ActionButton
      iconSrc='/like.svg'
      icon={ {
        src: '/like.svg',
        className: `${ isLiked ? 'text-accentPurple' : 'text-textDefault' }`,
        width: 12,
        height: 12,
      } }
      className={ `text-xs ${ isLiked ? 'hover:border-accentPurple' : '' }` }
      isLoading={ isLoading }
      onClick={ handleToggleLike }
    >
      { children }
    </ActionButton>
  );
};

export default LikeButton;
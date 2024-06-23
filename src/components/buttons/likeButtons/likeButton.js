'use client';

import React from 'react';
import ActionButton from '@/components/buttons/actionButton';
import useLike from '@/hooks/useLike';

const LikeButton = ({
                      children,
                      iconWidth = 12,
                      iconHeight = 12,
                      likeableType = 'track',
                      likeableId = -1,
                      afterToggleLike = (isLiked) => {
                      },
                      setLikesCount,
                    }) => {
  const { isLiked, isLoading, handleToggleLike } = useLike({ likeableType, likeableId, setLikesCount });

  const internalHandleToggleLike = async () => {
    await handleToggleLike();

    if (afterToggleLike)
      afterToggleLike(isLiked);
  };

  return (
    <ActionButton
      iconSrc='/like.svg'
      icon={ {
        src: '/like.svg',
        className: isLiked ? 'text-accentPurple' : 'text-textDefault',
        width: iconWidth,
        height: iconHeight,
      } }
      className={ `text-sm ${ isLiked ? 'text-accentPurple hover:border-accentPurple' : 'text-textDefault' }` }
      isLoading={ isLoading }
      onClick={ internalHandleToggleLike }
    >
      { children }
    </ActionButton>
  );
};

export default LikeButton;
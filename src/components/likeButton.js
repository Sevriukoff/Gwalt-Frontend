'use client';

import React, { useEffect, useState } from 'react';
import ActionButton from '@/components/actionButton';
import { useAuth } from '@/hoc/authContext';
import useModal from '@/hooks/useModal';
import ModalNames from '@/app/constants/modalNames';
import fetchRest from '@/utils/common/fetchRest';

const LikeButton = ({ likeableType = 'track', likeableId = -1 }) => {
  const [likeId, setLikeId] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const isLiked = likeId > 0;

  const { isAuthenticated } = useAuth();
  const authModal = useModal(ModalNames.AUTH_MODAL);

  useEffect(() => {
    if (!isAuthenticated)
      return;

    const fetchData = async () => {
      try {
        const response = await fetchRest(`/v1/likes/${ likeableType }/${ likeableId }`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setLikeId(data.id);
        }

      } catch (error) {
        console.log(`Ошибки при загрузке лайка ${ error }`);
      } finally {
        setIsLoading(false);
      }

    };

    setIsLoading(true);
    fetchData();
  }, [isAuthenticated, likeableType, likeableId]);

  const handleToggleLike = async () => {
    if (!isAuthenticated)
      return authModal.open();

    setIsLoading(true);

    try {
      if (!isLiked) {
        const response = await fetchRest('/v1/likes',
          {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ likeableType: likeableType, likeableId: likeableId }),
          });

        if (response.ok) {
          const data = await response.json();
          setLikeId(data.id);
        }
      } else {
        const response = await fetchRest(`/v1/likes/${ likeId }`, { method: 'DELETE', credentials: 'include' });

        if (response.ok)
          setLikeId(-1);
      }
    } catch (error) {
      console.log(`Ошибки при загрузке лайков ${ error }`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ActionButton iconSrc='/like.svg'
                  icon={ {
                    src: '/like.svg',
                    className: `${ isLiked ? 'text-accentPurple' : 'text-textDefault' }`,
                    width: 12,
                    height: 12,
                  } }
                  className={ `px-1 py-1 ${ isLiked ? 'hover:border-accentPurple' : '' }` }
                  isLoading={ isLoading }
                  onClick={ handleToggleLike }>
    </ActionButton>
  );
};

export default LikeButton;
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hoc/authContext';
import useModal from '@/hooks/useModal';
import ModalNames from '@/constants/modalNames';
import fetchRest from '@/services/common/fetchRest';

const useLike = ({
                   likeableType = 'track', likeableId, setLikesCount = (likesCount) => {
  },
                 }) => {
  const [likeId, setLikeId] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const authModal = useModal(ModalNames.AUTH_MODAL);

  useEffect(() => {
    if (!isAuthenticated) return;

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
        console.error(`Error while fetching like: ${ error }`);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();
  }, [isAuthenticated, likeableType, likeableId]);

  const handleToggleLike = useCallback(async () => {
    if (!isAuthenticated) return authModal.open();

    setIsLoading(true);

    try {
      if (likeId === -1) {
        const response = await fetchRest('/v1/likes', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ likeableType, likeableId }),
        });

        if (response.ok) {
          const data = await response.json();
          setLikeId(data.id);
          setLikesCount(prev => prev + 1);
        }
      } else {
        const response = await fetchRest(`/v1/likes/${ likeId }`, { method: 'DELETE', credentials: 'include' });

        if (response.ok) {
          setLikeId(-1);
          setLikesCount(prev => prev - 1);
        }
      }
    } catch (error) {
      console.error(`Error while toggling like: ${ error }`);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, likeId, likeableType, likeableId, authModal, setLikesCount]);

  return { isLiked: likeId > 0, isLoading, handleToggleLike };
};

export default useLike;
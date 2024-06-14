'use client';

import React, { useEffect, useState } from 'react';
import ActionButton from '@/components/actionButton';
import { useAuth } from '@/hoc/authContext';
import useModal from '@/hooks/useModal';
import ModalNames from '@/app/constants/modalNames';
import fetchRest from '@/utils/common/fetchRest';

const FollowButton = ({ followingId, children }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, userId } = useAuth();
  const authModal = useModal(ModalNames.AUTH_MODAL);

  useEffect(() => {
    if (!isAuthenticated)
      return;

    const fetchData = async () => {
      try {
        const response = await fetchRest(`/v1/users/${ userId }/follow/${ followingId }`, {
          credentials: 'include',
        });

        if (response.ok) {
          setIsFollowed(true);
        }

      } catch (error) {
        console.log(`Ошибки при загрузке лайка ${ error }`);
      } finally {
        setIsLoading(false);
      }

    };

    setIsLoading(true);
    fetchData();
  }, [isAuthenticated, followingId]);

  const handleToggleFollow = async (afterFollow) => {
    if (!isAuthenticated)
      return authModal.open();

    setIsLoading(true);

    try {
      if (!isFollowed) {
        const response = await fetchRest(`/v1/users/${ userId }/follow/${ followingId }`,
          {
            method: 'POST',
            credentials: 'include',
          });

        if (response.ok) {
          setIsFollowed(true);
        }
      } else {
        const response = await fetchRest(`/v1/users/${ userId }/follow/${ followingId }`,
          {
            method: 'DELETE',
            credentials: 'include',
          });

        if (response.ok)
          setIsFollowed(false);
      }
    } catch (error) {
      console.log(`Ошибки при загрузке лайков ${ error }`);
    } finally {
      setIsLoading(false);
      afterFollow();
    }
  };

  return children ? children(isFollowed, isLoading, handleToggleFollow) : (
    <ActionButton iconSrc='/like.svg'
                  icon={ {
                    src: '/like.svg',
                    className: `${ isFollowed ? 'text-accentPurple' : 'text-textDefault' }`,
                    width: 12,
                    height: 12,
                  } }
                  className={ `px-1 py-1 ${ isFollowed ? 'hover:border-accentPurple' : '' }` }
                  isLoading={ isLoading }
                  onClick={ handleToggleFollow }>
    </ActionButton>
  );
};

export default FollowButton;
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hoc/authContext';
import useModal from '@/hooks/useModal';
import ModalNames from '@/app/constants/modalNames';
import fetchRest from '@/utils/common/fetchRest';
import { toast } from 'react-hot-toast';

const FollowButton = ({
                        followingId,
                        followingName = '',
                        setFollowersCount = (followersCount) => {
                        },
                        render,
                      }) => {
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
  }, [isAuthenticated, followingId, userId]);

  const handleToggleFollow = async () => {
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
          setFollowersCount(prev => prev + 1);
          toast.success(`Вы подписались на "${ followingName }"`);
        }
      } else {
        const response = await fetchRest(`/v1/users/${ userId }/follow/${ followingId }`,
          {
            method: 'DELETE',
            credentials: 'include',
          });

        if (response.ok)
          setIsFollowed(false);
        setFollowersCount(prev => prev - 1);
        toast.success(`Вы отписались от "${ followingName }"`);
      }
    } catch (error) {
      console.log(`Ошибки при загрузке лайков ${ error }`);
    } finally {
      setIsLoading(false);
    }
  };

  return render({ isFollowed, isLoading, handleToggleFollow });
};

export default FollowButton;

/*<ActionButton iconSrc='/like.svg'
              icon={ {
                src: '/like.svg',
                className: `${ isFollowed ? 'text-accentPurple' : 'text-textDefault' }`,
                width: 12,
                height: 12,
              } }
              className={ `px-1 py-1 ${ isFollowed ? 'hover:border-accentPurple' : '' }` }
              isLoading={ isLoading }
              onClick={ handleToggleFollow }>
</ActionButton>*/
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ActionButton from '@/components/buttons/actionButton';
import FollowButton from '@/components/buttons/followButtons/followButton';
import React from 'react';
import useModal from '@/hooks/useModal';
import ModalNames from '@/constants/modalNames';

const UserNavigation = ({ isCurrentUser, userName, userPageId }) => {
  const pathname = usePathname();

  const editProfileModal = useModal(ModalNames.EDIT_PROFILE_MODAL);

  const getLinkClass = (path) => {
    return pathname === path
      ? 'mb-[-2px] h-full pb-1 block text-accentPurpleActive border-b-accentPurpleActive box-border border-b-[2px]'
      : 'mb-[-2px] h-full border-b-transparent pb-1 block hover:text-accentPurple hover:border-b-accentPurple hover:border-b-[2px]';
  };

  return (
    <div className='flex justify-between border-b-[1px] border-solid border-b-[#f2] mt-5 mx-6'>
      <div className='flex'>
        <ul className='flex gap-5 text-[#333] text-lg font-medium'>
          <li>
            <Link href={ `/users/${ userPageId }` } className={ getLinkClass(`/users/${ userPageId }`) }>Все</Link>
          </li>
          <li>
            <Link href={ `/users/${ userPageId }/albums` }
                  className={ getLinkClass(`/users/${ userPageId }/albums`) }>Альбомы</Link>
          </li>
          <li>
            <Link href={ `/users/${ userPageId }/playlists` }
                  className={ getLinkClass(`/users/${ userPageId }/playlists`) }>Плейлисты</Link>
          </li>
          <li>
            <Link href={ `/users/${ userPageId }/reposts` }
                  className={ getLinkClass(`/users/${ userPageId }/reposts`) }>Репосты</Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center gap-3 pb-3'>
        {
          isCurrentUser
            ? <ActionButton icon={ { src: '/edit.svg', width: 18, height: 18, className: '' } }
                            onClick={ editProfileModal.open }>Редактировать
              профиль</ActionButton>
            : <FollowButton name={ userName } followingId={ userPageId }>
              Отслеживать
            </FollowButton>
        }
      </div>
    </div>
  );
};

export default UserNavigation;
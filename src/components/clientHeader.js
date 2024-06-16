'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hoc/authContext';
import useModal from '@/hooks/useModal';
import modalNames from '@/app/constants/modalNames';

const ClientHeader = () => {
  const { isAuthenticated, userId } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');
  const authModal = useModal(modalNames.AUTH_MODAL);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:5135/api/v1/users/${ userId }`, { credentials: 'include' });
      const user = await response.json();

      console.log(user);

      setAvatarUrl(user.avatarUrl);
    };

    if (userId) {
      fetchUser();
    }

  }, [userId]);

  return (
    <div className='flex items-center justify-end gap-5'>
      { isAuthenticated ? (
        <>
          <Link href={ '/upload' }>
            <button className='text-[#ccc] hover:text-white ease-in duration-100'>Загрузить</button>
          </Link>
          <button className='text-[#ccc] hover:text-white ease-in duration-100'>Настройки</button>
          <Link href={ `/users/${ userId }` }>
            <Image src={ avatarUrl } width={ 30 } height={ 30 } alt='User Avatar'
                   className='rounded-full cursor-pointer' />
          </Link>
        </>
      ) : (
        <>
          <button
            className='border-[1px] border-[#666] rounded h-[28px] px-2 py-[1px] text-white hover:border-gray-300 ease-in duration-100'
            onClick={ authModal.open }>Войти
          </button>
          <button
            className='bg-accentPurple text-white px-2 py-[1px] rounded h-[28px] hover:bg-accentPurpleActive ease-in duration-100'
            onClick={ authModal.open }>Создать аккаунт
          </button>
        </>
      ) }
    </div>
  );
};

export default ClientHeader;
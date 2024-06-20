import React from 'react';
import fetchRest from '@/utils/common/fetchRest';
import UserNavigation from '@/app/users/[...id]/userNavigation';
import Image from 'next/image';
import ButtonImageUploader from '@/app/users/buttonImageUploader';
import { getAuthUserId, isAuth } from '@/utils/server/auth';

const fetchUser = async (id) => {
  try {
    const response = await fetchRest(`/v1/users/${ id }`, { cache: 'force-cache', next: { tags: ['user'] } });
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const UserPage = async ({ params }) => {
  const userPageId = params.id;
  const user = await fetchUser(userPageId);

  const isCurrentUser = isAuth() && (userPageId === getAuthUserId());

  return (
    <div>
      <div
        className='h-[260px] p-8 relative'
        style={ {
          backgroundImage: `url(${ user.backgroundUrl })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } }
      >
        <div className='absolute top-0 right-0 w-1/5 h-full group/background'>
          { isCurrentUser &&
            <ButtonImageUploader
              className='bg-white absolute right-5 top-5 opacity-0 group-hover/background:opacity-80 transition-opacity duration-300 ease-in-out' /> }
        </div>
        <div className='flex justify-items-start gap-10'>
          <div className='relative cursor-pointer group/avatar'>
            <Image src={ user.avatarUrl } width={ 200 } height={ 200 } className='rounded-[100%] h-[200px] object-cover'
                   alt='avatar' />
            { isCurrentUser && <ButtonImageUploader
              className='bg-white opacity-0 group-hover/avatar:opacity-80 transition-opacity duration-300 ease-in-out absolute bottom-2 left-1/2 transform -translate-x-1/2' /> }
          </div>
          <div className='flex flex-col items-start justify-center gap-3'>
            <h2 className='text-2xl text-white bg-black bg-opacity-80 px-2 py-1'>{ user.name }</h2>
            { user.shortDescription &&
              <h3
                className='text-sm text-white bg-black bg-opacity-80 px-2 py-1'>{ user.shortDescription }</h3> }
          </div>
        </div>
      </div>
      <UserNavigation isCurrentUser={ isCurrentUser } userName={ user.name } userPageId={ userPageId } />
    </div>
  );
};

export default UserPage;
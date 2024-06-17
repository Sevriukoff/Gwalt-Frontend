import React from 'react';
import fetchRest from '@/utils/common/fetchRest';
import UserNavigation from '@/app/users/[...id]/userNavigation';

const fetchUser = async (id) => {
  try {
    const response = await fetchRest(`/v1/users/${ id }`, { cache: 'force-cache' });
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const UserPage = async ({ params }) => {
  const userPageId = params.id;
  const user = await fetchUser(userPageId);

  return (
    <div>
      <div
        className='h-[260px] p-8'
        style={ {
          backgroundImage: `url(${ user.backgroundUrl })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } }
      >
        <div className='flex justify-items-start gap-10'>
          <img className='rounded-[100%] h-[200px] object-cover' src={ user.avatarUrl } width='200px' height='200px'
               alt='avatar' />
          <div className='flex flex-col items-start justify-center gap-3'>
            <h2 className='text-2xl text-white bg-black bg-opacity-80 px-2 py-1'>{ user.name }</h2>
            { user.shortDescription &&
              <h3
                className='text-sm text-white bg-black bg-opacity-80 px-2 py-1'>{ user.shortDescription }</h3> }
          </div>
        </div>
      </div>
      <UserNavigation userName={ user.name } userPageId={ userPageId } />
    </div>
  );
};

export default UserPage;
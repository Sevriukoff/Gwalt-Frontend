import React from 'react';
import IconBtn from '@/components/iconBtn';
import fetchRest from '@/utils/common/fetchRest';
import UserNavigation from '@/app/users/[...id]/userNavigation';

const fetchUser = async (id) => {
  try {
    const response = await fetchRest(`/v1/users/${ id }`);
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
      <h1>{ userPageId }</h1>
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
          <div className='flex flex-col justify-center gap-3'>
            <h2 className='text-2xl text-white bg-black bg-opacity-80 px-2 py-1'>{ user.name }</h2>
            { user.shortDescription &&
              <h3 className='text-sm text-white bg-black bg-opacity-80 px-2 py-1'>{ user.shortDescription }</h3> }
          </div>
        </div>
      </div>
      <div className='flex justify-between border-b-[1px] border-solid border-b-[#f2] mt-5 mx-6'>
        <UserNavigation userPageId={ userPageId } />
        <div className='flex items-center gap-3 pb-3'>
          <IconBtn
            icon={ <img src='https://a-v2.sndcdn.com/assets/images/start-station-ea018c5a.svg' height='21' width='21'
                        alt='play' /> } text={ 'Станция' } textSize={ 14 } fontWeight={ 300 } />
          <IconBtn icon={ <img
            src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8cGF0aCBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTUuNTQyIDEuMTY3YzIuNzcgMCAzLjM4NiAyLjkxNiAyLjE1NSA2LjEyNSAzLjE2OSAxLjMwOCAzLjM4NiAzLjk3NyAzLjM4NiA0Ljk1OEgwYzAtLjk4MS4yMTgtMy42NSAzLjM4Ny00Ljk1OC0xLjIzMi0zLjIxOC0uNjE2LTYuMTI1IDIuMTU1LTYuMTI1em0wIDEuMTY2Yy0xLjU4NCAwLTIuMTI3IDEuNzctMS4wNjYgNC41NDIuMjI2LjU5LS4wNiAxLjI1NC0uNjQ0IDEuNDk1LTEuNTE3LjYyNi0yLjI2MyAxLjU3Mi0yLjUzNyAyLjcxM2g4LjQ5NGMtLjI3NS0xLjE0MS0xLjAyLTIuMDg3LTIuNTM3LTIuNzEzYTEuMTY3IDEuMTY3IDAgMCAxLS42NDQtMS40OTZjMS4wNi0yLjc2NC41MTYtNC41NC0xLjA2Ni00LjU0em02LjQxNC0uNTgzYy4xNyAwIC4yOTQuMTMuMjk0LjI5MlYzLjVoMS40NThjLjE1NyAwIC4yOTIuMTMyLjI5Mi4yOTR2LjU3OGMwIC4xNy0uMTMuMjk1LS4yOTIuMjk1SDEyLjI1djEuNDU4YS4yOTYuMjk2IDAgMCAxLS4yOTQuMjkyaC0uNTc4YS4yODkuMjg5IDAgMCAxLS4yOTUtLjI5MlY0LjY2N0g5LjYyNWEuMjk2LjI5NiAwIDAgMS0uMjkyLS4yOTV2LS41NzhjMC0uMTcuMTMxLS4yOTQuMjkyLS4yOTRoMS40NThWMi4wNDJjMC0uMTU3LjEzMi0uMjkyLjI5NS0uMjkyaC41Nzh6Ii8+Cjwvc3ZnPgo='
            height='16' width='16' alt='play' /> } text={ 'Отслеживать' } textSize={ 14 } fontWeight={ 300 }
                   isOutlined={ false } />
          <IconBtn icon={ <img src='https://a-v2.sndcdn.com/assets/images/share-e2febe1d.svg' height='18' width='18'
                               alt='play' /> } text={ 'Поделиться' } textSize={ 14 } fontWeight={ 300 } />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
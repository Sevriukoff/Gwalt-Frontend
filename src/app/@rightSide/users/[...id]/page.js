import React from 'react';
import fetchRest from '@/utils/common/fetchRest';

const fetchUser = async (id) => {
  try {
    const response = await fetchRest(`/v1/users/${ id }?includes=Albums;Albums.Tracks&withStats=true`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
const UserPageRightSide = async ({ params }) => {
  const userPageId = params.id;
  const user = await fetchUser(userPageId);

  return (
    <div>
      <div className='flex gap-3 text-xl text-[#999] leading-5'>
        <div className='border-r pr-10'>
          <h3 className='text-[12px]'>Отслеживают</h3>
          <span>{ user.followersCount }</span>
        </div>
        <div className='border-r pr-10'>
          <h3 className='text-[12px]'>Отслеживает</h3>
          <span>{ user.followingCount }</span>
        </div>
        <div className=''>
          <h3 className='text-[12px]'>Треки</h3>
          <span>{ user.totalTracks }</span>
        </div>
      </div>
      <p className='mt-3 text-sm text-[#999]'>{ user.description }</p>
      <ul className='flex flex-col gap-1 text-[12px] text-[#999] mt-3'>
        <li className='flex gap-1'>
          <img
            src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c2gtd2Vic2l0ZS0xNi1jb2xvcjwvdGl0bGU+PHBhdGggZD0iTTggMkM0LjY4OCAyIDIgNC42ODggMiA4czIuNjg4IDYgNiA2IDYtMi42ODggNi02LTIuNjg4LTYtNi02em0tLjYgMTAuNzU4QTQuNzkzIDQuNzkzIDAgMCAxIDMuMiA4YzAtLjM3Mi4wNDgtLjcyNi4xMjYtMS4wNzRMNi4yIDkuOHYuNmMwIC42Ni41NCAxLjIgMS4yIDEuMnYxLjE1OHptNC4xNC0xLjUyNGExLjE5IDEuMTkgMCAwIDAtMS4xNC0uODM0aC0uNlY4LjZjMC0uMzMtLjI3LS42LS42LS42SDUuNlY2LjhoMS4yYy4zMyAwIC42LS4yNy42LS42VjVoMS4yYy42NiAwIDEuMi0uNTQgMS4yLTEuMnYtLjI0NmMxLjc1OC43MTQgMyAyLjQzNiAzIDQuNDQ2IDAgMS4yNDgtLjQ4IDIuMzgyLTEuMjYgMy4yMzR6IiBmaWxsPSIjNjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=' />
          <a href='#'>web site</a>
        </li>
        <li className='flex gap-1'>
          <img
            src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c2gtdHdpdHRlci1ncmF5PC90aXRsZT48cGF0aCBkPSJNMTIuNzI0IDQuMTQ3YTQuMDkgNC4wOSAwIDAgMS0xLjMwMy40OUEyLjA3MSAyLjA3MSAwIDAgMCA5LjkyNCA0Yy0xLjEzMyAwLTIuMDUyLjkwMy0yLjA1MiAyLjAyIDAgLjE1Ny4wMTguMzEzLjA1My40NmE1Ljg2IDUuODYgMCAwIDEtNC4yMjktMi4xMSAxLjk4IDEuOTggMCAwIDAtLjI3OCAxLjAxN2MwIC43LjM2MyAxLjMxNi45MTMgMS42OGEyLjA4IDIuMDggMCAwIDEtLjkyOS0uMjU0di4wMjdjMCAuOTc3LjcwNyAxLjc5MyAxLjY0NiAxLjk4YTIuMDY4IDIuMDY4IDAgMCAxLS45MjcuMDMzIDIuMDUgMi4wNSAwIDAgMCAxLjkxNyAxLjQwNCA0LjE2OSA0LjE2OSAwIDAgMS0yLjU0OS44NjNjLS4xNjYgMC0uMzI5LS4wMS0uNDktLjAyN0E1Ljg3NiA1Ljg3NiAwIDAgMCA2LjE0NSAxMmMzLjc3NCAwIDUuODM3LTMuMDc3IDUuODM3LTUuNzQ3IDAtLjA4Ni0uMDAxLS4xNzMtLjAwNS0uMjYuNC0uMjg2Ljc0OS0uNjQgMS4wMjMtMS4wNDYtLjM2Ny4xNi0uNzYzLjI3LTEuMTc4LjMxNi40MjQtLjI0Ni43NDktLjY0My45MDItMS4xMTYiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==' />
          <a href='#'>Twitter</a>
        </li>
        <li className='flex gap-1'>
          <img
            src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c2gteXQtZ3JheTwvdGl0bGU+PHBhdGggZD0iTTEuMTQgNS41MjVzLjEzNy0xLjAwOC41NTYtMS40NTRjLjUzMi0uNTg0IDEuMjMzLS41NjYgMS41NDQtLjYyN0M0LjM2IDMuMzMgOCAzLjI5NyA4IDMuMjk3czIuOTQyLjAwNCA0LjkuMTUyYy4yNzUuMDM1Ljg3MS4wMzcgMS40MDMuNjIyLjQyLjQ0NS41NTcgMS40NTUuNTU3IDEuNDU1UzE1IDYuNzEzIDE1IDcuOTAxdjEuMTUzYzAgMS4xODgtLjE0IDIuMzc0LS4xNCAyLjM3NHMtLjEzNiAxLjAxLS41NTYgMS40NTVjLS41MzMuNTg1LTEuMTMuNTg3LTEuNDA0LjYyMi0xLjk1OC4xNDgtNC45LjE1Mi00LjkuMTUycy0zLjY0LS4wMzQtNC43Ni0uMTQ2Yy0uMzEyLS4wNjItMS4wMTItLjA0NC0xLjU0NC0uNjI3LS40Mi0uNDQ3LS41NTYtMS40NTUtLjU1Ni0xLjQ1NVMxIDEwLjI0MiAxIDkuMDU1VjcuOWMwLTEuMTg3LjE0LTIuMzc1LjE0LTIuMzc1em01LjQxNS43NTdsMy43ODIgMi4wNjctMy43OCAyLjA1My0uMDAzLTQuMTJ6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=' />
          <a href='#'>Youtube</a>
        </li>
      </ul>
    </div>
  );
};

export default UserPageRightSide;
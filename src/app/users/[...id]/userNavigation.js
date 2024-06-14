'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserNavigation = ({ userPageId }) => {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    return pathname === path ? 'mb-[-2px] pb-1 block text-accentPurpleActive border-b-accentPurpleActive box-border border-b-[2px]' : 'mb-[-2px] border-b-transparent pb-1 block hover:text-accentPurple hover:border-b-accentPurple hover:border-b-[2px]';
  };

  return (
    <div className='flex justify-between border-b-[1px] border-solid border-b-[#f2] mt-5 mx-6'>
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
  );
};

export default UserNavigation;
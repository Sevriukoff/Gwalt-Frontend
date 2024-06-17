'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderLeftNavigation = () => {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    return pathname === path
      ? 'text-center box-border bg-[#111] block w-[104px] text-white py-3 hover:text-white ease-in duration-100'
      : 'text-center box-border block w-[104px] text-[#ccc] py-3 hover:text-white ease-in duration-100';
  };

  return (
    <ul className='flex divide-x divide-[#111]'>
      <li>
        <Link
          className={ getLinkClass('/') }
          href='/'>
          Главная
        </Link>
      </li>
      <li>
        <Link
          className={ getLinkClass('/feed') }
          href='/feed'>
          Лента
        </Link>
      </li>
      <li>
        <Link
          className={ getLinkClass('/library') }
          href='/library'>
          Фонотека
        </Link>
      </li>
    </ul>
  );
};

export default HeaderLeftNavigation;
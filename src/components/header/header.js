import Link from 'next/link';
import SearchBar from '@/components/searchBar';
import Image from 'next/image';
import HeaderLeftNavigation from '@/components/header/headerLeftNavigation';
import HeaderRightNavigation from '@/components/header/headerRightNavigation';

const Header = async () => {
  return (
    <header className='bg-[#333] border-b-2 border-b-[#ccc] font-light text-sm'>
      <div className='max-w-[1387px] mx-auto my-0'>
        <nav className='grid grid-cols-[auto_1.2fr_1fr] gap-3'>
          <div className='flex'>
            <div
              className='bg-accentPurple hover:bg-[#262626] transition-colors duration-300 ease-in-out flex items-center px-2'>
              <Link href='/' className='my-auto mt-[2px] relative flex items-center logo-container'>
                <Image src='/logo-base-white.svg' alt='logo' width={ 120 } height={ 30 } className='mt-[2px]' />
                <Image src='/happy-base-white.svg' alt='logo' width={ 120 } height={ 30 } className='logo logo-happy' />
                <Image src='/strange-base-white.svg' alt='logo' width={ 120 } height={ 30 }
                       className='logo logo-strange' />
              </Link>
            </div>
            <HeaderLeftNavigation />
          </div>
          <div className='my-auto relative'>
            <SearchBar />
            <button
              className='absolute right-[13px] top-[7px] w-[15px] h-[15px] bg-[url(https://a-v2.sndcdn.com/assets/images/search-dbfe5cbb.svg)]' />
          </div>
          <HeaderRightNavigation />
        </nav>
      </div>
    </header>
  );
};

export default Header;
'use client'

import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import SearchBar from "@/components/searchBar";

const Header = () => {

    return (
        <header className='bg-[#333] border-b-2 border-b-[#ccc] font-light text-sm'>
            <div className='max-w-[1140px] mx-auto my-0'>
                <nav className='grid grid-cols-[auto_1.2fr_1fr] gap-3'>
                    <div className='flex'>
                        <div className='bg-black flex items-center px-2'>
                            <a className='my-auto'>
                                <img src='/logo.svg' alt='logo' width='120px'/>
                            </a>
                        </div>
                        <ul className='flex divide-x divide-[#111]'>
                            <li><Link className='text-center box-border block w-[104px] text-[#ccc] py-3 hover:text-white ease-in duration-100' href="/">Главная</Link></li>
                            <li><Link className='text-center box-border block w-[104px] text-[#ccc] py-3 hover:text-white ease-in duration-100' href="/feed">Лента</Link></li>
                            <li><Link className='text-center box-border block w-[104px] text-[#ccc] border-r-black border-r-[1px] py-3 hover:text-white ease-in duration-100' href="/library">Фонотека</Link></li>
                        </ul>
                    </div>
                    <div className='my-auto relative'>
                        <SearchBar/>
                        <button className='absolute right-[13px] top-[7px] w-[15px] h-[15px] bg-[url(https://a-v2.sndcdn.com/assets/images/search-dbfe5cbb.svg)]'/>
                    </div>
                    <div className={`flex items-center gap-5`}>
                        <button className='text-[#ccc] hover:text-white ease-in duration-100'>Загрузить</button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
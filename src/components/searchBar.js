'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fetchRest from '@/services/common/fetchRest';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
  const [result, setResult] = useState({ albums: [], tracks: [], users: [] });

  const dropdownPanelRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const onClick = (e) => {
      if (!dropdownPanelRef.current?.contains(e.target) && e.target !== inputRef.current) {
        setIsDropdownEnabled(false);
      }
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);

  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(query.toLowerCase());
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchData = async (value) => {
    const response = await fetchRest(`/v1/search?query=${ query }`, { method: 'GET' });
    const data = await response.json();

    setResult(data);
  };

  const handleChange = (value) => {
    setQuery(value);
  };

  return (
    <div className='relative'>
      <input
        className='rounded w-full h-[27px] px-2 bg-[#e5e5e5]'
        placeholder='Поиск артистов, треков, альбомов'
        value={ query }
        ref={ inputRef }
        onChange={ (e) => handleChange(e.target.value) }
        onClick={ (e) => {
          e.stopPropagation();
          setIsDropdownEnabled(true);
        } }
      />
      {
        isDropdownEnabled && (result.users?.length === 0 || result.tracks?.length === 0 || result.albums?.length === 0) &&
        (
          <div
            className='absolute z-10 bg-white w-full flex flex-col shadow rounded max-h-[250px] overflow-y-scroll mt-1 gap-3 p-5'
            ref={ dropdownPanelRef }
            onClick={ (e) => e.stopPropagation() }
          >
            <Link href={ `/search?query=${ query }` }>
              <span>Все результаты поиска по запросу «{ query }»</span>
            </Link>
            {
              result.users?.length > 0 && (
                <div className='uppercase text-black font-light tracking-wider'>Пользователи:
                  {
                    result.users.map((user) => (
                      <Link href={ `/users/${ user.id }` }>
                        <div className='py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100'
                             key={ user.id }>
                          <div className='relative w-10 h-10'>
                            <Image src={ user.avatarUrl } layout={ 'fill' } alt='cover'
                                   className='object-cover' />
                          </div>
                          <span className='text-sm font-normal'>{ user.name }</span>
                        </div>
                      </Link>
                    ))
                  }
                </div>
              )
            }
            {
              result.albums?.length > 0 && (
                <div>
                  <p className='uppercase text-black font-light tracking-wider'>Альбомы:</p>
                  {
                    result.albums.map((album) => (
                      <Link href={ `/albums/${ album.id }` }>
                        <div className='flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100' key={ album.id }>
                          <Image src={ album.coverUrl } alt='cover' width={ 40 } height={ 40 } />
                          <div>
                            <p className='text-sm font-normal'>{ album.title }</p>
                            {
                              album.authors.map((author, index) => (
                                <span className='text-xs text-gray-500 font-normal' key={ index }>
                                { author }
                              </span>
                              ))
                            }
                          </div>
                        </div>
                      </Link>
                    ))
                  }
                </div>
              )
            }
            {
              result.tracks?.length > 0 && (
                <div>
                  <p className='uppercase text-black font-light tracking-wider'>Треки:</p>
                  {
                    result.tracks.map((track) => (
                      <div className='flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100' key={ track.id }>
                        <Image src={ track.coverUrl } alt='cover' width={ 40 } height={ 40 } />
                        <div>
                          <p className='text-sm font-normal'>{ track.title }</p>
                          {
                            track.authors.map((author, index) => (
                              <span className='text-xs text-gray-500 font-normal' key={ index }>
                                { author }
                              </span>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default SearchBar;
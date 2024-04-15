'use client'

import React, {useEffect, useRef, useState} from 'react';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
    const [result, setResult] = useState({});

    const dropdownPanelRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        const onClick = (e) => {
            if (e.target !== dropdownPanelRef.current && e.target !== inputRef.current)
                setIsDropdownEnabled(false);
        }

        document.addEventListener('click', onClick);

        return () => document.removeEventListener('click', onClick);

    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchData(input.toLowerCase());
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [input]);

    const fetchData = (value) => {
        Promise.all([
            fetch(`/api/tracks`).then((response) => response.json()),
            fetch(`/api/users`).then((response) => response.json())
        ]).then(([tracks, users]) => {
            const resultsTracks = tracks.filter((track) =>
                track && track.Title && track.Title.toLowerCase().includes(value)
            );
            const resultsUsers = users.filter((user) =>
                user && user.Username && user.Username.toLowerCase().includes(value)
            );

            setResult({
                artists: resultsUsers,
                tracks: resultsTracks
            });
        });
    };

    const handleChange = (value) => {
        setInput(value);
    };

    return (
        <div className='relative'>
            <input
                className='rounded w-full h-[27px] px-2 bg-[#e5e5e5]'
                placeholder='Поиск артистов, треков, альбомов'
                value={input}
                ref={inputRef}
                onChange={(e) => handleChange(e.target.value)}
                onClick={ (e) => {
                    e.stopPropagation();
                    setIsDropdownEnabled(true);
                }}
            />
            {
                isDropdownEnabled &&
                (
                    <div className='absolute z-10 bg-white w-full flex flex-col shadow rounded max-h-[250px] overflow-y-scroll mt-1 gap-1.5'
                                           ref={dropdownPanelRef}
                                           onClick={ (e) => e.stopPropagation() }
                    >
                        <a href='/search?text='>
                            <span>Все результаты поиска по запросу «{input}»</span>
                        </a>
                        <div className='px-3 py-2 uppercase text-black tracking-wider'>Артисты:</div>
                        {
                            result.artists?.map((item) => (
                                <a href={`/users/${item.UserID}`}>
                                    <div className='px-3 py-2 cursor-pointer hover:bg-gray-100' key={item.UserID}>
                                        {item.Username}
                                    </div>
                                </a>
                            ))
                        }
                        <div className='px-3 py-2 uppercase text-black tracking-wider'>Треки:</div>
                        {
                            result.tracks?.map((item) => (
                                <div className='px-3 py-2 cursor-pointer hover:bg-gray-100' key={item.TrackID}>
                                    {item.Title}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default SearchBar;
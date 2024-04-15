import React from 'react';

const SearchResults = ({ results }) => {
    return (
        <div className='absolute z-10 bg-white w-full flex flex-col shadow rounded max-h-[250px] overflow-y-scroll mt-1 gap-1.5'>
            <a href='/search?text='/>
            <div className='px-3 py-2 uppercase text-black tracking-wider'>Артисты:</div>
            {
                results.artists?.map((item) => (
                    <div className='px-3 py-2 cursor-pointer hover:bg-gray-100' key={item.UserID}>
                        {item.Username}
                    </div>
                ))
            }
            <div className='px-3 py-2 uppercase text-black tracking-wider'>Треки:</div>
            {
                results.tracks?.map((item) => (
                    <div className='px-3 py-2 cursor-pointer hover:bg-gray-100' key={item.TrackID}>
                        {item.Title}
                    </div>
                ))
            }
        </div>
    );
};

export default SearchResults;
import React from 'react';

const Loading = () => {
  return (
    <div
      className='grid grid-cols-[1fr_auto] gap-8 bg-gradient-to-r from-[#8BAAAA] to-[#AE8B9C] text-white p-6'>
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className='flex flex-col gap-3'>
              <div
                className='bg-black/30 px-2 py-1 rounded w-[250px] h-[36px] animate-pulse' />
              <div
                className='bg-black/30 px-2 py-1 rounded w-[200px] h-[27px] animate-pulse' />
            </div>
          </div>

          <div className='flex flex-col items-end space-y-2'>
            <div
              className='bg-black/30 px-2 py-1 rounded w-[150px] h-[27px] animate-pulse' />
            <div
              className='bg-black/30 px-2 py-1 rounded w-[200px] h-[36px] animate-pulse' />
          </div>

        </div>

        <div className='bg-black/30 w-[100px] h-[100px] rounded-full animate-pulse' />
      </div>

      <div className='w-[340px] h-[340px] bg-black/30 rounded animate-pulse' />
    </div>
  );
};

export default Loading;
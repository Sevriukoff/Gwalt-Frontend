'use client';

import React, { useState } from 'react';
import WaveForm from '@/components/waveForm';
import CoverImage from '@/components/coverImage';
import LikeButton from '@/components/likeButtons/likeButton';

const Track = ({
                 id = 0,
                 author = '',
                 title = '',
                 trackDuration = 0,
                 imgUrl = '',
                 date = '',
                 genres = [],
                 like = 0,
                 share = 0,
                 listensCount = 0,
                 comment = 0,
                 peaks = [],
               }) => {

  const [likesCount, setLikesCount] = useState(like);

  const getStatusImg = () => {
    if (listensCount > 100000) {
      return '/top-charts.svg';
    } else if (listensCount > 50000) {
      return '/medium-charts.svg';
    } else {
      return '/low-charts.svg';
    }
  };

  return (
    <div className='flex gap-4 text-[#333]'>
      <CoverImage coverUrl={ imgUrl } clasName='min-w-[160px] min-h-[160px] text-transparent' />
      <div className='flex 0 flex-col justify-between w-full pt-2'>
        <div className='flex w-full'>
          <div className='flex items-center justify-center rounded-full bg-[#9388D8] w-[36px] h-[36px]'>
            <img src={ getStatusImg() } alt='status' />
          </div>
          <div className='flex flex-col gap-1 ml-2.5 w-full'>
            <div className='flex justify-between'>
              <p className='text-[#999] font-light text-[12px] leading-1'>{ author }</p>
              <p className='text-[#999] font-light text-[12px] leading-1'>{ date }</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-[15px] leading-3 '>{ title }</p>
              <div className='flex gap-3'>
                {
                  genres.map(
                    x => <span className='text-xs text-white bg-[#999] font-light rounded-full px-2 py-1'>#{ x }</span>,
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>
          <WaveForm trackId={ id } peaks={ peaks } duration={ trackDuration } />
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-3'>
            <LikeButton likeableType='track' likeableId={ id } setLikesCount={ setLikesCount }>
              { likesCount }
            </LikeButton>
          </div>

          <div className='flex items-center text-[11px] text-[#999] gap-3'>
            <div className='flex gap-[2px]'>
              <img
                src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX3BsYXkgNDwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnMvPg0KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPg0KICAgICAgICA8ZyBpZD0ic3RhdHNfcGxheS0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICAgICAgICA8cGF0aCBkPSJNNCwxMyBMNCwzIEwxMyw4IEw0LDEzIFoiIGlkPSJzdGF0c19wbGF5LTMiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiLz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg0K'
                height='12' width='16' alt='play' />
              <span>{ listensCount }</span>
            </div>
            <div className='flex gap-[2px]'>
              <img
                src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2NvbW1lbnQ8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzLz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPGcgaWQ9InN0YXRzX2NvbW1lbnQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICAgICAgICA8cGF0aCBkPSJNNC45OTk2MTQ5OCwzIEMzLjg5NTI1ODEyLDMgMywzLjg4NjU1NDg0IDMsNS4wMDU5MTkwNSBMMyw3Ljk5NDA4MDk1IEMzLDkuMTAxOTE5NDUgMy44ODc0MzMyOSwxMCA0Ljk5OTYxNDk4LDEwIEwxMS4wMDAzODUsMTAgQzEyLjEwNDc0MTksMTAgMTMsOS4xMTM0NDUxNiAxMyw3Ljk5NDA4MDk1IEwxMyw1LjAwNTkxOTA1IEMxMywzLjg5ODA4MDU1IDEyLjExMjU2NjcsMyAxMS4wMDAzODUsMyBMNC45OTk2MTQ5OCwzIFogTTUsMTAgTDUsMTMgTDgsMTAgTDUsMTAgWiIgaWQ9IlJlY3RhbmdsZS00MiIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCIvPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo='
                height='12' width='16' alt='play' />
              <span>{ comment }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
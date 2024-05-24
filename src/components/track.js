"use client"

import React, {useEffect, useState} from 'react';
import IconBtn from "@/components/iconBtn";

const Track = ({
        id = 0,
        author = '',
        title = '',
        trackDuration= 0,
        imgUrl = '',
        audioUrl = '',
        date = 'date',
        genres = [],
        like = 0,
        share = 0,
        playCount = 0,
        comment = 0
    }) => {

    let dateObj = new Date(date);

    let day = dateObj.getUTCDate().toString().padStart(2, '0');
    let month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
    let year = dateObj.getUTCFullYear();

    let formattedDate = `${day}.${month}.${year}`;

    const getStatusImg = () => {
        if (playCount > 100000){
            return '/top-charts.svg'
        }
        else if (playCount > 50000){
            return '/medium-charts.svg'
        }
        else {
            return '/low-charts.svg'
        }
    }

    return (
        <div className='flex gap-4 text-[#333] group'>
            <div className='group-hover:pl-5 ease-linear duration-100'>
                <img className='min-w-[160px] max-h-[160px]' src={imgUrl} width='160px' alt='track'/>
            </div>
            <div className='flex flex-col justify-between w-full pt-2'>
                <div className='flex w-full'>
                    <a className='flex items-center justify-center rounded-full bg-[#9388D8] w-[36px] h-[36px]'>
                        <img src={getStatusImg()} alt='status'/>
                    </a>
                    <div className='inline ml-3 w-full'>
                        <div className='flex justify-between'>
                            <p className='text-[#999] font-light text-[12px] leading-1'>{author}</p>
                            <p className='text-[#999] font-light text-[12px] leading-1'>{formattedDate}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-[15px] leading-3'>{title}</p>
                            <div className='flex gap-3'>
                                {genres.map(g => <span className='text-xs text-white bg-[#999] font-light rounded-full px-2 py-1'>#{g}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-3 text-[15px]'>
                    <audio className='h-[45px] w-full rounded bg-gray-100' controls={true} src={audioUrl} type='audio/mp3'/>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                        <IconBtn icon={<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2xpa2VzX2dyZXk8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzLz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPHBhdGggZD0iTTEwLjgwNDk4MTgsMyBDOC43ODQ3MTU3OSwzIDguMDAwNjUyODUsNS4zNDQ4NjQ4NiA4LjAwMDY1Mjg1LDUuMzQ0ODY0ODYgQzguMDAwNjUyODUsNS4zNDQ4NjQ4NiA3LjIxMjk2Mzg3LDMgNS4xOTYwNDQ5NCwzIEMzLjQ5NDMxMzE4LDMgMS43NDgzNzQsNC4wOTU5MjY5NCAyLjAzMDA4OTk2LDYuNTE0MzA1MzIgQzIuMzczNzI3NjUsOS40NjY3Mzc3NSA3Ljc1NDkxOTE3LDEyLjk5Mjg3MzggNy45OTMxMDk1OCwxMy4wMDEwNTU3IEM4LjIzMTI5OTk4LDEzLjAwOTIzNzggMTMuNzMwOTgyOCw5LjI3ODUzNzggMTMuOTgxNDU5LDYuNTAxMjQwNSBDMTQuMTg3ODY0Nyw0LjIwMDk3MDIzIDEyLjUwNjcxMzYsMyAxMC44MDQ5ODE4LDMgWiIgaWQ9IkltcG9ydGVkLUxheWVycyIgZmlsbD0icmdiKDM0LCAzNCwgMzQpIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KPC9zdmc+DQo=' width='16px' alt='play'/>} text={like}/>
                        <IconBtn icon={<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICA8dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT4NCiAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogIDxkZWZzLz4NCiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQogICAgPGcgaWQ9InJlcG9zdC0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigzNCwgMzQsIDM0KSI+DQogICAgICA8cGF0aCBkPSJNMiw2IEwyLDExLjAwMDM4NSBDMiwxMi4xMDQ3NDE5IDIuOTAxOTUwMzYsMTMgNC4wMDg1MzAyLDEzIEwxMC45OTU3MzQ5LDEzIEwxMC45OTU3MzQ5LDEzIEwxMCwxMyBMMTAsMTMgTDgsMTEgTDQsMTEgTDQsNiBMMy41LDYgTDYsNiBMMywzIEwwLDYgTDIsNiBMMiw2IFogTTYsMyBMNS4wMDQyNjUxLDMgTDExLjk5MTQ2OTgsMyBDMTMuMDk4MDQ5NiwzIDE0LDMuODk1MjU4MTIgMTQsNC45OTk2MTQ5OCBMMTQsMTAgTDEyLDEwIEwxMiw1IEw4LDUgTDYsMyBaIE0xNiwxMCBMMTAsMTAgTDEzLDEzIEwxNiwxMCBaIiBpZD0iUmVjdGFuZ2xlLTQzIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg==' width='16px' alt='play'/>} text={share}/>
                        <IconBtn icon={<img src='https://a-v2.sndcdn.com/assets/images/share-e2febe1d.svg' width='16px' alt='play'/>} text={'share'}/>
                        <IconBtn icon={<img src='https://a-v2.sndcdn.com/assets/images/copylink-f0c85b1d.svg' width='16px' alt='play'/>} text={'copy link'}/>
                        <IconBtn icon={<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0cHgiIGhlaWdodD0iNHB4IiB2aWV3Qm94PSIwIDAgMTQgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8dGl0bGU+bW9yZTwvdGl0bGU+CiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSI3IiBjeT0iMiIgcj0iMiIvPgogICAgPGNpcmNsZSBjeD0iMTIiIGN5PSIyIiByPSIyIi8+CiAgPC9nPgo8L3N2Zz4K' width='16px' alt='play'/>} text={'more'}/>
                    </div>

                    <div className='flex items-center text-[11px] text-[#999] gap-3'>
                        <div className='flex gap-[2px]'>
                            <img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX3BsYXkgNDwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnMvPg0KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPg0KICAgICAgICA8ZyBpZD0ic3RhdHNfcGxheS0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICAgICAgICA8cGF0aCBkPSJNNCwxMyBMNCwzIEwxMyw4IEw0LDEzIFoiIGlkPSJzdGF0c19wbGF5LTMiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiLz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg0K' height='12' width='16' alt='play'/>
                            <span>{playCount}</span>
                        </div>
                        <div className='flex gap-[2px]'>
                            <img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2NvbW1lbnQ8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzLz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPGcgaWQ9InN0YXRzX2NvbW1lbnQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICAgICAgICA8cGF0aCBkPSJNNC45OTk2MTQ5OCwzIEMzLjg5NTI1ODEyLDMgMywzLjg4NjU1NDg0IDMsNS4wMDU5MTkwNSBMMyw3Ljk5NDA4MDk1IEMzLDkuMTAxOTE5NDUgMy44ODc0MzMyOSwxMCA0Ljk5OTYxNDk4LDEwIEwxMS4wMDAzODUsMTAgQzEyLjEwNDc0MTksMTAgMTMsOS4xMTM0NDUxNiAxMyw3Ljk5NDA4MDk1IEwxMyw1LjAwNTkxOTA1IEMxMywzLjg5ODA4MDU1IDEyLjExMjU2NjcsMyAxMS4wMDAzODUsMyBMNC45OTk2MTQ5OCwzIFogTTUsMTAgTDUsMTMgTDgsMTAgTDUsMTAgWiIgaWQ9IlJlY3RhbmdsZS00MiIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCIvPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=' height='12' width='16' alt='play'/>
                            <span>{comment}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Track;
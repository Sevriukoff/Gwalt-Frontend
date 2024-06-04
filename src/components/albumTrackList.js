'use client'

import Image from "next/image";
import {PlayButton} from "@/components/playButton";
import {ExplicitContent} from "@/components/explicitContent";
import {ActionButton} from "@/components/actionButton";
import MaskedIcon from "@/components/maskedIcon";
import React from "react";
import useOnPlay from "@/hooks/useOnPlay";

export const AlbumTrackList = ({ coverUrl = '', tracks = [] }) => {
  const onPlay = useOnPlay(tracks);

  return (
      <ul>
        { tracks.map((track, index) => (
            <li
                key={ track.id }
                className="flex justify-between items-center py-2 border-b border-gray-200 group hover:bg-gray-100 hover:cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <div className='relative'>
                  <Image src={ coverUrl } alt={ `Cover for ${ track.title }` } width={ 30 } height={ 30 }
                         className="object-cover"/>
                  <PlayButton iconWidth={ 10 } iconHeight={ 10 }
                              className='hidden group-hover:flex p-1.5 absolute left-1 top-1'
                              onClick={() => {
                                console.log(track.id);
                                onPlay(track.id);
                              }}/>
                </div>
                <span>{ index + 1 }. { track.title }</span>
                { track.isExplicit && <ExplicitContent/> }
              </div>
              <div className="flex items-center space-x-2">
                <div className='hidden group-hover:flex gap-2'>
                  <ActionButton iconSrc='/like.svg' className='px-1 py-1' iconWidth={ 12 } iconHeight={ 12 }/>
                  <ActionButton iconSrc='/repost.svg' className='px-1 py-1' iconWidth={ 16 } iconHeight={ 12 }/>
                  <ActionButton iconSrc='/comment.svg' className='px-1 py-1' iconWidth={ 12 } iconHeight={ 12 }/>
                </div>
                <div>
                  <MaskedIcon src='/play.svg' alt='like' className='w-3 h-3 text-gray-300 mr-2'/>
                  <span className="text-gray-600">{ track.listensCount }</span>
                </div>
              </div>
            </li>
        )) }
      </ul>
  )
}
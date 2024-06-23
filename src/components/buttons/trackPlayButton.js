'use client';

import React, { useState } from 'react';
import useMusicPlayer from '@/hooks/useMusicPlayer';
import { twMerge } from 'tailwind-merge';
import ActionButton from '@/components/buttons/actionButton';

const TrackPlayButton = ({
                           iconWidth = 20,
                           iconHeight = 20,
                           className = '',
                           containerClassName = '',
                           preload = false,
                           children: soundBar,
                           disabled,
                           trackId,
                           onClick = () => {
                           },
                           ...props
                         }) => {

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const setActiveTrackId = useMusicPlayer(state => state.setId);
  const activeTrackId = useMusicPlayer(state => state.activeId);
  const isPlayingActiveTrack = useMusicPlayer(state => state.isPlaying);
  const setIsPlayingActiveTrack = useMusicPlayer(state => state.setIsPlaying);

  const shouldBeActive = trackId === activeTrackId;
  const isInternalPlaying = shouldBeActive && isPlayingActiveTrack;

  const onPlayClick = () => {
    if (onClick) {
      onClick();
    }

    if (!shouldBeActive) {
      setActiveTrackId(trackId);
      return;
    }

    if (isInternalPlaying) {
      setIsPlayingActiveTrack(false);
    } else {
      setIsPlayingActiveTrack(true);
    }
  };

  const containerClasses = twMerge(
    'flex items-center justify-center bg-accentPurple/30 w-full h-full transition duration-300 group-hover:opacity-100',
    isButtonHovered ? 'opacity-100' : 'opacity-0',
    isInternalPlaying && 'opacity-100',
    containerClassName);

  return (
    <div className={ containerClasses }>
      <ActionButton
        onMouseEnter={ () => setIsButtonHovered(true) }
        onMouseLeave={ () => setIsButtonHovered(false) }
        className={
          `${ className }
         relative gap-5 rounded-full `
        }
        isOutline={ true }
        icon={ (!isInternalPlaying || isButtonHovered) && {
          src: isButtonHovered && isInternalPlaying ? '/pause.svg' : '/play.svg',
          alt: 'play',
          width: iconWidth,
          height: iconHeight,
          className: 'relative z-10',
        } }
        onClick={ onPlayClick }
        { ...props }
      >
        {
          (isInternalPlaying && !isButtonHovered) && soundBar
        }
      </ActionButton>
    </div>
  );
};

export default TrackPlayButton;
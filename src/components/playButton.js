'use client';

'use client';

import React, { useEffect, useState } from 'react';
import ActionButton from '@/components/buttons/actionButton';
import useMusicPlayer from '@/hooks/useMusicPlayer';
import useOnPlay from '@/hooks/useOnPlay';
import { twMerge } from 'tailwind-merge';
import { useLazyTracksIds } from '@/services/client/queries/trackQueries';

export const PlayButton = ({
                             iconWidth = 20,
                             iconHeight = 20,
                             className = '',
                             containerClassName = '',
                             whenPlayingShowBars = true,
                             whenPlayingShowIcon = true,
                             preload = false,
                             children: soundBar,
                             disabled,
                             onClick,
                             fetchTracksUrl,
                             ...props
                           }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { data: tracksIds = [], isMutating, trigger } = useLazyTracksIds(fetchTracksUrl);
  const { activeId, isPlaying, setIsPlaying } = useMusicPlayer((state) => ({
    activeId: state.activeId,
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
  }));
  const onPlay = useOnPlay(tracksIds);

  useEffect(() => {
    if (preload && tracksIds.length === 0) {
      trigger();
    }
  }, []);

  const shouldBeActive = tracksIds.includes(activeId);
  const isInternalPlaying = shouldBeActive && isPlaying;

  console.log('render');

  const handleMouseEnter = async () => {
    if (!isHovered && !isMutating && tracksIds.length === 0) {
      setIsHovered(true);
      await trigger();
    } else {
      setIsHovered(true);
    }
  };

  const onPlayClick = () => {
    if (onClick) onClick();

    if (isMutating || tracksIds.length === 0) return;

    if (!shouldBeActive) {
      onPlay(tracksIds[0]);
      return;
    }

    if (isInternalPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const containerClasses = twMerge(
    'flex items-center justify-center bg-accentPurple/30 w-full h-full transition duration-300 group-hover:opacity-100',
    isHovered ? 'opacity-100' : 'opacity-0',
    isInternalPlaying && 'opacity-100',
    containerClassName);

  return (
    <div className={ containerClasses }
         onMouseEnter={ handleMouseEnter }
         onMouseLeave={ () => setIsHovered(false) }>
      <ActionButton
        className={
          `${ className }
         relative gap-5 ${ isInternalPlaying && whenPlayingShowIcon && whenPlayingShowBars && 'bg-transparent overflow-hidden' }  rounded-full `
        }
        isLoading={ isMutating }
        isOutline={ true }
        icon={ (whenPlayingShowIcon || !isInternalPlaying) && {
          src: isInternalPlaying ? '/pause.svg' : '/play.svg',
          alt: 'play',
          width: iconWidth,
          height: iconHeight,
          className: 'relative z-10',
        } }
        onClick={ onPlayClick }
        { ...props }
      >
        { isInternalPlaying &&
          <>{
            whenPlayingShowIcon && whenPlayingShowBars &&
            <>
              <div className='absolute transition-all duration-300 inset-0 flex w-full h-full'>
                <div className='w-1/2 bg-accentPurple opacity-80' />
                <div className='w-1/2 bg-accentPurple' />
              </div>
              <div
                className='absolute bg-white w-[1px] h-[65%]' />
            </>
          }
            {
              whenPlayingShowBars && soundBar
            }
          </>
        }
      </ActionButton>
    </div>
  );
};
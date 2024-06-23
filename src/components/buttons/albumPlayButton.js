import React, { useEffect, useState } from 'react';
import ActionButton from '@/components/buttons/actionButton';
import { useLazyTracksIds } from '@/services/client/queries/trackQueries';
import useMusicPlayer from '@/hooks/useMusicPlayer';
import { twMerge } from 'tailwind-merge';

const AlbumPlayButton = ({
                           iconWidth = 20,
                           iconHeight = 20,
                           className = '',
                           containerClassName = '',
                           whenPlayingShowBars = true,
                           whenPlayingShowIcon = true,
                           preload = false,
                           children: soundBar,
                           disabled,
                           fetchTracksUrl,
                           ...props
                         }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { data: tracksIds = [], isMutating, trigger } = useLazyTracksIds(fetchTracksUrl);

  const activeTrackId = useMusicPlayer(state => state.activeId);
  const setActiveTrackId = useMusicPlayer(state => state.setId);
  const setActiveTracksIds = useMusicPlayer(state => state.setIds);

  const isPlayingActiveTrack = useMusicPlayer(state => state.isPlaying);
  const setIsPlayingActiveTrack = useMusicPlayer(state => state.setIsPlaying);

  useEffect(() => {
    if (preload && tracksIds.length === 0) {
      trigger();
    }
  }, [preload, tracksIds, trigger]);

  const shouldBeActive = tracksIds.includes(activeTrackId);
  const isInternalPlaying = shouldBeActive && isPlayingActiveTrack;

  const handleMouseEnter = async () => {
    if (!isHovered && !isMutating && tracksIds.length === 0) {
      setIsHovered(true);
      await trigger();
    } else {
      setIsHovered(true);
    }
  };

  const onPlayClick = () => {
    if (isMutating || tracksIds.length === 0) {
      return;
    }

    if (!shouldBeActive) {
      setActiveTrackId(tracksIds[0]);
      setActiveTracksIds(tracksIds);
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

export default AlbumPlayButton;
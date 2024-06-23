'use client';

import React, { useEffect, useState } from 'react';
import useMusicPlayer from '@/hooks/useMusicPlayer';
import MusicPlayerContent from '@/components/musicPlayer/musicPlayerContent';

const MusicPlayer = () => {
  const activeTrackId = useMusicPlayer(state => state.activeId);
  const setActiveTrackId = useMusicPlayer(state => state.setId);
  const queueTracksIds = useMusicPlayer(state => state.ids);
  const [track, setTrack] = useState({});
  const trackUrl = track.audioUrl;

  useEffect(() => {
    if (!activeTrackId)
      return;

    const fetchTrack = async () => {
      const response = await fetch(`http://localhost:5135/api/v1/tracks/${ activeTrackId }?includes=Album.Authors`,
        { cache: 'force-cache' });
      const track = await response.json();
      setTrack(track);
    };

    fetchTrack();
  }, [activeTrackId]);

  if (!track || !trackUrl || !activeTrackId) {
    return null;
  }

  const handleNext = () => {
    if (queueTracksIds.length === 0)
      return;

    const currentIndex = queueTracksIds.findIndex((id) => id === activeTrackId);
    const nextTrack = queueTracksIds[currentIndex + 1];

    if (!nextTrack)
      return setActiveTrackId(queueTracksIds[0]); //TODO Repeat logic

    setActiveTrackId(nextTrack);
  };

  const handlePrevious = () => {
    if (queueTracksIds.length === 0)
      return;

    const currentIndex = queueTracksIds.findIndex((id) => id === activeTrackId);
    const previousTrack = queueTracksIds[currentIndex - 1];

    if (!previousTrack)
      return setActiveTrackId(queueTracksIds[queueTracksIds.length - 1]);

    setActiveTrackId(previousTrack);
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className='fixed z-30 bottom-0 left-0 bg-[#F2F2F2] border-t border-r-gray-400 w-full h-[50px] py-2 px-4'>
      <MusicPlayerContent track={ track }
                          trackUrl={ trackUrl }
                          onNext={ handleNext }
                          onPrevious={ handlePrevious }
                          onEnded={ handleEnded }
      />
    </div>
  );
};

export default MusicPlayer;
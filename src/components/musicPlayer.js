'use client'

import React, {useEffect, useState} from 'react';
import useMusicPlayer from "@/hooks/useMusicPlayer";
import MusicPlayerContent from "@/components/musicPlayerContent";

const MusicPlayer = () => {
  const musicPlayer = useMusicPlayer();
  const [track, setTrack] = useState({});
  const trackUrl = track.audioUrl;

  useEffect(() => {
    if (!musicPlayer.activeId)
      return;

    const fetchTrack = async () => {
      const response = await fetch(`http://localhost:5135/api/v1/tracks/${musicPlayer.activeId}?includes=Album.Authors`,
          { cache: 'force-cache' })
      const track = await response.json();
      setTrack(track);
    }

    fetchTrack()
  }, [musicPlayer.activeId]);

  if (!track || !trackUrl || !musicPlayer.activeId){
    return null;
  }

  const handleNext = () => {
    if (musicPlayer.ids.length === 0)
      return;

    const currentIndex = musicPlayer.ids.findIndex((id) => id === musicPlayer.activeId);
    const nextTrack = musicPlayer.ids[currentIndex + 1];

    if (!nextTrack)
      return musicPlayer.setId(musicPlayer.ids[0]); //TODO Repeat logic

    musicPlayer.setId(nextTrack);
  }

  const handlePrevious = () => {
    if (musicPlayer.ids.length === 0)
      return;

    const currentIndex = musicPlayer.ids.findIndex((id) => id === musicPlayer.activeId);
    const previousTrack = musicPlayer.ids[currentIndex - 1];

    if (!previousTrack)
      return musicPlayer.setId(musicPlayer.ids[musicPlayer.ids.length - 1])

    musicPlayer.setId(previousTrack);
  }

  const handleEnded = () => {
    handleNext()
  }

  return (
      <div className='fixed bottom-0 left-0 bg-[#F2F2F2] border-t border-r-gray-400 w-full h-[50px] py-2 px-4'>
         <MusicPlayerContent track={track}
                             trackUrl={trackUrl}
                             onNext={handleNext}
                             onPrevious={handlePrevious}
                             onEnded={handleEnded}
         />
      </div>
  );
};

export default MusicPlayer;
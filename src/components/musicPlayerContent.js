import React, {useEffect, useRef, useState} from "react";
import MaskedIcon from "@/components/maskedIcon";
import RangeSlider from "@/components/slider/rangeSlider";
import Image from "next/image";

const MusicPlayerContent = ({ track, trackUrl, onEnded, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(15);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current){
      audioRef.current.play()
      setIsPlaying(true);
    }
  }, [trackUrl]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setElapsed(audio.currentTime);
      const bufferedTime = audio.buffered.length ? audio.buffered.end(audio.buffered.length - 1) : 0;
      setBuffered(bufferedTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded();
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, onEnded]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value) => {
    const parsedValue = parseFloat(value);
    setVolume(parsedValue);
  };

  const handleSeekChange = (value) => {
    const parsedValue = parseFloat(value);
    audioRef.current.currentTime = parsedValue;
    setElapsed(parsedValue);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
      <div className="flex items-center space-x-4 text-white w-[1440px] mx-auto h-full">
        <div className='flex  gap-3 text-textDefault'>
          <button onClick={onPrevious}>
            <MaskedIcon src='/backward.svg' alt='Previous' className='w-[14px] h-[14px]' />
          </button>
          <button onClick={togglePlayPause}>
            <MaskedIcon src={isPlaying ? '/pause.svg' : '/play.svg'} alt="Play/Pause" className="w-[14px] h-[14px]" />
          </button>
          <button onClick={onNext}>
            <MaskedIcon src='/forward.svg' alt='Next' className='w-[14px] h-[14px]' />
          </button>
          <button className='flex items-center' onClick={() => { /* TODO: shuffle functionality */ }}>
            <MaskedIcon src='/shuffle.svg' alt='Shuffle' className='w-[19px] h-[19px]' />
          </button>
          <button className='flex items-center' onClick={() => { /* TODO: repeat functionality */ }}>
            <MaskedIcon src='/repeat.svg' alt='Repeat' className='w-[19px] h-[19px]' />
          </button>
        </div>

        <div className="flex items-center space-x-2 w-full">
          <span className='text-xs text-accentPurple w-6'>{formatTime(elapsed)}</span>
          <RangeSlider
              min="0"
              max={duration}
              value={elapsed}
              buffer={buffered}
              onChange={handleSeekChange}
          />
          <span className='text-xs text-textDefault w-6'>{formatTime(duration - elapsed)}</span>
        </div>
        <div
            className="relative"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button className='flex items-center w-6 h h-6'>
            <MaskedIcon
                src={volume === 0 ? '/mute.svg' : '/volume.svg'}
                alt="Volume"
                className={`text-textDefault ${volume === 0 ? 'w-[20px] h-[20px]' : 'w-4 h-4'}`}
            />
          </button>
          <div className={`absolute bottom-[30px] left-1/2 transform -translate-x-1/2 w-5 bg-[#F2F2F2] rounded py-2 px-1 flex items-center justify-center shadow-md transition-all duration-200 ${showVolumeSlider ? 'h-36 opacity-100' : 'h-0 opacity-0'}`}>
            <RangeSlider
                min="0"
                max="100"
                value={volume}
                orientation='vertical'
                onChange={handleVolumeChange}
                className="bg-gray-300"
            />
          </div>
        </div>
        <div className='flex gap-3'>
          <Image src={track.coverUrl} width={30} height={30} alt='cover'/>
          <div className='text-textDefault text-xs flex flex-col'>
            <a>{track.title}</a>
            <span>{track.authors[0].name}</span>
          </div>
        </div>
        <audio ref={audioRef} src={trackUrl} preload='auto' />
      </div>
  );
};

export default MusicPlayerContent;
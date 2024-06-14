import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { throttle } from 'throttle-debounce';
import SeekBar from '@/components/musicPlayer/seekBar';
import PlayControls from '@/components/musicPlayer/playControls';
import VolumeControl from '@/components/musicPlayer/volumeControl';
import * as listenService from '@/app/services/listenService';
import useMusicPlayer from '@/hooks/useMusicPlayer';

const MusicPlayerContent = ({ track, trackUrl, onEnded, onNext, onPrevious }) => {
  console.log('render MusicPlayerContent');
  const [volume, setVolume] = useState(3);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef(null);
  const requestRef = useRef(null);

  const {
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    isSeekingFromWaveform,
    setIsSeekingFromWaveform,
  } = useMusicPlayer();

  useEffect(() => {
    if (audioRef.current && isSeekingFromWaveform) {
      const newTime = progress * audioRef.current.duration;
      if (!isNaN(newTime) && isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
      }
      setIsSeekingFromWaveform(false); // Сбросим флаг перемотки
    }
  }, [isSeekingFromWaveform, setIsSeekingFromWaveform]); // Уберем зависимость от progress

  useEffect(() => {
    const audio = audioRef.current;
    setIsLoading(true);

    if (!audio)
      return;

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [trackUrl]);


  useEffect(() => {
    if (audioRef.current)
      audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio === null)
      return;

    if (isPlaying)
      audio.play();

    listenService.setLastPlayTime(audio.currentTime);

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);

      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };

  }, [trackUrl, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio)
      return;

    const handleEnded = () => {
      setIsPlaying(false);
      listenService.sendListeningData(track.id, volume, audioRef.current.duration, audioRef.current.currentTime);
      listenService.resetListeningData();
      onEnded();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);

      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [audioRef, onEnded, trackUrl]);

  const handleTimeUpdate = () => {
    if (isSeeking)
      return;

    const currentTime = audioRef.current.currentTime;
    if (requestRef.current === null) {

      requestRef.current = requestAnimationFrame(() => {
        throttledUpdateElapsed(currentTime);
        setProgress(audioRef.current.currentTime / audioRef.current.duration);
        requestRef.current = null;
      });
    }
  };

  const updateElapsed = useCallback((currentTime) => {
    listenService.updateMetrics(currentTime, isPlaying);

    setElapsed(currentTime);

    if (audioRef.current) {
      const bufferedTime = audioRef.current.buffered.length ? audioRef.current.buffered.end(audioRef.current.buffered.length - 1) : 0;
      setBuffered(bufferedTime);
    }
  }, []);

  const throttledUpdateElapsed = useCallback(throttle(1000, updateElapsed), [updateElapsed]);

  const togglePlayPause = useCallback(() => {

    if (isPlaying) {
      audioRef.current.pause();
      listenService.incrementPauseCount();
    } else {
      audioRef.current.play();
      listenService.setLastPlayTime(audioRef.current.currentTime);
    }

    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleVolumeChange = useCallback((value) => {
    setVolume(parseFloat(value));
  }, []);

  const handleSeekEnd = (value) => {
    if (audioRef === null)
      return;

    const parsedValue = parseFloat(value);
    audioRef.current.currentTime = parsedValue;
    setElapsed(parsedValue);
    setIsSeeking(false);

    listenService.setLastPlayTime(audioRef.current.currentTime);
    listenService.incrementSeekCount();
  };

  const handleNext = useCallback(() => {
    listenService.sendListeningData(track.id, volume, audioRef.current.duration, audioRef.current.currentTime);
    listenService.resetListeningData();

    setIsPlaying(false);
    audioRef.current.pause();

    onNext();
  }, [trackUrl]);

  const handlePrevious = useCallback(() => {
    listenService.sendListeningData(track.id, volume, audioRef.current.duration, audioRef.current.currentTime);
    listenService.resetListeningData();

    setIsPlaying(false);
    audioRef.current.pause();

    onPrevious();
  }, [trackUrl]);

  return (
    <div className='flex items-center space-x-4 text-white w-[1440px] mx-auto h-full'>

      <PlayControls
        isPlaying={ isPlaying }
        togglePlayPause={ togglePlayPause }
        onNext={ handleNext }
        onPrevious={ handlePrevious }
      />

      <SeekBar
        duration={ duration }
        buffer={ buffered }
        elapsed={ elapsed }
        isLoading={ isLoading }
        onSeekEnd={ handleSeekEnd }
      />

      <VolumeControl
        volume={ volume }
        setShowVolumeSlider={ setShowVolumeSlider }
        showVolumeSlider={ showVolumeSlider }
        handleVolumeChange={ handleVolumeChange }
      />

      <div className='flex items-center gap-3'>
        <div className='relative w-[36px] h-[36px]'>
          <Image src={ track.coverUrl } layout='fill' alt='cover' className='object-cover' />
        </div>
        <div className='text-textDefault text-xs flex flex-col'>
          <a>{ track.title }</a>
          <span className='text-nowrap'>{ track.authors[0].name }</span>
        </div>
      </div>
      <audio ref={ audioRef } src={ trackUrl } preload='auto' />

    </div>
  );
};

export default MusicPlayerContent;
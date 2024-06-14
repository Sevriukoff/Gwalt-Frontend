'use client';

import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import useMusicPlayer from '@/hooks/useMusicPlayer';

const formatTime = (seconds) => [Math.floor(seconds / 60), Math.floor(seconds % 60)].map((v) => `0${ v }`.slice(-2)).join(':');

const Waveform = ({ trackId = 0, peaks = [], duration = 0 }) => {
  const activeId = useMusicPlayer((state) => state.activeId);
  const progress = useMusicPlayer((state) => state.progress);
  const setProgress = useMusicPlayer((state) => state.setProgress);
  const isSeekingFromWaveform = useMusicPlayer((state) => state.isSeekingFromWaveform);
  const setIsSeekingFromWaveform = useMusicPlayer((state) => state.setIsSeekingFromWaveform);

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const hoverRef = useRef(null);
  const timeRef = useRef(null);
  const durationRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Define the waveform gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    gradient.addColorStop(0, '#656666'); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666'); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff'); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff'); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1'); // Bottom color
    gradient.addColorStop(1, '#B1B1B1'); // Bottom color

// Define the progress gradient
    const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    progressGradient.addColorStop(0, '#725FEB'); // Top color
    progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#9694FF'); // Top color
    progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff'); // White line
    progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff'); // White line
    progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#9694FF'); // Bottom color
    progressGradient.addColorStop(1, '#5C49D2'); // Bottom color

    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: gradient,
        progressColor: progressGradient,
        barWidth: 2.5,
        barRadius: 2.5,
        barGap: 1.5,
        barAlign: 'bottom',
        normalize: true,
        height: 50,
      });

      wavesurferRef.current.load(null, peaks, duration);

      wavesurferRef.current.on('click', (relativeX) => {
        setIsSeekingFromWaveform(true);
        setProgress(relativeX);
      });

      const hover = hoverRef.current;

      waveformRef.current.addEventListener('pointermove', (e) => {
        hover.style.width = `${ e.offsetX }px`;
      });

      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.round(seconds) % 60;
        const paddedSeconds = `0${ secondsRemainder }`.slice(-2);
        return `${ minutes }:${ paddedSeconds }`;
      };

      const timeEl = timeRef.current;

      wavesurferRef.current.on('timeupdate', (currentTime) => {
        timeEl.textContent = formatTime(currentTime);
      });

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, [peaks, duration, setProgress, setIsSeekingFromWaveform]);

  useEffect(() => {
    if (wavesurferRef.current && trackId === activeId) {
      wavesurferRef.current.seekTo(progress);
    }
  }, [progress, trackId, activeId]);

  return (
    <div
      className='w-full h-full relative cursor-pointer'
      ref={ waveformRef }
      onMouseEnter={ () => hoverRef.current.classList.add('opacity-100') }
      onMouseLeave={ () => hoverRef.current.classList.remove('opacity-100') }
    >
      <div
        ref={ timeRef }
        className='absolute z-20 left-0 top-1/2 transform -translate-y-1/2 text-xs bg-black bg-opacity-75 rounded py-1 px-2 text-gray-300'
      >
        0:00
      </div>
      <div
        ref={ durationRef }
        className='absolute z-20 right-0 top-1/2 transform -translate-y-1/2 text-xs bg-black bg-opacity-75 rounded py-1 px-2 text-gray-300'
      >
        { formatTime(duration) }
      </div>
      <div
        ref={ hoverRef }
        className='absolute left-0 top-0 z-10 pointer-events-none h-full w-0 bg-white bg-opacity-25 opacity-0 transition-opacity duration-200'
      ></div>
    </div>
  );
};

export default Waveform;
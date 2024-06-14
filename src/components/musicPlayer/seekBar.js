import React, { useEffect, useMemo, useRef, useState } from 'react';
import RangeSlider from '@/components/slider/rangeSlider';
import { throttle } from 'throttle-debounce';

//Обёртка над rangeSlider для оптимизации плеера. Мог бы вставить эти оптимизации внутрь rangeSlider, да нет особой необходимости.
//Поскольку render для компонента rangeSlider не столько затратен, нежели render основного и главного компонента сайт MusicPlayer.
const SeekBar = ({ duration, buffer, isLoading, elapsed, onSeekEnd }) => {
  console.log('render SeekBar');

  const [localElapsed, setLocalElapsed] = useState(elapsed);
  const [isSeeking, setIsSeeking] = useState(false);

  const requestRef = useRef(null);
  const latestValue = useRef(localElapsed);

  const throttledSetLocalElapsed = useRef(throttle(30, (value) => {
    setLocalElapsed(value);
  })).current;

  const handleSeekChange = (value) => {
    if (isSeeking) {
      throttledSetLocalElapsed(value);
    } else {
      setLocalElapsed(elapsed);
    }
  };

  const handleDragStart = () => {
    setIsSeeking(true);
  };

  const handleDragEnd = (value) => {
    setIsSeeking(false);
    onSeekEnd(value);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      throttledSetLocalElapsed.cancel();
    };
  }, [throttledSetLocalElapsed]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${ minutes }:${ seconds < 10 ? '0' : '' }${ seconds }`;
  };

  const formattedDuration = useMemo(() => formatTime(duration), [duration]);
  const rangeSliderValue = isSeeking ? localElapsed : elapsed;

  return (
    <div className='flex items-center space-x-2 w-full'>
      <span className='text-xs text-accentPurple w-6'>{ formatTime(rangeSliderValue) }</span>
      <RangeSlider
        className={ isLoading ? 'animate-pulse' : '' }
        min={ 0 }
        max={ duration }
        buffer={ buffer }
        value={ rangeSliderValue }
        onChange={ handleSeekChange }
        onDragStart={ handleDragStart }
        onDragEnd={ handleDragEnd }
      />
      <span className='text-xs text-textDefault w-6'>{ formattedDuration }</span>
    </div>
  );
};

export default SeekBar;
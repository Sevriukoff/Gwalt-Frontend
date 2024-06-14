'use client';

import React, { useState } from 'react';
import styles from './rangeSlider.module.css';
import { twMerge } from 'tailwind-merge';

const RangeSlider = ({
                       className,
                       min = 0,
                       max = 100,
                       buffer = 0,
                       value = 0,
                       orientation = 'horizontal',
                       onChange = (value) => console.log(),
                       onDragStart = () => console.log(),
                       onDragEnd = (value) => console.log(),
                       disabled = false,
                       ...props
                     }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleOnChange = (event) => {
    if (!onChange)
      return;

    const { value } = event.target;
    onChange(+value);
  };

  const handleDragStart = () => {
    if (onDragStart)
      onDragStart();

    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    if (onDragEnd)
      onDragEnd(+event.currentTarget.value);

    setIsDragging(false);
  };

  const mapToRange = (value, min, max) => {
    value = Math.min(Math.max(value, min), max);
    const percentage = (value - min) / (max - min);
    const mappedValue = percentage * 100;

    return mappedValue;
  };

  const bufferStyle = orientation === 'vertical' ?
    {
      height: mapToRange(buffer, min, max) + '%',
      width: '100%',
      bottom: 0,
    } :
    {
      width: mapToRange(buffer, min, max) + '%',
      height: '100%',
    };

  const valueStyle = orientation === 'vertical' ?
    {
      height: mapToRange(value, min, max) + '%',
      width: '100%',
      bottom: 0,
    } :
    {
      width: mapToRange(value, min, max) + '%',
      height: '100%',
    };

  const isVert = orientation === 'vertical';

  return (
    <div
      className={ twMerge(`relative bg-white flex items-center rounded ${ isVert ? 'flex-col-reverse justify-center h-full' : 'w-full' }`, className) }
      { ...props }>
      <input
        className={ `cursor-pointer ${ isVert ? styles.rangeSliderVertical : styles.rangeSliderHorizontal }` }
        type='range'
        min={ min }
        max={ max }
        value={ value }
        disabled={ disabled }
        onChange={ handleOnChange }
        onMouseDown={ handleDragStart }
        onMouseUp={ handleDragEnd }
        style={ { zIndex: isDragging ? 1 : 2 } }
      />
      <div style={ bufferStyle } className='absolute bg-gray-300 rounded' />
      <div style={ valueStyle } className='absolute bg-accentPurple rounded' />
    </div>
  );
};

export default RangeSlider;

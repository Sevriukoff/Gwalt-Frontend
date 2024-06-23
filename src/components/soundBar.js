'use client';

import React, { useEffect, useState } from 'react';

const SoundBar = ({
                    barCount = 4,
                    minHeight = 10,
                    maxHeight = 30,
                    barWidth = 3,
                    gap = '2px',
                    animationDuration = 700,
                    intervalTime = 450,
                  }) => {
  const [heights, setHeights] = useState(Array(barCount).fill(minHeight));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(heights.map(() => Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [heights, minHeight, maxHeight, intervalTime]);

  return (
    <div
      className={ `flex items-end` }
      style={ { gap: gap, width: `${ maxHeight }px`, height: `${ maxHeight }px` } }>
      { heights.map((height, index) => (
        <div key={ index } className='bg-white rounded transition-all ease-in-out'
             style={ {
               width: `${ barWidth }px`,
               height: `${ height }px`,
               transitionDuration: `${ animationDuration }ms`,
             } }></div>
      )) }
    </div>
  );
};

export default SoundBar;
'use client';

import React, { useEffect, useRef, useState } from 'react';

const Саrousel = ({ children, itemsPerSlide = 4, gap = 16 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const carouselRef = useRef(null);

  const totalItems = React.Children.count(children);
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);

  useEffect(() => {
    const updateCardWidth = () => {
      if (carouselRef.current) {
        const carouselWidth = carouselRef.current.offsetWidth;
        const totalGapWidth = (itemsPerSlide - 1) * gap;
        setCardWidth((carouselWidth - totalGapWidth) / itemsPerSlide);
      }
    };


    window.addEventListener('resize', updateCardWidth);
    updateCardWidth();

    return () => window.removeEventListener('resize', updateCardWidth);
  }, [itemsPerSlide]);

  const nextSlide = () => {
    const remainingItems = totalItems - (currentSlide + 1) * itemsPerSlide;
    if (remainingItems > 0) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const calculateTranslateX = () => {
    if (currentSlide === totalSlides - 1) {
      const remainingItems = totalItems % itemsPerSlide;
      if (remainingItems > 0) {
        const lastSlideShift = (itemsPerSlide - remainingItems) * (cardWidth + gap);
        return currentSlide * itemsPerSlide * (cardWidth + gap) - lastSlideShift;
      }
    }
    return currentSlide * itemsPerSlide * (cardWidth + gap);
  };

  const arrowClass = 'absolute transform bg-white border border-gray-300 rounded text-gray-300 hover:font-medium px-2 py-1 z-10 hover:border-[#9694FF] hover:text-[#9694FF]';

  return (
    <div className='relative w-full max-w-full' ref={ carouselRef }>
      { currentSlide > 0 && (
        <button
          className={ `-left-3 -translate-y-1/2 ${ arrowClass }` }
          style={ { top: `${ cardWidth / 2 }px` } }
          onClick={ prevSlide }
        >
          &lt;
        </button>
      ) }
      <div
        className='flex gap-9 transition-transform duration-1000 ease-in-out'
        style={ { transform: `translateX(-${ calculateTranslateX() }px)`, gap: `${ gap }px` } }
      >
        { React.Children.map(children, (child, index) => (
          <div
            key={ index }
            className='flex-shrink-0'
            style={ { maxWidth: `${ cardWidth }px`, minWidth: `${ cardWidth }px` } }
          >
            { child }
          </div>
        )) }
      </div>
      { currentSlide < Math.ceil(totalItems / itemsPerSlide) - 1 && (
        <button
          className={ `-right-3 -translate-y-1/2 ${ arrowClass }` }
          style={ { top: `${ cardWidth / 2 }px` } }
          onClick={ nextSlide }
        >
          &gt;
        </button>
      ) }
    </div>
  );
};

export default Саrousel;
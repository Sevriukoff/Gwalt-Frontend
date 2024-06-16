import React, { useState } from 'react';

const Tooltip = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className='relative inline-block'
      onMouseEnter={ () => setTooltipVisible(true) }
      onMouseLeave={ () => setTooltipVisible(false) }
    >
      { children }
      { isTooltipVisible && (
        <div
          className='absolute left-1/2 transform -translate-x-1/2 mt-1 p-2 w-48 text-center bg-gray-900/90 text-white text-[11px] leading-tight rounded shadow-lg z-10'>
          { content }
        </div>
      ) }
    </div>
  );
};

export default Tooltip;
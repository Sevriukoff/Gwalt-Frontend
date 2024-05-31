import React from 'react';

const MaskedIcon = ({ src, alt, className, style }) => {
  return (
      <div
          className={`mask ${className}`}
          style={{ WebkitMask: `url(${src}) no-repeat center`, mask: `url(${src}) no-repeat center`, ...style }}
          role="img"
          aria-label={alt}
      />
  );
};

export default MaskedIcon;
import React from 'react';

const MaskedIcon = ({ src, alt, className }) => {
  return (
      <div
          className={`mask ${className}`}
          style={{ WebkitMask: `url(${src}) no-repeat center`, mask: `url(${src}) no-repeat center` }}
          role="img"
          aria-label={alt}
      />
  );
};

export default MaskedIcon;
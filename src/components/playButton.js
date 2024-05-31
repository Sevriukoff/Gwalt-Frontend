import MaskedIcon from "@/components/maskedIcon";
import React from "react";

export const PlayButton = ({ iconWidth = 20, iconHeight = 20, className = '', ...props }) => {
  return (
      <button
          className={`bg-accentPurple flex items-center text-white rounded-full ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accentPurpleActive'}`}
          {...props}
      >
        <MaskedIcon
            src='/play.svg'
            alt='play'
            className="text-white"
            style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
        />
      </button>
  );
};
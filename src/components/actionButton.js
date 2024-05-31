import MaskedIcon from "@/components/maskedIcon";
import React from "react";

export const ActionButton = ({ iconSrc = '', iconWidth = 16, iconHeight = 16, label = '', className, isOutline, ...props }) => {
  return (
      <button
          className={`flex gap-2 items-center px-3 py-1 group rounded ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'} ${isOutline ? 'bg-accentPurple hover:bg-accentPurpleActive' : 'border border-gray-300'}`}
          {...props}
      >
        {
          iconSrc &&
            <MaskedIcon
                src={iconSrc}
                alt={label}
                className={`${isOutline ? 'text-white' : 'text-gray-300 group-hover:text-gray-500'}`}
                style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
            />
        }
        {
          label && <span className={`text-sm ${isOutline ? 'text-white' : 'text-textDefault'}`}>{label}</span>
        }
      </button>
  );
};
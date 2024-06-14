import React from 'react';
import MaskedIcon from "@/components/maskedIcon";
import {twMerge} from "tailwind-merge";

const LoaderSpin = ({ className, size = 21 }) => (
    <div className="flex items-center justify-center">
      <MaskedIcon
          src='/spin.svg'
          alt='loader'
          className={twMerge(`text-accentPurple animate-spin`, className)}
          style={{ width: size, height: size }}
      />
    </div>
);

export default LoaderSpin;

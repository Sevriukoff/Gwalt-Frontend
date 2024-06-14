import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({
                            className,
                            type,
                            disabled,
                            ...props
                          }, ref) => {
  return (
      <input
          type={type}
          className={twMerge(
              'flex w-full rounded-md bg-neutral-100 border border-gray-400 px-3 py-2',
              className
          )}
          disabled={disabled}
          ref={ref}
          {...props}
      />
  );
});

Input.displayName = 'Input';

export default Input;

'use client';

import MaskedIcon from '@/components/maskedIcon';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import LoaderSpin from '@/components/loaderSpin';

/**
 * @typedef {Object} IconProps
 * @property {string | null} [src] - Source URL of the icon.
 * @property {number | null} [width] - Width of the icon.
 * @property {number | null} [height] - Height of the icon.
 * @property {string | null} [className] - Additional class names for the icon.
 */

/**
 * @typedef {Object} ActionButtonProps
 * @property {IconProps} [icon] - Icon properties.
 * @property {string} [className] - Additional class names for the button.
 * @property {Function} [onClick] - Click handler for the button.
 * @property {boolean} [disabled] - Whether the button is disabled.
 * @property {boolean} [isOutline] - Whether the button is an outline button.
 * @property {boolean} [isLoading] - Whether the button shows a loading state.
 * @property {React.ReactNode} [children] - Children to be rendered inside the button.
 */

/**
 * ActionButton component.
 * @param {ActionButtonProps} props - Props for the ActionButton component.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref for the button element.
 * @returns {JSX.Element} The rendered button element.
 */
const ActionButton = forwardRef(
  (
    {
      icon = {
        src: '',
        width: 15,
        height: 15,
        className: '',
      },
      className,
      onClick = () => console.log(),
      disabled,
      isOutline,
      isLoading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const buttonClasses = twMerge(
      'flex gap-2 items-center justify-center px-3 py-1 btn-group rounded',
      disabled || isLoading
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:border-gray-500',
      isOutline
        ? 'bg-accentPurple hover:bg-accentPurpleActive'
        : 'border border-gray-300',
      className,
    );

    const iconClasses = twMerge(
      isOutline ? 'text-white' : 'text-gray-300 btn-group-hover:text-gray-500',
      icon.className,
    );

    const textClasses = twMerge(
      'text-sm',
      isOutline ? 'text-white' : 'text-textDefault',
    );

    return (
      <button
        onClick={ onClick }
        ref={ ref }
        className={ buttonClasses }
        { ...props }
        disabled={ disabled || isLoading }
      >
        { isLoading ? (
          <LoaderSpin className={ `${ isOutline ? 'text-white' : 'text-accentPurple' } ` } size={ icon.height } />
        ) : (
          <>
            { icon && icon.src && (
              <MaskedIcon
                src={ icon.src }
                alt={ children ? children.toString() : '' }
                className={ iconClasses }
                style={ { width: `${ icon.width }px`, height: `${ icon.height }px` } }
              />
            ) }
            { children && <span className={ textClasses }>{ children }</span> }
          </>
        ) }
      </button>
    );
  },
);

ActionButton.displayName = 'ActionButton';

export default ActionButton;

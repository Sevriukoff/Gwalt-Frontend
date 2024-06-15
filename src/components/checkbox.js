import React, { forwardRef } from 'react';

const Checkbox = forwardRef(({ checked = true, onChange, label }, ref) => {
  return (
    <label className='inline-flex items-center space-x-2 cursor-pointer'>
      <input
        type='checkbox'
        checked={ checked }
        onChange={ onChange }
        ref={ ref }
        className='hidden'
      />
      <span
        tabIndex={ 0 }
        onKeyPress={ (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange({ target: { checked: !checked } });
          }
        } }
        className={ `relative inline-block w-5 h-5 border-2 rounded ${
          checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500` }
      >
        { checked && (
          <svg
            className='absolute top-0 left-0 w-full h-full text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
          </svg>
        ) }
      </span>
      <span className='text-gray-700'>{ label }</span>
    </label>
  );
});

export default Checkbox;
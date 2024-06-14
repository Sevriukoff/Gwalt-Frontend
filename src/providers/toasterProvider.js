'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import MaskedIcon from '@/components/maskedIcon';

const ToasterProvider = () => {
  return (
    <Toaster gutter={ 9 } position={ 'bottom-left' } limit={ 3 } toastOptions={ {
      style: {
        borderRadius: '6px',
        border: '1px solid #eeeeee',
        background: '#ffffff',
        color: '#333',
      },
      success: {
        iconTheme: {
          primary: 'white',
          secondary: '#725FEB',
        },
        icon: <MaskedIcon src='/like.svg' alt='success' className='pulse-icon w-3 h-3 text-accentPurple' />,
      },
    } }
    />
  );
};

export default ToasterProvider;
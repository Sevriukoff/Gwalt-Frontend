'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import ActionButton from '@/components/buttons/actionButton';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className='h-[350px] flex flex-col justify-center items-center text-textDefault p-6'>
      <h2 className='text-3xl font-bold mb-4'>Что-то пошло не так!</h2>
      <p className='mb-8 text-lg'>{ error.message || 'Произошла неизвестная ошибка.' }</p>
      <ActionButton onClick={ reset }>Попробовать еще раз</ActionButton>
    </div>
  );
}

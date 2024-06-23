import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ActionButton from '@/components/buttons/actionButton';
import Input from '@/components/input';
import FieldError from '@/components/fieldError';

const CheckEmailFrom = ({ setTitle, onSubmit, next }) => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setTitle('Добро пожаловать');
  }, []);

  const handleFormSubmit = async (data) => {
    await onSubmit(data, next);
  };

  return (
    <form onSubmit={ handleSubmit(handleFormSubmit) } className='space-y-5'>
      <div>
        <Input
          id='email'
          placeholder='Ваша почта'
          className={ `mt-1 block w-full rounded-md shadow-sm ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }` }
          { ...register('email', {
            required: 'Почта обязательна',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Некорректная почта',
            },
          }) }
        />
        { errors.email && <FieldError error={ errors.email.message } /> }
      </div>
      <ActionButton className='w-full h-[36px]' isOutline={ true } isLoading={ isSubmitting }
      >Продолжить</ActionButton>
      <p className='text-xs text-[#999]'>
        Регистрируясь, вы соглашаетесь с тем, что мы можем использовать предоставленные
        вами данные для регистрации и отправки вам уведомлений о наших продуктах и услугах.
        Вы можете отказаться от подписки на уведомления в любое время в своих настройках.
      </p>
    </form>
  );
};

export default CheckEmailFrom;
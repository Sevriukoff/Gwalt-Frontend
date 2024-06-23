import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ActionButton from '@/components/buttons/actionButton';
import Input from '@/components/input';
import FieldError from '@/components/fieldError';

const LoginForm = ({ setTitle, email, onSubmit, next }) => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setTitle('Войдите в свой аккаунт');
  }, []);
  const handleFormSubmit = async (data) => {
    await onSubmit(data, next);
  };

  return (
    <form onSubmit={ handleSubmit(handleFormSubmit) } className='flex flex-col justify-between h-full'>
      <div className='space-y-4'>
        <div>
          <Input
            id='email'
            type='email'
            value={ email }
            readOnly
            disabled={ true }
            className='mt-1 text-gray-500 bg-gray-200/50 block w-full rounded-md shadow-sm border-gray-300'
          />
        </div>
        <div>
          <Input
            id='password'
            type='password'
            placeholder='Ваш пароль'
            className={ `mt-1 block w-full rounded-md shadow-sm ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }` }
            { ...register('password', {
              required: 'Укажите ваш пароль',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать не менее 6 символов',
              },
            }) }
          />
          { errors.password && <FieldError error={ errors.password.message } /> }
        </div>
      </div>
      <ActionButton className='w-full h-[36px]' isOutline={ true } isLoading={ isSubmitting }>
        Войти
      </ActionButton>
    </form>
  );
};

export default LoginForm;
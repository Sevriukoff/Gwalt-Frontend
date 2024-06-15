import React from 'react';
import { useForm } from 'react-hook-form';
import ActionButton from '@/components/actionButton';
import Input from '@/components/input';

const LoginForm = ({ email, onSubmit, next }) => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data, next);
  };

  return (
    <form onSubmit={ handleSubmit(handleFormSubmit) } className='space-y-4'>
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
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password must be at least 3 characters long',
            },
          }) }
        />
        { errors.password && <span className='text-red-500 text-sm'>{ errors.password.message }</span> }
      </div>
      <ActionButton className='w-full h-[36px]' isOutline={ true } isLoading={ isSubmitting }
                    disabled={ !isValid || isSubmitting }>Дальше</ActionButton>
    </form>
  );
};

export default LoginForm;
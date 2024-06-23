import React, { useEffect } from 'react';
import Input from '@/components/input';
import ActionButton from '@/components/buttons/actionButton';
import { useForm } from 'react-hook-form';
import FieldError from '@/components/fieldError';

const RegisterPasswordForm = ({ setTitle, email, onSubmit, next }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    getValues,
    setValue,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setTitle('Создайте свой аккаунт');
  }, []);

  const handleFormSubmit = async (data) => {
    await onSubmit(data, next);
  };

  return (
    <form onSubmit={ handleSubmit(handleFormSubmit) } className='flex flex-col h-full justify-between gap-5'>
      <div className='space-y-5'>
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
            className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.password ? 'border-red-500' : 'border-gray-300' }` }
            { ...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
            }) }
          />
          { errors.password && <FieldError error={ errors.password.message } /> }
        </div>
        <div>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='Подтвердите пароль'
            className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.confirmPassword ? 'border-red-500' : 'border-gray-300' }` }
            { ...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: (value) => value === getValues('password') || 'Пароли не совпадают',
            }) }
          />
          { errors.confirmPassword && <FieldError error={ errors.confirmPassword.message } /> }
        </div>
      </div>
      <ActionButton className='w-full h-[36px]' isOutline={ true } isLoading={ isSubmitting }>
        Осталось совсем чуть-чуть
      </ActionButton>
    </form>
  );
};

export default RegisterPasswordForm;
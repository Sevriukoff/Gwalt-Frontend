import React, { useState } from 'react';
import Input from '@/components/input';
import ActionButton from '@/components/actionButton';
import { useForm } from 'react-hook-form';
import Checkbox from '@/components/checkbox';
import MaskedIcon from '@/components/maskedIcon';

const RegisterForm = ({ email, onSubmit, next }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    getValues,
    setValue,
    watch,
  } = useForm();

  const generateAvatar = watch('generateAvatar', false);

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
          className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.password ? 'border-red-500' : 'border-gray-300' }` }
          { ...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }) }
        />
        { errors.password && <span className='text-red-500 text-sm'>{ errors.password.message }</span> }
      </div>
      <div>
        <Input
          id='confirmPassword'
          type='password'
          placeholder='Подтвердите пароль'
          className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.confirmPassword ? 'border-red-500' : 'border-gray-300' }` }
          { ...register('confirmPassword', {
            required: 'Password confirmation is required',
            validate: (value) => value === getValues('password') || 'Passwords do not match',
          }) }
        />
        { errors.confirmPassword && <span className='text-red-500 text-sm'>{ errors.confirmPassword.message }</span> }
      </div>
      <div className='flex items-center justify-between'>
        <Checkbox
          label='Сгенерировать аватар профиля'
          checked={ generateAvatar }
          onChange={ (e) => setValue('generateAvatar', e.target.checked) }
        />
        <Tooltip
          content={ 'Создать случайный аватар и задний фон для вашего профиля или установить их по умолчнию' }>
          <MaskedIcon src='/info.svg' className='cursor-pointer text-gray-500 w-[18px] h-[18px]' />
        </Tooltip>
      </div>
      <ActionButton className='w-full h-[36px]' isOutline={ true } isLoading={ isSubmitting }
                    disabled={ !isValid || isSubmitting }>
        Зарегистрироваться
      </ActionButton>
    </form>
  );
};

export default RegisterForm;

const Tooltip = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className='relative inline-block'
      onMouseEnter={ () => setTooltipVisible(true) }
      onMouseLeave={ () => setTooltipVisible(false) }
    >
      { children }
      { isTooltipVisible && (
        <div
          className='absolute left-1/2 transform -translate-x-1/2 mt-1 p-2 w-48 text-center bg-gray-900/90 text-white text-[11px] leading-tight rounded shadow-lg z-10'>
          { content }
        </div>
      ) }
    </div>
  );
};
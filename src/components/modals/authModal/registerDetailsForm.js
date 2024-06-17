import ActionButton from '@/components/actionButton';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/input';
import Select from 'react-select';
import React from 'react';
import Checkbox from '@/components/checkbox';
import MaskedIcon from '@/components/maskedIcon';
import Tooltip from '@/components/tooltip';
import FieldError from '@/components/fieldError';

const genderOptions = [
  { value: 'Male', label: 'Мужчина' },
  { value: 'Female', label: 'Женщина' },
  { value: 'Unknown', label: 'Не скажу' },
];
const RegisterDetailsForm = ({ email, onSubmit, next }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: 'onChange', defaultValues: { displayName: email.split('@')[0] } });

  const handleFormSubmit = async (data) => {
    await onSubmit(data, next);
  };

  return (
    <form onSubmit={ handleSubmit(handleFormSubmit) } className='flex flex-col justify-between h-full'>
      <div className='space-y-5'>
        <div>
          <Input
            id='displayName'
            type='text'
            placeholder='Ваше отображаемое имя'
            className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.displayName ? 'border-red-500' : 'border-gray-300' }` }
            { ...register('displayName', {
              required: 'Укажите ваше отображаемое имя',
            }) }
          />
          { errors.displayName && <FieldError error={ errors.displayName.message } /> }
        </div>
        <div>
          <Input
            id='age'
            type='number'
            placeholder='Ваш возраст'
            className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.age ? 'border-red-500' : 'border-gray-300' }` }
            { ...register('age', {
              required: 'Укажите ваш возраст',
              min: {
                value: 12,
                message: 'Возраст не соответствуете минимальным требованиям',
              },
            }) }
          />
          { errors.age && <FieldError error={ errors.age.message } /> }
        </div>
        <div>
          <Controller name='gender'
                      control={ control }
                      rules={ { required: 'Укажите пол' } }
                      render={ ({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                          <Select
                            classNamePrefix='react-select'
                            placeholder={ 'Выберите пол' }
                            options={ genderOptions }
                            value={ genderOptions.find((option) => option.value === value) }
                            onChange={ (selectedOption) => onChange(selectedOption?.value) }
                          />
                          { error && <FieldError error={ error.message } /> }
                        </>
                      ) }>
          </Controller>
        </div>
        <div className='flex items-center justify-between'>
          <Controller name='isDefaultProfileImages'
                      control={ control }
                      render={ ({ field: { onChange, value } }) => (
                        <Checkbox
                          label='Сгенерировать аватар профиля'
                          checked={ value }
                          onChange={ (e) => onChange(e.target.checked) }
                        />
                      ) }
          />
          <Tooltip
            content={ 'Создать случайный аватар и задний фон для вашего профиля или установить их по умолчнию' }>
            <MaskedIcon src='/info.svg' className='cursor-pointer text-gray-500 w-[18px] h-[18px]' />
          </Tooltip>
        </div>
      </div>
      <ActionButton className='w-full h-[36px]' isOutline={ true } isLoading={ isSubmitting }>
        Зарегистрироваться
      </ActionButton>
    </form>
  );
};

export default RegisterDetailsForm;
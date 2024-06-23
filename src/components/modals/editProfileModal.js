'use client';

import React from 'react';
import modalNames from '@/constants/modalNames';
import Modal from '@/components/modals/modal';
import useModal from '@/hooks/useModal';
import { useForm } from 'react-hook-form';
import { useUser } from '@/services/client/queries/userQueries';
import { useAuth } from '@/hoc/authContext';

const EditProfileModal = () => {
  const { isOpen, close } = useModal(modalNames.EDIT_PROFILE_MODAL);

  const { userId } = useAuth();
  const { data, error, isLoading } = useUser(userId);

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ mode: 'onChange' });

  const handleChangeOpen = (isOpen) => {
    if (!isOpen)
      close();
  };

  return (
    <Modal modalName={ modalNames.EDIT_PROFILE_MODAL }
           isOpen={ isOpen }
           title='Редактировать профиль'
           onChange={ handleChangeOpen }
           height={ null }>
      <form>
        <div className='flex justify-center mb-4'>
          <div className='relative'>
            <img
              src='https://via.placeholder.com/120'
              alt='Profile'
              className='w-32 h-32 rounded-full object-cover'
            />
            <label
              className='absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm px-3 py-1 rounded-md cursor-pointer'>
              Обновить фото
              <input type='file' className='hidden' { ...register('profileImage') } />
            </label>
          </div>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Имя профиля *</label>
          <input
            type='text'
            { ...register('profileName', { required: 'Имя профиля обязательно' }) }
            className={ `w-full p-2 border rounded-md ${ errors.profileName ? 'border-red-500' : 'border-gray-300' }` }
            placeholder='Имя профиля *'
          />
          { errors.profileName && <span className='text-red-500 text-sm'>{ errors.profileName.message }</span> }
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Описание профиля</label>
          <textarea
            { ...register('profileDescription') }
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Расскажите немного о себе'
          />
        </div>
        <div className='flex justify-between'>
          <button
            type='button'
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
          >
            Отмена
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
            disabled={ !isDirty || !isValid }
          >
            Сохранить изменения
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
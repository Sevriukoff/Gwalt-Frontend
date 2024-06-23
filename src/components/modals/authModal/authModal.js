'use client';

import React, { useRef, useState } from 'react';
import Modal from '@/components/modals/modal';
import modalNames from '@/constants/modalNames';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import LoaderSpin from '@/components/loaderSpin';
import { useAuth } from '@/hoc/authContext';
import fetchRest from '@/services/common/fetchRest';
import Wizard from '@/components/wizard';
import MaskedIcon from '@/components/maskedIcon';
import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';

const WrapLoader = () => {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <LoaderSpin />
    </div>
  );
};

const CheckEmailForm = dynamic(() => import('@/components/modals/authModal/checkEmailFrom'), {
  loading: () => <LoaderSpin />,
});
const LoginForm = dynamic(() => import('@/components/modals/authModal/loginForm'), { loading: () => <WrapLoader /> });
const RegisterPasswordForm = dynamic(() => import('@/components/modals/authModal/registerPasswordForm'), {
  loading: () => <WrapLoader />,
});
const RegisterDetailsForm = dynamic(() => import('@/components/modals/authModal/registerDetailsForm'), {
  loading: () => <WrapLoader />,
});


const AuthModal = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Добро пожаловать');
  const password = useRef('');

  const router = useRouter();
  const { isOpen, close } = useModal(modalNames.AUTH_MODAL);
  const { setIsAuthenticated, setUserId } = useAuth();

  const handleEmailSubmit = async (data, next) => {
    try {
      const response = await fetch('http://localhost:5135/api/v1/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      setEmail(data.email);

      if (result.exists) {
        next(1);
      } else {
        next(2);
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(`Ошибка. Попробуйте позже`);
    }
  };

  const handleLoginSubmit = async (data, next) => {
    try {
      const response = await loginAsync(email, data.password);
      if (response) {
        close();
        toast.success('Успешно');
        router.replace(router.asPath);
      } else {
        toast.error(`Неверный логин или пароль`);
      }

    } catch (error) {
      toast.error(`Ошибка. Попробуйте позже`);
    }
  };

  const handleRegisterSubmit = async (data, next) => {
    password.current = data.password;
    next(3);
  };

  const handleRegisterDetailsSubmit = async (data, next) => {
    const user = {
      name: data.displayName,
      email: email,
      password: password.current,
      gender: data.gender,
      age: data.age,
      isDefaultProfileImages: data.isDefaultProfileImages,
    };

    try {
      const response = await fetchRest('/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast.success('Аккаунт создан');
        const loginPromise = loginAsync(user.email, user.password);
        await toast.promise(loginPromise, {
          loading: 'Вход в аккаунт',
          success: () => {
            close();
            return 'Успешно';
          },
          error: 'Ошибка. Попробуйте позже',
        });
      } else {
        toast.error(`Ошибка. Попробуйте позже`);
      }
    } catch (error) {

    }
  };

  const handleChangeOpen = (isOpen) => {
    if (!isOpen)
      close();
  };

  const loginAsync = async (email, password) => {
    const response = await fetchRest('/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: email, Password: password }),
    });

    if (response.ok) {
      const data = await response.json();
      setIsAuthenticated(true);
      setUserId(data.userId);
    }

    return response.ok;
  };

  return (
    <Modal modalName={ modalNames.AUTH_MODAL } isOpen={ isOpen } title={ title } description='Введите свои данные ниже'
           onChange={ handleChangeOpen } height={ null }>
      <Wizard initialStep={ 0 }>
        <Wizard.Step className='h-[230px] relative'>
          <CheckEmailForm setTitle={ setTitle } onSubmit={ handleEmailSubmit } />
        </Wizard.Step>
        <Wizard.Step className='h-[250px] relative'>
          <LoginForm setTitle={ setTitle } email={ email } onSubmit={ handleLoginSubmit } />
        </Wizard.Step>
        <Wizard.Step className='h-[280px] relative'>
          <RegisterPasswordForm setTitle={ setTitle } email={ email } onSubmit={ handleRegisterSubmit } />
        </Wizard.Step>
        <Wizard.Step className='h-[350px] relative'>
          <RegisterDetailsForm email={ email } onSubmit={ handleRegisterDetailsSubmit } />
        </Wizard.Step>
        <Wizard.Back>
          <button
            className='absolute top-2 left-2 inline-flex bg-transparent hover:bg-white rounded-full p-1.5 group appearance-none items-center justify-center'>
            <MaskedIcon src='/back-arrow.svg'
                        className='w-3.5 h-3.5 text-textDefault group-hover:text-accentPurple' />
          </button>
        </Wizard.Back>
      </Wizard>
    </Modal>
  );
};

export default AuthModal;
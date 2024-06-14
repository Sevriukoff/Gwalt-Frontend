'use client';

import React, { useState } from 'react';
import Modal from '@/components/modal';
import modalNames from '@/app/constants/modalNames';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import LoaderSpin from '@/components/loaderSpin';
import { useAuth } from '@/hoc/authContext';
import fetchRest from '@/utils/common/fetchRest';

const CheckEmailForm = dynamic(() => import('@/components/authModal/checkEmailFrom'), {
  loading: () => <LoaderSpin />,
});
const LoginForm = dynamic(() => import('@/components/authModal/loginForm'), { loading: () => <LoaderSpin /> });
const RegisterForm = dynamic(() => import('@/components/authModal/registerForm'), { loading: () => <LoaderSpin /> });


const AuthModal = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const { setIsAuthenticated, setUserId } = useAuth();

  const onSubmitEmail = async (data) => {
    try {
      const response = await fetch('http://localhost:5135/api/v1/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (result.exists) {
        setEmail(data.email);
        setStep(2);
      } else {
        setEmail(data.email);
        setStep(3);
      }
    } catch (error) {
      toast.error(`Ошибка. Попробуйте позже`);
    }
  };

  const onSubmitLogin = async (data) => {
    console.log('Login data:', data);

    try {
      const response = await fetchRest('/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: data.password }),
      });

      if (response.ok) {
        const data = await response.json();

        setIsAuthenticated(true);
        setUserId(data.userId);

        toast.success('Успешно');
      } else {
        toast.error(`Ошибка. Попробуйте позже`);
      }
    } catch (error) {
      toast.error(`Ошибка. Попробуйте позже`);
    }
  };

  const onSubmitRegister = (data) => {
    console.log('Register data:', data);
    // Логика для регистрации
  };

  const handleChangeOpen = (isOpen) => {
    if (!isOpen)
      setStep(1);
  };

  return (
    <Modal modalName={ modalNames.AUTH_MODAL } title='Добро пожаловать' description='Введите свои данные ниже'
           onChange={ handleChangeOpen }>
      { step === 1 && <CheckEmailForm onSubmit={ onSubmitEmail } /> }
      { step === 2 && <LoginForm email={ email } onSubmit={ onSubmitLogin } /> }
      { step === 3 && <RegisterForm email={ email } onSubmit={ onSubmitRegister } /> }
    </Modal>
  );
};

export default AuthModal;
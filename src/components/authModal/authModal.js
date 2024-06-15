'use client';

import React, { useState } from 'react';
import Modal from '@/components/modal';
import modalNames from '@/app/constants/modalNames';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import LoaderSpin from '@/components/loaderSpin';
import { useAuth } from '@/hoc/authContext';
import fetchRest from '@/utils/common/fetchRest';
import Wizard from '@/components/wizard';
import MaskedIcon from '@/components/maskedIcon';

const CheckEmailForm = dynamic(() => import('@/components/authModal/checkEmailFrom'), {
  loading: () => <LoaderSpin />,
});
const LoginForm = dynamic(() => import('@/components/authModal/loginForm'), { loading: () => <LoaderSpin /> });
const RegisterForm = dynamic(() => import('@/components/authModal/registerForm'), { loading: () => <LoaderSpin /> });
const RegisterDetailsForm = dynamic(() => import('@/components/authModal/registerDetailsForm'), {
  loading: () => <LoaderSpin />,
});


const AuthModal = () => {
  //const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

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

      if (result.exists) {
        setEmail(data.email);
        next(1);
      } else {
        setEmail(data.email);
        next(2);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Ошибка. Попробуйте позже`);
    }
  };

  const handleLoginSubmit = async (data, next) => {
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

  const handleRegisterSubmit = async (data, next) => {
    console.log('Register data:', data);

    try {
      const response = await fetchRest('/v1/users', {
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

  const handleRegisterDetailsSubmit = async (data, next) => {
    console.log('User info data:', data);
  };

  const handleChangeOpen = (isOpen) => {
    //if (!isOpen)
    //setStep(1);
  };

  return (
    <Modal modalName={ modalNames.AUTH_MODAL } title='Добро пожаловать' description='Введите свои данные ниже'
           onChange={ handleChangeOpen }>
      <Wizard initialStep={ 0 }>
        <Wizard.Step>
          <CheckEmailForm onSubmit={ handleEmailSubmit } />
        </Wizard.Step>
        <Wizard.Step>
          <LoginForm email={ email } onSubmit={ handleLoginSubmit } />
        </Wizard.Step>
        <Wizard.Step>
          <RegisterForm email={ email } onSubmit={ handleRegisterSubmit } />
        </Wizard.Step>
        <Wizard.Step>
          <RegisterDetailsForm onSubmit={ handleRegisterDetailsSubmit } />
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
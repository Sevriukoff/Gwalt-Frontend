'use client'

import React, {useState} from 'react';
import Modal from 'react-modal';
import {sha256} from "js-sha256";
import {useAuth} from "@/components/authProvider";

const ModalLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(() => localStorage.getItem('isAuth') ? localStorage.getItem('isAuth') > 0 : false)
    const [showModal, setShowModal] = useState(false);

    const { performLogin } = useAuth()
    console.log(password)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '400px',
            width: '400px'
        },
    };

    async function getData(){
        const response = await fetch('http://localhost:3000/api/users');

        return response.json();
    }

    async function submitLogin(){
        const users = await getData();
        const foundUser = users.find(item => item.Email === email && item.PasswordHash === sha256(password));

        if (foundUser){
            performLogin(foundUser.UserID)
            setLoginSuccess(true);
        }
    }

    function isValidEmail(email) {
        // Регулярное выражение для проверки формата электронной почты
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Проверка соответствия строки формату электронной почты
        return emailRegex.test(email);
    }

    return (
        <>
            <button className='border-[1px] border-[#666] rounded h-[28px] px-2 py-[1px] text-white hover:border-gray-300 ease-in duration-100' onClick={() => setShowModal(true)}>Войти</button>
            <Modal isOpen={showModal} style={customStyles}>
                <div className='flex flex-col gap-3 justify-between h-full'>
                    <button className='absolute top-[8px] right-[4px] w-[20px] h-[20px] indent-[20px] overflow-hidden bg-no-repeat bg-[length:85%] bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+Q2xvc2U8L3RpdGxlPjxwYXRoIGQ9Ik0xMCA4LjU0NUwzLjQ1NSAyIDIgMy40NTUgOC41NDUgMTAgMiAxNi41NDUgMy40NTUgMTggMTAgMTEuNDU1IDE2LjU0NSAxOCAxOCAxNi41NDUgMTEuNDU1IDEwIDE4IDMuNDU1IDE2LjU0NSAyIDEwIDguNTQ1eiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+Cg==)]' onClick={() => setShowModal(false)}>Close</button>
                    <h2 className='text-center text-2xl font-medium border-b pb-5'>Авторизация</h2>
                    {
                        loginSuccess
                            ?
                            <p className='text-2xl text-center my-auto'>Успешно</p>
                            :
                            <>
                                <div className='flex flex-col gap-3'>
                                    <input className='border-2 rounded px-3 py-2' placeholder='Ваша почта или логин' onChange={(e) => setEmail(e.target.value)}/>
                                    <input className='border-2 rounded px-3 py-2' placeholder='Ваш пароль' onChange={(e) => setPassword(e.target.value)}/>
                                    <button className='bg-[#9388D8] text-white rounded p-2 disabled:bg-[#999] hover:bg-[#8476DD] ease-in duration-100' disabled={!(password.length >= 3 && isValidEmail(email))} onClick={submitLogin}>Продолжить</button>
                                </div>
                                <p className='text-xs text-[#999]'>
                                    Регистрируясь, вы соглашаетесь с тем, что мы можем использовать предоставленные
                                    вами данные для регистрации и отправки вам уведомлений о наших продуктах и услугах.
                                    Вы можете отказаться от подписки на уведомления в любое время в своих настройках.
                                </p>
                            </>
                    }
                </div>
            </Modal>
        </>
    );
};

export default ModalLogin;
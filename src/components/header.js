'use client'

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import ModalLogin from "@/components/modalLogin";
import RegModal from "@/components/regModal";
import {useRouter} from "next/navigation";
import {useAuth} from "@/components/authProvider";

async function getUser(id){
    const response = await fetch(`/api/users/${id}`);

    return await response.json();
}

const getImageBlob = async (path) => {
    const response = await fetch(`/api/image/?path=${path}`)

    return response.blob()
}

const Header = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false)
    const [loggedUserAvatar, setLoggedUserAvatar] = useState('')

    const { addLogoutCallback, addLoginCallback } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser(localStorage.getItem('isAuth'));

            const userAvatarBlob = await getImageBlob(user[0].AvatarUrl);
            const userAvatarUrl = URL.createObjectURL(userAvatarBlob);
            setLoggedUserAvatar(userAvatarUrl)
        }

        fetchData()
        setIsLogin(localStorage.getItem('isAuth') ? localStorage.getItem('isAuth') > 0 : false)

    }, []);

    useEffect(() => {
        const handleLogout = () => {
            setIsLogin(false)
        };

        const handleLogin = () => {
            setIsLogin(true)
        };

        addLogoutCallback(handleLogout);
        addLoginCallback(handleLogin)
    }, [addLogoutCallback, addLoginCallback]);

    return (
        <header className='bg-[#333] border-b-2 border-b-[#ccc] font-light text-sm'>
            <div className='max-w-[1140px] mx-auto my-0'>
                <nav className='grid grid-cols-[auto_1.2fr_1fr] gap-3'>
                    <div className='flex'>
                        <div className='bg-black flex items-center px-2'>
                            <a className='my-auto'>
                                <img src='/logo.svg' alt='logo' width='120px'/>
                            </a>
                        </div>
                        <ul className='flex divide-x divide-[#111]'>
                            <li><Link className='text-center box-border block w-[104px] text-[#ccc] py-3 hover:text-white ease-in duration-100' href="/">Главная</Link></li>
                            <li><Link className='text-center box-border block w-[104px] text-[#ccc] py-3 hover:text-white ease-in duration-100' href="/feed">Лента</Link></li>
                            <li><Link className='text-center box-border block w-[104px] text-[#ccc] border-r-black border-r-[1px] py-3 hover:text-white ease-in duration-100' href="/library">Фонотека</Link></li>
                        </ul>
                    </div>
                    <div className='my-auto relative'>
                        <input className='rounded w-full h-[27px] px-2 bg-[#e5e5e5]' placeholder='Поиск аристов, треков, альбомов'/>
                        <button className='absolute right-[13px] top-[7px] w-[15px] h-[15px] bg-[url(https://a-v2.sndcdn.com/assets/images/search-dbfe5cbb.svg)]'/>
                    </div>
                    <div className={`flex ${isLogin && 'flex-row-reverse'} items-center gap-5`}>
                        {
                            isLogin
                                ?
                                <>
                                    <img className='w-[36px] h-[36px] object-cover rounded-full cursor-pointer' src={loggedUserAvatar} alt='avatar' onClick={ () => router.push(`/users/${localStorage.getItem('isAuth')}`)}/>
                                </>
                                :
                                <>
                                    <ModalLogin/>
                                    <RegModal/>
                                </>
                        }
                        <button className='text-[#ccc] hover:text-white ease-in duration-100'>Загрузить</button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
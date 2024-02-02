'use client'

import Track from "@/components/track";
import IconBtn from "@/components/iconBtn";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/components/authProvider";

async function getUser(id){
    const response = await fetch(`/api/users/${id}`);

    return await response.json();
}

async function getTracksByUserId(id){
    const response = await fetch(`/api/tracks/${id}`);

    return await response.json();
}

const getImageBlob = async (path) => {
    const response = await fetch(`/api/image/?path=${path}`)

    return response.blob()
}

const userProfile = ( { params: { id } } ) => {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('');
    const [background, setBackground] = useState('');

    const [tracks, setTracks] = useState([]);

    const [isLogin, setIsLogin] = useState(() => localStorage.getItem('isAuth') ? localStorage.getItem('isAuth') > 0 : false)
    const { performLogout, addLogoutCallback, addLoginCallback } = useAuth()

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

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser(id);
            setUser(user[0])

            const userAvatarBlob = await getImageBlob(user[0].AvatarUrl);
            const userAvatarUrl = URL.createObjectURL(userAvatarBlob);
            setAvatar(userAvatarUrl)

            const userBackgroundBlob = await getImageBlob(user[0].BackgroundUrl);
            const userBackgroundUrl = URL.createObjectURL(userBackgroundBlob);
            setBackground(userBackgroundUrl)

            const tracks = await getTracksByUserId(id)
            setTracks(tracks)
        }

        fetchData()
    }, []);

    return (
        <>
            <div>
                <div
                    className='h-[260px] p-8'
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className='flex justify-center gap-10'>
                        <img className='rounded-[100%] h-[200px] object-cover' src={avatar} width='200px' height='200px' alt='avatar' />
                        <div className='flex flex-col justify-center gap-3'>
                            <h2 className='text-2xl text-white bg-black bg-opacity-80 px-2 py-1'>{user.Username}</h2>
                            <h3 className='text-sm text-white bg-black bg-opacity-80 px-2 py-1'>{user.ShortDescription}</h3>
                        </div>
                    </div>
                </div>
            </div>


            <div className='max-w-[1100px] mx-auto mt-3'>
                <div className='flex justify-between border-b-[1px] border-solid border-b-[#f2]'>
                    <ul className='flex gap-5 text-[#333] text-lg font-medium'>
                        <li className=''><a className='pb-3 block text-[#9388D8] border-b-[#9388D8] box-border border-b-[2px]' href="#">Все</a></li>
                        <li><a className='' href="#">Популярные треки</a></li>
                        <li><a className='' href="#">Треки</a></li>
                        <li><a className='' href="#">Плейлисты</a></li>
                        <li><a className='' href="#">Репосты</a></li>
                    </ul>
                    <div className='flex items-center gap-3 pb-3'>
                        <IconBtn icon={<img src='https://a-v2.sndcdn.com/assets/images/start-station-ea018c5a.svg' height='21' width='21' alt='play'/>} text={'Станция'} textSize={14} fontWeight={300}/>
                        <IconBtn icon={<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8cGF0aCBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTUuNTQyIDEuMTY3YzIuNzcgMCAzLjM4NiAyLjkxNiAyLjE1NSA2LjEyNSAzLjE2OSAxLjMwOCAzLjM4NiAzLjk3NyAzLjM4NiA0Ljk1OEgwYzAtLjk4MS4yMTgtMy42NSAzLjM4Ny00Ljk1OC0xLjIzMi0zLjIxOC0uNjE2LTYuMTI1IDIuMTU1LTYuMTI1em0wIDEuMTY2Yy0xLjU4NCAwLTIuMTI3IDEuNzctMS4wNjYgNC41NDIuMjI2LjU5LS4wNiAxLjI1NC0uNjQ0IDEuNDk1LTEuNTE3LjYyNi0yLjI2MyAxLjU3Mi0yLjUzNyAyLjcxM2g4LjQ5NGMtLjI3NS0xLjE0MS0xLjAyLTIuMDg3LTIuNTM3LTIuNzEzYTEuMTY3IDEuMTY3IDAgMCAxLS42NDQtMS40OTZjMS4wNi0yLjc2NC41MTYtNC41NC0xLjA2Ni00LjU0em02LjQxNC0uNTgzYy4xNyAwIC4yOTQuMTMuMjk0LjI5MlYzLjVoMS40NThjLjE1NyAwIC4yOTIuMTMyLjI5Mi4yOTR2LjU3OGMwIC4xNy0uMTMuMjk1LS4yOTIuMjk1SDEyLjI1djEuNDU4YS4yOTYuMjk2IDAgMCAxLS4yOTQuMjkyaC0uNTc4YS4yODkuMjg5IDAgMCAxLS4yOTUtLjI5MlY0LjY2N0g5LjYyNWEuMjk2LjI5NiAwIDAgMS0uMjkyLS4yOTV2LS41NzhjMC0uMTcuMTMxLS4yOTQuMjkyLS4yOTRoMS40NThWMi4wNDJjMC0uMTU3LjEzMi0uMjkyLjI5NS0uMjkyaC41Nzh6Ii8+Cjwvc3ZnPgo=' height='16' width='16' alt='play'/>} text={'Отслеживать'} textSize={14} fontWeight={300} isOutlined={false}/>
                        <IconBtn icon={<img src='https://a-v2.sndcdn.com/assets/images/share-e2febe1d.svg' height='18' width='18' alt='play'/>} text={'Поделиться'} textSize={14} fontWeight={300}/>
                    </div>
                </div>
                <div className='grid grid-cols-[3fr_1fr] grid-rows-[auto_auto_auto] mt-5'>
                    <div className='flex flex-col gap-10 row-start-1 row-span-3 pr-10 border-r'>
                        {
                            tracks.map(t =>
                                <Track id={t.TrackID} imgUrl={t.ImageUrl} audioUrl={t.AudioUrl} author={user.Username} title={t.Title} date={t.ReleaseDate} genres={t.GenreList} like={t.Likes} share={t.Shares} comment={t.Comments} playCount={t.Plays}/>)
                        }
                    </div>
                    <div className='row-start-1 pl-5'>
                        <div className='flex gap-3 text-xl text-[#999] leading-5'>
                            <div className='border-r pr-10'>
                                <h3 className='text-[12px]'>Отслеживают</h3>
                                <span>112</span>
                            </div>
                            <div className='border-r pr-10'>
                                <h3 className='text-[12px]'>Отслеживает</h3>
                                <span>112</span>
                            </div>
                            <div className=''>
                                <h3 className='text-[12px]'>Треки</h3>
                                <span>112</span>
                            </div>
                        </div>
                        <p className='mt-3 text-sm text-[#999]'>{user.Description}</p>
                        <ul className='flex flex-col gap-1 text-[12px] text-[#999] mt-3'>
                            <li className='flex gap-1'>
                                <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c2gtd2Vic2l0ZS0xNi1jb2xvcjwvdGl0bGU+PHBhdGggZD0iTTggMkM0LjY4OCAyIDIgNC42ODggMiA4czIuNjg4IDYgNiA2IDYtMi42ODggNi02LTIuNjg4LTYtNi02em0tLjYgMTAuNzU4QTQuNzkzIDQuNzkzIDAgMCAxIDMuMiA4YzAtLjM3Mi4wNDgtLjcyNi4xMjYtMS4wNzRMNi4yIDkuOHYuNmMwIC42Ni41NCAxLjIgMS4yIDEuMnYxLjE1OHptNC4xNC0xLjUyNGExLjE5IDEuMTkgMCAwIDAtMS4xNC0uODM0aC0uNlY4LjZjMC0uMzMtLjI3LS42LS42LS42SDUuNlY2LjhoMS4yYy4zMyAwIC42LS4yNy42LS42VjVoMS4yYy42NiAwIDEuMi0uNTQgMS4yLTEuMnYtLjI0NmMxLjc1OC43MTQgMyAyLjQzNiAzIDQuNDQ2IDAgMS4yNDgtLjQ4IDIuMzgyLTEuMjYgMy4yMzR6IiBmaWxsPSIjNjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4='/>
                                <a href="#">web site</a>
                            </li>
                            <li className='flex gap-1'>
                                <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c2gtdHdpdHRlci1ncmF5PC90aXRsZT48cGF0aCBkPSJNMTIuNzI0IDQuMTQ3YTQuMDkgNC4wOSAwIDAgMS0xLjMwMy40OUEyLjA3MSAyLjA3MSAwIDAgMCA5LjkyNCA0Yy0xLjEzMyAwLTIuMDUyLjkwMy0yLjA1MiAyLjAyIDAgLjE1Ny4wMTguMzEzLjA1My40NmE1Ljg2IDUuODYgMCAwIDEtNC4yMjktMi4xMSAxLjk4IDEuOTggMCAwIDAtLjI3OCAxLjAxN2MwIC43LjM2MyAxLjMxNi45MTMgMS42OGEyLjA4IDIuMDggMCAwIDEtLjkyOS0uMjU0di4wMjdjMCAuOTc3LjcwNyAxLjc5MyAxLjY0NiAxLjk4YTIuMDY4IDIuMDY4IDAgMCAxLS45MjcuMDMzIDIuMDUgMi4wNSAwIDAgMCAxLjkxNyAxLjQwNCA0LjE2OSA0LjE2OSAwIDAgMS0yLjU0OS44NjNjLS4xNjYgMC0uMzI5LS4wMS0uNDktLjAyN0E1Ljg3NiA1Ljg3NiAwIDAgMCA2LjE0NSAxMmMzLjc3NCAwIDUuODM3LTMuMDc3IDUuODM3LTUuNzQ3IDAtLjA4Ni0uMDAxLS4xNzMtLjAwNS0uMjYuNC0uMjg2Ljc0OS0uNjQgMS4wMjMtMS4wNDYtLjM2Ny4xNi0uNzYzLjI3LTEuMTc4LjMxNi40MjQtLjI0Ni43NDktLjY0My45MDItMS4xMTYiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=='/>
                                <a href="#">Twitter</a>
                            </li>
                            <li className='flex gap-1'>
                                <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c2gteXQtZ3JheTwvdGl0bGU+PHBhdGggZD0iTTEuMTQgNS41MjVzLjEzNy0xLjAwOC41NTYtMS40NTRjLjUzMi0uNTg0IDEuMjMzLS41NjYgMS41NDQtLjYyN0M0LjM2IDMuMzMgOCAzLjI5NyA4IDMuMjk3czIuOTQyLjAwNCA0LjkuMTUyYy4yNzUuMDM1Ljg3MS4wMzcgMS40MDMuNjIyLjQyLjQ0NS41NTcgMS40NTUuNTU3IDEuNDU1UzE1IDYuNzEzIDE1IDcuOTAxdjEuMTUzYzAgMS4xODgtLjE0IDIuMzc0LS4xNCAyLjM3NHMtLjEzNiAxLjAxLS41NTYgMS40NTVjLS41MzMuNTg1LTEuMTMuNTg3LTEuNDA0LjYyMi0xLjk1OC4xNDgtNC45LjE1Mi00LjkuMTUycy0zLjY0LS4wMzQtNC43Ni0uMTQ2Yy0uMzEyLS4wNjItMS4wMTItLjA0NC0xLjU0NC0uNjI3LS40Mi0uNDQ3LS41NTYtMS40NTUtLjU1Ni0xLjQ1NVMxIDEwLjI0MiAxIDkuMDU1VjcuOWMwLTEuMTg3LjE0LTIuMzc1LjE0LTIuMzc1em01LjQxNS43NTdsMy43ODIgMi4wNjctMy43OCAyLjA1My0uMDAzLTQuMTJ6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4='/>
                                <a href="#">Youtube</a>
                            </li>
                        </ul>
                    </div>
                    {
                        (id === localStorage.getItem('isAuth'))
                        &&
                        <div className='flex gap-3 row-start-2 ml-5 mt-5 py-5 border-t'>
                            <IconBtn onClick={() => {setIsLogin(false); performLogout()}} icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" d="M15 3.001a1 1 0 1 1 0 2H6v13a1 1 0 0 0 1 1h8a1 1 0 1 1 0 2H7a3 3 0 0 1-3-3v-14a1 1 0 0 1 1-1zm1.707 5.293A1 1 0 0 0 15 9v2H9a1 1 0 1 0 0 2h6v2a1 1 0 0 0 1.707.707l3-3a1 1 0 0 0 0-1.414z" clipRule="evenodd"></path></svg>} text={'Выйти'} textSize={14} fontWeight={300} isOutlined={false}/>
                            <IconBtn onClick={() => {setIsLogin(false); performLogout()}} icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" d="M15 3.001a1 1 0 1 1 0 2H6v13a1 1 0 0 0 1 1h8a1 1 0 1 1 0 2H7a3 3 0 0 1-3-3v-14a1 1 0 0 1 1-1zm1.707 5.293A1 1 0 0 0 15 9v2H9a1 1 0 1 0 0 2h6v2a1 1 0 0 0 1.707.707l3-3a1 1 0 0 0 0-1.414z" clipRule="evenodd"></path></svg>} text={'Настройки'} textSize={14} fontWeight={300} isOutlined={false}/>
                        </div>
                    }
                </div>
            </div>
        </>
    )
};

export default userProfile;
'use client'

import React, {useEffect, useState} from 'react';
import ModalLogin from "@/components/modalLogin";
import RegModal from "@/components/regModal";
import Link from "next/link";
import Image from "next/image";
import {useAuth} from "@/hoc/authContext";

const ClientHeader = () => {
  const { isAuthenticated, userId } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:5135/api/v1/users/${userId}`, { credentials: 'include' });
      const user = await response.json();

      console.log(user)

      setAvatarUrl(user.avatarUrl)
    }

    fetchUser()
  }, [userId]);

  return (
      <div className="flex items-center justify-end gap-5">
        {isAuthenticated ? (
            <>
              <Link href={'/upload'}>
                <button className="text-[#ccc] hover:text-white ease-in duration-100">Загрузить</button>
              </Link>
              <button className="text-[#ccc] hover:text-white ease-in duration-100">Настройки</button>
              <Link href={`/users/${userId}`}>
                <Image src={avatarUrl} width={30} height={30} alt="User Avatar" className="rounded-full cursor-pointer" />
              </Link>
            </>
        ) : (
            <>
              <ModalLogin />
              <RegModal />
            </>
        )}
      </div>
  );
};

export default ClientHeader;
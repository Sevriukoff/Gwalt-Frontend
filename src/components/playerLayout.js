'use client';

import React, { useEffect } from 'react';
import useMusicPlayer from "@/hooks/useMusicPlayer";

const PlayerLayout = ({ children }) => {
  const isPlayerActive = useMusicPlayer((state) => state.activeId);

  return (
      <div className={`container max-w-[1450px] h-full mx-auto px-8 ${isPlayerActive ? 'pb-[50px]' : 'pb-0'}`}>
        {children}
      </div>
  )
};

export default PlayerLayout;

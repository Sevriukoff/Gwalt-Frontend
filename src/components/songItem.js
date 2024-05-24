import React from 'react';
import MaskedIcon from "@/components/maskedIcon";
import Image from "next/image";

const SongItem = ({ song }) => {
  return (
      <div className="flex gap-3">
        <Image className='py-1 max-h-[50px] box-content' src='/b.jpg' alt='cover' height={50} width={50}/>

        <div className="mt-1">
          <p className="text-sm text-[#999] leading-none">{song.artist}</p>
          <p className="text-sm mb-1">{song.title}</p>

          <div className="flex gap-3 text-[11px] text-gray-500">

            <div className="flex gap-3 text-xs text-[#999]">
              <IconWithText iconSrc='/play.svg' text={song.plays} iconClass="w-3 h-3" />
              <IconWithText iconSrc='/like.svg' text={song.likes} iconClass="w-3 h-3" />
              <IconWithText iconSrc='/repost.svg' text={song.shares} iconClass="w-4 h-3" />
              <IconWithText iconSrc='/comment.svg' text={song.comments} iconClass="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
  );
};

const IconWithText = ({ iconSrc, text, iconClass }) => (
    <div className="flex gap-1 items-center">
      <MaskedIcon src={iconSrc} alt="icon" className={`text-[#999] ${iconClass}`} />
      <span>{text}</span>
    </div>
);

export default SongItem;
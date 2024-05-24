import React from 'react';
import TracksBlock from "@/components/tracksBlock";
import SongItem from "@/components/songItem";
import MaskedIcon from "@/components/maskedIcon";

const songs = [
  {
    cover: 'https://storage.yandexcloud.net/id-gwalt-storage/image/1ae609b2-2b95-4d01-a3d1-632faaab8d06-20240517053259-968865.jpeg',
    artist: 'Billie Eilish',
    title: 'lovely',
    plays: '73.2M',
    likes: '1M',
    shares: '26.3K',
    comments: '33.5K',
  },
  {
    cover: 'https://storage.yandexcloud.net/id-gwalt-storage/image/1ae609b2-2b95-4d01-a3d1-632faaab8d06-20240517053259-968865.jpeg',
    artist: 'Silas',
    title: 'I Wanna Be Yours',
    plays: '10.6M',
    likes: '192K',
    shares: '1,529',
    comments: '5,801',
  },
  {
    cover: 'https://storage.yandexcloud.net/id-gwalt-storage/image/1ae609b2-2b95-4d01-a3d1-632faaab8d06-20240517053259-968865.jpeg',
    artist: 'Billie Eilish',
    title: 'Happier Than Ever',
    plays: '15M',
    likes: '239K',
    shares: '4,359',
    comments: '14.6K',
  },
];

const RightSide = () => {
  return (
      <div className='top-6 right-0'>
        <div className='flex flex-col gap-6'>
          <TracksBlock
              icon={(<MaskedIcon src='/like.svg' alt='like-icon' className='text-[#999] w-4 h-4'/>)}
              title='Понравившиеся'
              songs={[songs[0]]}/>
          <TracksBlock
              icon={(<MaskedIcon src='/calendar.svg' alt='calendar-icon' className='text-[#999] w-4 h-4'/>)}
              title='Прослушанные'
              songs={songs}/>
        </div>
      </div>
  );
};

export default RightSide;
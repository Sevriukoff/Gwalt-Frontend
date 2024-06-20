'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MaskedIcon from '@/components/maskedIcon';
import TrackUpload from '@/components/trackUpload';
import { base64ToFile } from '@/utils/common/files';

const PlaylistEdit = ({ selectedFiles }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackData, setTrackData] = useState(selectedFiles.map(file => ({
    title: file.name,
    isExplicit: false,
    genres: [],
    binary: file,
    audioUrl: '',
    duration: -1,
    albumId: -1,
    uploading: false,
    uploadProgress: 0,
  })));

  useEffect(() => {
    fetchGenres();
    trackData.forEach((track, index) => {
      const audio = new Audio(URL.createObjectURL(track.binary));
      audio.addEventListener('loadedmetadata', () => {
        const updatedTracks = [...trackData];
        updatedTracks[index].duration = Math.round(audio.duration);
        setTrackData(updatedTracks);
      });
    });
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch('/api/genres');
      const data = await response.json();
      setGenres(data.map(genre => ({ value: genre.id, label: genre.name })));
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTrackNameChange = (index, newName) => {
    const updatedTracks = [...trackData];
    updatedTracks[index].title = newName;
    setTrackData(updatedTracks);
  };

  const handleIsExplicitChange = (index) => {
    const updatedTracks = [...trackData];
    updatedTracks[index].isExplicit = !updatedTracks[index].isExplicit;
    setTrackData(updatedTracks);
  };

  const handleGenreChange = (index, selectedOptions) => {
    const updatedTracks = [...trackData];
    updatedTracks[index].genres = selectedOptions.map(option => option.value);
    setTrackData(updatedTracks);
  };

  const getCurrentUTCDate = () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // месяцы начинаются с 0
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');

    return `${ year }-${ month }-${ day }T${ hours }:${ minutes }:${ seconds }.${ milliseconds }Z`;
  };

  const getIdFromHeaders = (response) => {
    const locationHeader = response.headers.get('Location');
    if (!locationHeader) {
      throw new Error('Location header is missing');
    }
    const segments = locationHeader.split('/');
    const id = decodeURIComponent(segments[segments.length - 1]);
    return id;
  };

  const uploadFileWithProgress = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5135/api/v1/files', true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          onProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 201) {
          resolve(xhr.getResponseHeader('Location'));
        } else {
          reject(new Error('Failed to upload file'));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Failed to upload file'));
      };

      xhr.send(file);
    });
  };

  const handleFileUpload = async () => {
    setLoading(true);
    const updatedTracks = [...trackData];

    let coverUrl = '';
    if (imageSrc) {
      const imageFile = base64ToFile(imageSrc, 'cover.jpg');

      const response = await fetch('http://localhost:5135/api/v1/files', {
        method: 'POST',
        credentials: 'include',
        body: imageFile,
      });

      if (response.ok) {
        coverUrl = getIdFromHeaders(response);
      } else {
        console.error('Failed to upload image');
      }
    }

    const album = {
      coverUrl,
      title,
      isExplicit: updatedTracks.some(t => t.isExplicit),
      isSingle: updatedTracks.length === 1,
      description,
      releaseDate: getCurrentUTCDate(),
    };

    console.log(JSON.stringify(album));

    const albumResponse = await fetch('http://localhost:5135/api/v1/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(album),
    });

    album.id = getIdFromHeaders(albumResponse);
    console.log(album.id);

    for (let i = 0; i < trackData.length; i++) {
      updatedTracks[i].uploading = true;
      setTrackData([...updatedTracks]);

      try {
        const trackUrl = await uploadFileWithProgress(trackData[i].binary, (progress) => {
          updatedTracks[i].uploadProgress = progress;
          setTrackData([...updatedTracks]);
        });

        updatedTracks[i].audioUrl = decodeURIComponent(trackUrl);
        updatedTracks[i].albumId = album.id;

        const trackResponse = await fetch('http://localhost:5135/api/v1/tracks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(updatedTracks[i]),
        });

        if (trackResponse.ok) {
          updatedTracks[i].uploading = false;
          updatedTracks[i].uploadProgress = 100; // Загрузка завершена
          setTrackData([...updatedTracks]);
        } else {
          console.error('Failed to upload track metadata:', trackData[i].title);
        }
      } catch (error) {
        console.log(error);
        console.error('Failed to upload file:', trackData[i].title);
      }
    }

    setLoading(false);
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='grid grid-cols-[auto_1fr] gap-5 mb-4'>
        <div className='col-span-1'>
          <div className='relative mb-4 w-[260px]'>
            { imageSrc ? (
              <>
                <Image src={ imageSrc } alt='Cover' width={ 260 } height={ 260 } className='object-cover' />
                <div className='flex justify-end mt-3'>
                  <button
                    className='border border-gray-200 text-xs text-gray-700 px-3 py-1 rounded'
                    onClick={ () => document.getElementById('imageInput').click() }
                  >
                    Изменить обложку
                  </button>
                </div>
              </>
            ) : (
              <div
                className='w-[260px] h-[260px] flex items-center justify-center bg-gradient-to-r from-[#846170] to-[#70929c] relative'
              >
                <button
                  className='absolute bottom-2 bg-white border border-gray-200 text-xs text-gray-700 px-3 py-1 rounded'
                  onClick={ () => document.getElementById('imageInput').click() }
                >
                  Загрузить обложку
                </button>
              </div>
            ) }
            <input
              id='imageInput'
              type='file'
              className='hidden'
              onChange={ handleImageUpload }
            />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Название</label>
            <input type='text'
                   className='w-full border border-gray-300 p-2 rounded'
                   placeholder='Дроптик'
                   value={ title }
                   onChange={ (e) => setTitle(e.target.value) }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Тип загрузки</label>
            <select className='w-full border border-gray-300 p-2 rounded'>
              <option>Альбом</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Описание</label>
            <textarea className='w-full border border-gray-300 p-2 rounded'
                      rows='4'
                      placeholder='Описание для альбома'
                      value={ description }
                      onChange={ (e) => setDescription(e.target.value) }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Доступность:</label>
            <div>
              <label className='inline-flex items-center mr-4'>
                <input type='radio' name='privacy' value='public' className='form-radio' />
                <span className='ml-2'>Публично</span>
              </label>
              <label className='inline-flex items-center'>
                <input type='radio' name='privacy' value='private' className='form-radio' />
                <span className='ml-2'>Приватно</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <div className='border-t border-gray-200 pt-4'>
          { trackData.map((track, index) => (
            <TrackUpload
              key={ index }
              track={ track }
              index={ index }
              genres={ genres }
              handleTrackNameChange={ handleTrackNameChange }
              handleIsExplicitChange={ handleIsExplicitChange }
              handleGenreChange={ handleGenreChange }
            />
          )) }
        </div>
      </div>

      <div className='flex justify-end'>
        <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2' onClick={ handleFileUpload }>Отмена
        </button>
        <button className='bg-accentPurple text-white px-4 py-2 rounded flex items-center' onClick={ handleFileUpload }>
          {
            loading ? (
              <>
                <MaskedIcon src={ '/spin.svg' } alt='loader' className='w-5 h-5 text-white animate-spin mr-2' />
                <span>Загрузка...</span>
              </>
            ) : (
              <span>Загрузить</span>
            )
          }
        </button>
      </div>
    </div>
  );
};

export default PlaylistEdit;
import React, { useState } from 'react';
import MaskedIcon from "@/components/maskedIcon";

const Upload = ({ onUploadComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...e.dataTransfer.files]);
      onUploadComplete([...files, ...e.dataTransfer.files]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles([...files, ...e.target.files]);
      onUploadComplete([...files, ...e.target.files]);

      console.log(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow border border-gray-200 p-4 rounded-[4px] mb-4">

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div>3% of free uploads used</div>
              <button className="bg-accentPurple hover:bg-accentPurpleActive text-white ease-in duration-100 px-4 py-2 rounded">Try Next Pro</button>
            </div>
          </div>

          <div
              className={`border-t border-gray-200 py-4 ${dragActive ? "bg-gray-100" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md py-24">
              <MaskedIcon src='/upload.svg' alt='upload-icon' className={`w-[64px] h-[64px] text-textDefault ${dragActive && "text-accentPurple"} ease-in duration-100 mb-5`}/>
              <p className={`text-[22px] text-textDefault ${dragActive && "text-accentPurple"} ease-in duration-100 font-medium mb-3`}>Перетащите сюда свои треки и альбомы</p>
              <button
                  className={`bg-accentPurple hover:bg-accentPurpleActive ${dragActive && "bg-textDefault"} text-white ease-in duration-100 px-4 py-2 rounded mt-4`}
                  onClick={handleButtonClick}
              >
                или выберите файлы для загрузки
              </button>
              <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  multiple
                  onChange={handleChange}
              />
              <div className={`flex items-center ${dragActive && "opacity-80"} ease-in duration-100 mt-4`}>
                <input type="checkbox" id="makePlaylist" className="mr-2" />
                <label className='text-xs text-textDefault font-medium' htmlFor="makePlaylist">Создать сингл, если выбран один файл</label>
              </div>
              <div className={`flex gap-3 text-xs font-medium text-textDefault ${dragActive && "opacity-80"} ease-in duration-100 mt-4`}>
                <span className='block'> Доступ: </span>
                <label className="inline-flex gap-1 items-center">
                  <input type="radio" name="privacy" value="public" className="form-radio" />
                  <span>Публичный</span>
                </label>
                <label className="inline-flex gap-1 items-center">
                  <input type="radio" name="privacy" value="private" className="form-radio" />
                  <span>Частный</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-1 text-gray-500 text-sm mt-4">
              <span>
                Используйте FLAC, WAV, ALAC или AIFF для наивысшего качества.
              </span>

            <a href="#" className="text-blue-500">
              Больше про HD.
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <a href="#" className="text-blue-500">Поддерживаемые типы и размеры файлов</a> - <a href="#" className="text-blue-500">Советы по устранению неполадок при загрузке</a> - <a href="#" className="text-blue-500">Copyright FAQs</a>
        </div>
        <div className="text-center text-sm text-gray-500 mt-2">
          Загружая файлы, вы подтверждаете, что ваши звуковые файлы соответствуют нашим <a href="#" className="text-blue-500">Условиям использования</a> и не нарушают чужие права.
        </div>
      </div>
  );
};

export default Upload;
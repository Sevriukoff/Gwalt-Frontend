import React from 'react';
import Select from 'react-select';

const TrackUpload = ({ track, index, genres, handleTrackNameChange, handleIsExplicitChange, handleGenreChange }) => {
  return (
      <div key={index} className={`mb-4 relative ${track.uploading && 'animate-pulse'}`}>
        <div className="h-2 bg-gray-200 w-full rounded mb-2">
          <div
              className={`h-full rounded ${track.uploadProgress === 100 ? 'bg-accentPurple' : 'bg-gray-500'}`}
              style={{ width: `${track.uploadProgress}%` }}
          ></div>
        </div>
        <div className="mb-2 flex items-center">
          <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Название трека"
              value={track.title}
              disabled={track.uploading}
              onChange={(e) => handleTrackNameChange(index, e.target.value)}
          />
          <button className="ml-2 text-red-500" disabled={track.uploading}>✖</button>
        </div>
        <div className="flex items-center mb-2">
          <input
              type="checkbox"
              className="mr-2"
              checked={track.isExplicit}
              disabled={track.uploading}
              onChange={() => handleIsExplicitChange(index)}
          />
          <label className="mr-4">Explicit</label>
          <Select
              className="w-full"
              isMulti
              placeholder="Выберите жанр трека"
              options={genres}
              value={genres.filter(genre => track.genres.includes(genre.value))}
              isDisabled={track.uploading}
              onChange={(selectedOptions) => handleGenreChange(index, selectedOptions)}
          />
        </div>
      </div>
  );
};

export default TrackUpload;
'use client';

import React, { useState } from 'react';

const Album = () => {
  const tracks = [
    { title: "My Life (Live in Vegas)", plays: 8670 },
    { title: "Believer (Live in Vegas)", plays: 4893 },
    { title: "Las Vegas, Our Home (Live in Vegas)", plays: 1333 },
    { title: "It's Time (Live in Vegas)", plays: 1507 },
    { title: "I'm So Sorry (Live in Vegas)", plays: 1297 },
    { title: "Thunder (Live in Vegas)", plays: 2846 },
    { title: "Birds (Live in Vegas)", plays: 1458 },
    { title: "Follow You (Live in Vegas)", plays: 1123 },
    { title: "Lonely (Live in Vegas)", plays: 1393 },
    { title: "Natural (Live in Vegas)", plays: 4068 },
  ];

  const [showAllTracks, setShowAllTracks] = useState(false);

  const displayedTracks = showAllTracks ? tracks : tracks.slice(0, 5);

  return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <img
              src="https://storage.yandexcloud.net/id-gwalt-storage/image/1ae609b2-2b95-4d01-a3d1-632faaab8d06-20240517053259-968865.jpeg"
              alt="Imagine Dragons Live in Vegas"
              className="w-20 h-20 object-cover rounded-md"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Imagine Dragons</h2>
            <p className="text-gray-600">Imagine Dragons Live in Vegas</p>
            <p className="text-gray-400">Album - 2023</p>
            <span className="text-sm text-gray-500">#Alternative</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>3:08</span>
          </div>
        </div>
        <ul className="text-gray-800 overflow-y-auto max-h-64">
          {displayedTracks.map((track, index) => (
              <li key={index} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center">
                  <span className="w-6">{index + 1}</span>
                  <span>{track.title}</span>
                </div>
                <span className="text-red-500">GO+</span>
              </li>
          ))}
        </ul>
        <div className="text-center mt-4">
          <button
              className="text-blue-500"
              onClick={() => setShowAllTracks(!showAllTracks)}
          >
            {showAllTracks ? 'View fewer tracks' : 'View more tracks'}
          </button>
        </div>
        <div className="flex mt-4 space-x-4">
          <button className="text-gray-500">❤️ 186</button>
          <button className="text-gray-500">🔁 13</button>
          <button className="text-gray-500">Share</button>
          <button className="text-gray-500">Copy Link</button>
          <button className="text-gray-500">Add to Next up</button>
        </div>
      </div>
  );
};

export default Album;
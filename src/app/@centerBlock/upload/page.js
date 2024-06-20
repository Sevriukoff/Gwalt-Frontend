'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Upload = dynamic(() => import('@/components/upload'), { ssr: false });
const PlaylistEdit = dynamic(() => import('@/components/playlistEdit'), { ssr: false });

const CenterBlockUploadPage = () => {
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleUploadComplete = (files) => {
    setSelectedFiles(files);
    setIsUploadComplete(true);
  };

  return (
    <div>
      { !isUploadComplete ? (
        <Upload onUploadComplete={ handleUploadComplete } />
      ) : (
        <PlaylistEdit selectedFiles={ selectedFiles } />
      ) }
    </div>
  );
};

export default CenterBlockUploadPage;
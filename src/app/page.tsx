'use client';

import ProgressBarComponent from '@/components/Progress-bar';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [convertedFiles, setConvertedFiles] = useState([]);

  const handleConvert = async () => {
    try {
      setProgress(0);
      setStatus('Converting...');
      const response = await axios.post('/api/convert', {
        onUploadProgress: (progressEvent: any) => {
          setProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
          );
        },
      });
      setProgress(100);
      setStatus('Conversion Complete');
      setConvertedFiles(response.data.convertedFiles);
    } catch (error) {
      setStatus('Conversion Failed: ' + (error as AxiosError).message);
    }
  };

  return (
    <div>
      <div>
        <h1>DOCX to HTML Converter</h1>
        <button onClick={handleConvert}>Convert All</button>
        <p>Status: {status}</p>
        <ProgressBarComponent progress={progress} />
      </div>
    </div>
  );
};

export default Home;

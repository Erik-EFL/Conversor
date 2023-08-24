'use client';

import ProgressBarComponent from '@/components/Progress-bar';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>('Aguardando');
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
    <div className='flex flex-col justify-center gap-9 items-center max-w-xl h-[100vh] m-auto'>
      <h1 className='text-center text-2xl font-extrabold text-zinc-300'>DOCX para HTML</h1>
      <button
        className='
      px-5 py-2 rounded-lg bg-emerald-600 max-w-sm hover:text-zinc-300 text-zinc-100 font-bold hover:bg-emerald-800 transition-colors justify-center'
        onClick={handleConvert}
      >
        Converter Todos
      </button>
      <div className='w-full'>
        <p className='mb-8'>Status da conversão:
          <strong className={status === 'Conversion Complete' ? 'text-emerald-400 ml-3' : status.includes('Failed') ? 'text-red-600 ml-3' : 'text-yellow-400 ml-3'}>
            {status}
          </strong>
        </p>
        <ProgressBarComponent progress={progress} />
      </div>
      {convertedFiles.length > 0 && (
        <div className='w-full mt-6 max-h-40 overflow-y-auto'>
          <p className='text-lg font-semibold mb-2'>Arquivos Convertidos:</p>
          <ul className='list-disc list-inside'>
            {convertedFiles.map((file, index) => (
              <li key={index} className='text-sm'>
                {file["html"]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;

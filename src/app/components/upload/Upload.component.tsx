import useRequest from '@/hooks/request.hook';
import React, { useState } from 'react';
import FileDropzone from './Custon-uploader';
import ButtonGeneric from '../Generic/Button.generic';

export default function UploadFile() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  >('default');

  const { UploadFile } = useRequest;

  const handleFileChange = (droppedFiles: File[]) => {
    setFiles(droppedFiles);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (files.length === 0) {
      setStatus('danger');
      return;
    }

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('file', file));

      setStatus('primary');
      await UploadFile(formData, '/api/upload');
      setStatus('success');
      setFiles([]);
      setTimeout(() => {
        setStatus('default');
      }, 10000);
    } catch (error) {
      setStatus('danger');
      console.error(error);
    }
  };

  return (
    <div>
      <div className='w-full h-40 text-center flex flex-col justify-between'>
        <div className='w-[90%] h-[80%] flex flex-col m-auto'>
          <FileDropzone onFilesDropped={handleFileChange} />
        </div>
        <form onSubmit={onSubmit}>
          <ButtonGeneric
            additionalClassName={`w-[90%] py-2 font-bold transition-colors justify-center mb-3 ${
              files.length === 0
                ? 'text-gray-400 cursor-not-allowed border-3'
                : 'bg-transparent hover:text-focus-50 text-zinc-100, border-focus-50 rounded-md border-3'
            }`}
            name={files.length === 0 ? 'Upload' : `Upload ${files.length}`}
            disabled={files.length === 0}
            type={'submit'}
          />
        </form>
      </div>
    </div>
  );
}

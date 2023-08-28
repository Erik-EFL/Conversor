import useRequest from '@/hooks/request.hook';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonGeneric from '../Generic/Button.generic';
import FileDropzone from '../upload/Custon-uploader';

const baseURL = '/api/upload';

export default function UploadFile() {
  const [files, setFiles] = useState<File[]>([]);

  const { UploadFile } = useRequest;

  const handleFileChange = (droppedFiles: File[]) => {
    setFiles(droppedFiles);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('file', file));

      const message = await UploadFile(formData, baseURL);

      toast.success(message, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
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
            additionalClassName={`w-[70%] py-2 font-bold transition-colors justify-center mb-3 ${
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
      <ToastContainer />
    </div>
  );
}

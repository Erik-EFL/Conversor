import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {
  onFilesDropped: (files: File[]) => void;
}

function FileDropzone({ onFilesDropped }: FileDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesDropped(acceptedFiles);
  }, [onFilesDropped]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      <p className='text-primary-800'>Arraste e solte seus arquivos aqui</p>
      <p className='text-primary-800'>Ou clique aqui para seleciona-los</p>
    </div>
  );
}

export default FileDropzone;

import useConverter from '@/hooks/request.hook';
import ButtonGeneric from '../Generic/Button.generic';

function DownloadAll() {
  const { DownloadAllFiles } = useConverter;
  const handleDownload = async () => {
    DownloadAllFiles();
  };

  return (
    <ButtonGeneric
      name='Baixar tudo'
      onClick={() => handleDownload()}
      additionalClassName={'hover:border-focus-50 hover:text-focus-50'}
    />
  );
}

export default DownloadAll;

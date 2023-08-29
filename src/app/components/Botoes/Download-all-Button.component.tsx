import useConverter from '@/hooks/request.hook';
import ButtonGeneric from '../Generic/Button.generic';

interface propsController {
  files: string[];
}

function DownloadAll({ files }: propsController) {
  const { DownloadAllFiles } = useConverter;
  const handleDownload = async () => {
    DownloadAllFiles(files);
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

import useConverter from '@/hooks/request.hook';
import ButtonGeneric from '../Generic/Button.generic';

interface propsController {
  fileName: string;
  baseURL: string;
}

function Download({ fileName, baseURL }: propsController) {
  const { DownloadFile } = useConverter;
  const handleDownload = async (fileName: string, url: string) => {
    DownloadFile(fileName, url);
  };

  return (
    <ButtonGeneric
      name='Download'
      onClick={() => handleDownload(fileName, baseURL)}
      additionalClassName={'hover:border-focus-50 hover:text-focus-50'}
    />
  );
}

export default Download;

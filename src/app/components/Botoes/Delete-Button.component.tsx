import useConverter from '@/hooks/request.hook';
import ButtonGeneric from '../Generic/Button.generic';

interface propsController {
  baseURL: string;
  fileName: string;
}

function Delete({ fileName, baseURL }: propsController) {
  const { DeleteFile } = useConverter;

  const handleDelete = async (filename: string, url: string) => {
    DeleteFile(filename, url);
  };

  return (
    <ButtonGeneric
      onClick={() => handleDelete(fileName, baseURL)}
      name='Delete'
      additionalClassName={'hover:border-focus-100 hover:text-focus-100'}
    />
  );
}

export default Delete;

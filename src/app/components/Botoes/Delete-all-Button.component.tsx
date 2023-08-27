import useConverter from '@/hooks/request.hook';
import ButtonGeneric from '../Generic/Button.generic';

interface propsController {
  path: string
}

function DeleteAll({ path }: propsController) {
  const { deleteFiles } = useConverter;

  const handleDelete = async () => {
    try {
      const response = await deleteFiles(path);
      console.log('Files deleted:', response.message);
    } catch (error: any) {
      console.error('Error deleting files:', error.message);
    }
  };
  return (
    <ButtonGeneric
      name='Deletar tudo'
      onClick={() => handleDelete()}
      additionalClassName={'hover:border-focus-100 hover:text-focus-100'}
    />
  );
}

export default DeleteAll;

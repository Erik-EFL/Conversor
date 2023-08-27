import useRequest from '@/hooks/request.hook';
import ButtonGeneric from '../Generic/Button.generic';

const baseURL = '/api/convert';

interface propsController {
  name: string
  format: string
}

function Conveter({ name, format }: propsController) {
  const { ConvetFile } = useRequest;

  return (
    <ButtonGeneric
      name={name}
      onClick={() => ConvetFile(baseURL, format)}
      additionalClassName={'w-[90%] hover:border-focus-50 hover:text-focus-50'}
    />
  );
}

export default Conveter;

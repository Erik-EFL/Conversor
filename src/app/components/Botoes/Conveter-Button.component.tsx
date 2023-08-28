import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRequest from '@/hooks/request.hook';
import ButtonGeneric from '../Generic/Button.generic';

const baseURL = '/api/convert';
interface propsController {
  name: string
  format: string
}


function Conveter({ name, format }: propsController) {
  const { ConvetFile } = useRequest;

  const handleConvert = async () => {
    try {
      const message = await ConvetFile(baseURL, format);
      toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    } catch (error) {
      console.error("Error:", error);
      toast.error('An error occurred');
    }
  };

  return (
    <>
    <ButtonGeneric
      name={name}
      onClick={handleConvert}
      additionalClassName={'w-[100%] hover:border-focus-50 hover:text-focus-50'}
    />
    <ToastContainer />
  </>
  );
}

export default Conveter;

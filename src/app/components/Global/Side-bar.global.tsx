import { ContentFormat } from '@/app/api/mammoth.utils';
import Conveter from '../Botoes/Conveter-Button.component';
import UploadFile from '../upload/Upload.component';

function SideBar() {
  return (
    <div className='w-72 h-[89vh] gap-10 relative border-r-3 flex flex-col justify-center items-center'>
      <UploadFile />
      <div className='flex flex-col w-[90%] text-center justify-center items-center gap-3'>
        <h2>Converter para:</h2>
        <div>
          <Conveter name='Usuario visualizar' format={ContentFormat.WithMetaAndImages} />
        </div>
        <div>
          <Conveter  name="Desenvolvedores" format={ContentFormat.WithoutMetaAndImages} />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

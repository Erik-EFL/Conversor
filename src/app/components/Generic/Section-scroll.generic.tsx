import Delete from '../Botoes/Delete-Button.component';
import DeleteAll from '../Botoes/Delete-all-Button.component';
import Download from '../Botoes/Download-Button.component';
import DownloadAll from '../Botoes/Download-all-Button.component';

interface propsController {
  data: string[];
  url: string;
  tableName?: string;
}

const columns = [
  {
    key: '1',
    label: 'Documentos',
  },
  {
    key: '2',
    label: 'Ações',
  },
];

const urlDownload = '/api/download';

export default function SectionScroll({
  data,
  url,
  tableName,
}: propsController) {

  return (
    <div className='w-full min-h-[324px]'>
      <div className={tableName === 'Word Documents' ? `flex border-b-3 border-t-3 w-full justify-between items-center mt-5 mb-5` : `flex border-b-3 w-full justify-between items-center mb-5`}>
        <h2 className={`px-2 py-4`}>{tableName}</h2>
        <div className='flex gap-5'>
          {
            tableName === 'HTML documents' && <DownloadAll files={data} />
          }
          {
            tableName === 'HTML documents' ? <DeleteAll path='/api/convert' /> : <DeleteAll path='/api/upload' />
          }
        </div>
      </div>
      <div className='overflow-x-hidden overflow-y-auto h-56'>
        <table className='w-full divide-y divide-primary-300'>
          <thead>
            <tr>
              {columns.map((item) => (
                <th className={item.label === 'Documentos' ? `py-2 text-left uppercase tracking-wider`: `py-2 text-right uppercase tracking-wider`} key={item.key}>{item.label}</th>
              ))}
            </tr>
          </thead>
            <tbody className='w-full divide-x divide-primary-300'>
              {data.map((item, index) => (
                <tr
                  key={index}
                >
                  <td className='text-xs py-2 whitespace-nowrap'>{item}</td>
                  {tableName === 'Word Documents' ? (
                    <td className='flex justify-end mr-[0.65rem]'>
                      <Delete fileName={item} baseURL={url} />
                    </td>
                  ) : (
                    <td className='flex gap-3 justify-end'>
                      <Download fileName={item} baseURL={urlDownload} />
                      <Delete fileName={item} baseURL={url} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

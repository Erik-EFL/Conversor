import useConverter from '@/hooks/request.hook';
import SectionScroll from '../Generic/Section-scroll.generic';

const baseURL = '/api/convert';

export default function SectionScrollConvert() {
  const { GetFiles } = useConverter;
  const { data } = GetFiles(baseURL);

  if (!data) return <p className='text-primary-50'>Não há arquivos</p>;

  const filteredFiles = data?.data.filter(
    (fileName: string) => !fileName.endsWith('.zip') && fileName !== '.gitkeep',
  );

  return (
    <SectionScroll
      url={baseURL}
      data={filteredFiles}
      tableName='HTML documents'
    />
  );
}

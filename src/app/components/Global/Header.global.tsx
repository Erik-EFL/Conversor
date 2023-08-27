import { ThemeSwitcher } from './Theme-switcher.global';

type Props = {};

function Header({}: Props) {
  return (
    <div className='w-full py-5 relative'>
      <div className='flex justify-between m-auto max-w-5xl'>
        <h1 className='text-2xl font-extrabold'>
          DOCX para HTML
        </h1>
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default Header;

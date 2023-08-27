// app/components/ThemeSwitcher.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LightMode, DarkMode } from '@mui/icons-material';


export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='flex gap-10'>
      <button onClick={() => setTheme('light')}>
        {theme === 'dark'
          ? <LightMode fontSize='large' className='text-primary-700 hover:text-focus-100' />
          : <LightMode fontSize='large' className='text-focus-100' />
        }
      </button>
      <button onClick={() => setTheme('dark')}>
        {theme === 'light'
          ? <DarkMode fontSize='large' className='text-primary-700 hover:text-focus-50' />
          : <DarkMode fontSize='large' className='text-focus-50' />
        }
      </button>
    </div>
  );
}

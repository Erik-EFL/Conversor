'use client';

import React from 'react';
import SideBar from './components/Global/Side-bar.global';
import SectionScrollConverted from './components/convert/Converted-Files.';
import SectionScrollUpload from './components/upload/Uploaded-files';

const Home: React.FC = () => {
  return (
    <div
      className='
        flex flex-row
        m-auto
        border-3
      '
    >
      <SideBar />
      <section
        className='
          flex flex-col justify-center items-center px-5
          w-full
          h-full
          '
      >
        <SectionScrollConverted />
        <SectionScrollUpload />
      </section>
    </div>
  );
};

export default Home;

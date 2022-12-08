import React from 'react';
import { MetaProps } from '../types/layout';
import Head from './Head';
import Navigation from './Navigation';
import ThemeSwitch from './ThemeSwitch';
import {isMobile} from 'react-device-detect';
import { motion } from 'framer-motion';
import Search from './Search';

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

export const WEBSITE_HOST_URL = 'https://nextjs-typescript-mdx-blog.vercel.app';

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <div className={`max-w-5xl ${isMobile?"px-4":"px-8"} mx-auto`}>
        
        <motion.div
          animate={{ opacity:1 , x:0 }}
            initial={{ opacity:0 , x:-100 }}
        >
          <div className="flex items-center justify-between py-6">
            <Navigation />
            <div className='flex gap-2 items-center'>
            <Search/>
            <ThemeSwitch />
            </div>
          </div>
        </motion.div>
        

        </div>
      </header>
      <main>
        <div className={`max-w-[82rem] ${isMobile?"px-4":"px-8"}  py-4 ml-auto`}>{children}</div>
      </main>
      {/* <footer className="py-8">
        <div className="max-w-5xl px-8 mx-auto">
          Built by{' '}
          <a
            className="text-gray-900 dark:text-white"
            href="https://twitter.com/hunterhchang"
          >
            Hunter Chang
          </a>
        </div>
      </footer> */}
    </>
  );
};

export default Layout;

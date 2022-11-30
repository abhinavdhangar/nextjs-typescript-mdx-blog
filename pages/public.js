import Image from 'next/image';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Heading from '../components/Heading';
import { useState, useEffect } from 'react';
import CardSlug from '../components/card_one/CardSlug';

const Index = () => {
  //  const [heightHook, setHeightHook] = useState(null);
  // useEffect(() => {
  //   const height = window.innerHeight;
  //       if (typeof window !== 'undefined') {
  //       console.log('window.innerHeight', window.innerHeight);
  //   setHeightHook(height);
  //   }

  // });
  return (
    <div className="flex items-center scale-[0.7] justify-center w-screen h-screen">
      {/* <div className="max-w-[460px] max-h-[390px] flex flex-col items-center border-2 border-black">
        <Image
          src={'/images/dell.jpg'}
          width={400}
          className={`rounded-t-lg my-[16px]`}
          height={270}
          object-fit="cover"
        />
        <div>
          <p className='mb-0'>
            You can also use variant modifiers to target media queries like
            responsive breakpoints, dark mode, prefers-reduced-motion, and more.
          </p>
        </div>
      </div> */}
      
       <CardSlug
          img='https://picsum.photos/id/54/400/300'
          title='What I learned from my visit to The Upside Down'
          author='Nancy Wheeler' />
    </div>
  );
};

export default Index;

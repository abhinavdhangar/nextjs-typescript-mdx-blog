import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion'

const Navigation = (): JSX.Element => {
  return (
    <nav className=" flex">
        <motion.div
     
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >

      <Link href="/">
        <a className="text-gray-900 dark:text-white pr-6 md:py-4 py-2">Home</a>
      </Link>
   
    </motion.div>


    <motion.div
     animate={{scrollBehavior:"smooth"}}
     whileHover={{ scale: 1.2 }}
     whileTap={{ scale: 0.9 }}
     transition={{ type: "spring", stiffness: 400, damping: 17 }}
   >

    <Link href="/about">
        <a className="text-gray-900 dark:text-white px-6 md:py-4 py-2 ">About</a>
      </Link>
</motion.div>
    </nav>
  );
};

export default Navigation;

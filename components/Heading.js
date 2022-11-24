import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Heading.module.scss';
const banner = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const letterAni = {
  initial: { y: 550 },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};

const AnimatedLetters = ({ title, disabled }) => {
  title = title.split(' ');

  return (
    <motion.span
      className={styles.rowTitle}
      variants={disabled ? null : banner}
      initial="initial"
      animate="animate"
    >
      {title.map((letter, index) => (
        <motion.span
          key={index}
          className={`${styles.rowLetter} text-3xl md:text-4xl`}
          variants={disabled ? null : letterAni}
        >
          {letter} <span className="md:mr-[12px] mr-[9px]"></span>
        </motion.span>
      ))}
    </motion.span>
  );
};

const BannerRowCenter = ({ title, playMarquee }) => {
  return (
    <div className={`${styles.bannerRow}   ${playMarquee && 'animate'}`}>
      <motion.div
        initial={{ y: 310 }}
        animate={{ y: 0 }}
        transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1 }}
      >
        {/* <AnimatedLetters title={title} disabled />
        <AnimatedLetters title={title} />
        <AnimatedLetters title={title} disabled /> */}
        <AnimatedLetters title={title} />
      </motion.div>
    </div>
  );
};

export default function Heading(props) {
  let { heading } = props;
  return (
    <div>
      <motion.div className={styles.banner} variants={banner}>
        <BannerRowCenter title={heading} playMarquee={false} />
      </motion.div>
    </div>
  );
}

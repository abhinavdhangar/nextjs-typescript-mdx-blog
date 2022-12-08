import * as React from 'react';
import { motion } from 'framer-motion';
import Gallery from '../photo_gsap/gallery'
import styles from '../../styles/accordian.module.css';
import Link from 'next/link';

export const Word = ({ width }) => (
  <div className={styles.word} style={{ width }} />
);

export const ContentPlaceholder = (props) => {
  let { image, htmlContent, slug } = props;

  return (
    <motion.div
      variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
      transition={{ duration: 0.5 }}
      className={styles.contentPlaceholder}
    >
      {/* <img src={image} /> */}
     {image.length>0 && <Gallery images={image}/>}
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: `${htmlContent}` }}
      />
      <Link href={`/posts1/${slug}`}> Read More... </Link>
    </motion.div>
  );
};

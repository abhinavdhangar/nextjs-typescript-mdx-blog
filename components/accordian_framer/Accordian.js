import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentPlaceholder } from './Content';
import styles from '../../styles/accordian.module.css';
import { getSimilarPosts } from '../../services';

const Accordion = ({
  i,
  expanded,
  setExpanded,
  title,
  image,
  content,
  slug,
}) => {
  const isOpen = i === expanded;

  return (
    <>
      <motion.header
        className={styles.header}
        initial={false}
        animate={{ backgroundColor: isOpen ? '#FF0088' : '#0055FF' }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        {title}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className={styles.section}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ContentPlaceholder
              slug={slug}
              image={image}
              htmlContent={content}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

const AccordianWidget = (props) => {
  let { category, slug } = props;
  const [expanded, setExpanded] = useState(-1);
  const [accordianContent, setAccordianContent] = useState([]);
  React.useEffect( () => {
    async function run(){
    let content = await getSimilarPosts(category, slug);
    setAccordianContent(content);
    }
    run()

  }, [slug]);

  return accordianContent.map((content, i) => (
    <Accordion
      key={i}
      i={i}
      expanded={expanded}
      slug={content.slug}
      title={content.title}
      image={
       content.galleryList
      }
      content={content.excerpt.html}
      setExpanded={setExpanded}
    />
  ));
};

export default AccordianWidget;

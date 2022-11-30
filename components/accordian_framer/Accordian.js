import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContentPlaceholder } from "./Content";
import styles from '../../styles/accordian.module.css'
const Accordion = ({ i, expanded, setExpanded }) => {
  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
      className={styles.header}
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >hello how do you do  six seven eight nine ten eleven twelve thirteen fourteen fifteen</motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
          className={styles.section}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ContentPlaceholder />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

  const AccordianWidget = () => {
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const [expanded, setExpanded] = useState(0);
const accordionIds = [4, 1, 2, 3];

  return accordionIds.map((i) => (
    <Accordion key={i} i={i} expanded={expanded} setExpanded={setExpanded} />
  ));
};

export default AccordianWidget
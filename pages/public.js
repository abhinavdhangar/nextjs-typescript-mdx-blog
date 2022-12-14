import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import CardSlug from '../components/card_one/CardSlug';
import SlugImage from '../components/SlugImage';
export default function App() {
  const banner = {
    animate: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.3,
      },
    },
  };
  const childVariant = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: [0.3, 0.6, 0.4, 0.9, 1] },
  };
  const [buttonClick, setButtonClicked] = useState(0);

  return (
    <motion.div
      variants={banner}
      initial="initial"
      animate="animate"
      className="flex items-center gap-4"
    >
      <SlugImage src={'https://media.graphassets.com/M9ZsOshSLiN2m4zhPKPT'} />
      {buttonClick > 0 &&
        [...Array(buttonClick)].map((single, i) => (
          <motion.div key={i} variants={childVariant}>
            <CardSlug
              title={'post.node.titl'}
              slug={'post.node.slug'}
              description={'post.node.excerpt.html'}
              img={'helo '}
              //   date={new Date()}
            />
          </motion.div>
        ))}
      <button onClick={() => setButtonClicked(() => buttonClick + 3)}>
        click
      </button>
    </motion.div>
  );
}

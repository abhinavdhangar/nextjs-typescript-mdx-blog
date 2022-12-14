
import { motion } from "framer-motion";
import styles from '../styles/AnimLetter.module.scss'
const banner = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const letterAni = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};


export default function App(){

const AnimatedLetters = ({ title, disabled }) => (
  <motion.span
    className={styles.rowTitle + " text-6xl md:text-7xl lg:text-8xl tracking-[-3.6px]"}
    variants={disabled ? null : banner}
    initial='initial'
    animate='animate'>
    {[...title].map((letter,i) => (
      <motion.span
      key={i}
        className={styles.rowLetter + " text-6xl md:text-7xl lg:text-8xl" }
        variants={disabled ? null : letterAni}>
        {letter}
      </motion.span>
    ))}
  </motion.span>
);


const BannerRowTop = ({ title }) => {
  return (
    <div className={styles.bannerRow + " p-[5px]"}>
      <div className={styles.rowCol}>
        <AnimatedLetters title={title} />
      </div>
      
    </div>
  );
};

    return (
        
        <motion.div className={styles.banner} variants={banner}>
      <BannerRowTop title={"Blogs"} />
    
    </motion.div>
    )
}
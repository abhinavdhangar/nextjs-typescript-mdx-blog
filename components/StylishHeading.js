import { motion } from 'framer-motion';
import styles from '../styles/stylishHeading.module.css'

export default function App(props) {
  return (
      <motion.div 
         initial={{ x:-100,
             opacity: 0, scale:0.8 }}
         animate={{
             x:0,
             opacity:1,scale:1}}
         transition={{
              type: 'spring', damping: 10 ,
             duration:0.5
         }}
          drag
  dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} 
        className={` font-semibold heding mt-[10px] styledHeading  ml-[10px] text-2xl md:text-[2.5rem] `+styles.headingFont}>{props.heading} </motion.div>
   
  );
}

import {motion} from 'framer-motion'
export default function App({ src,title }) {
    let clickVariant = {
        initial:{
            opacity:0,scale:0
        },
        animate:{
            opacity:1,scale:1
        },
        transition:{
            duration:0.2,
            type:"tween",
             scale: {
          type: "spring",
          damping: 3,
          stiffness: 600,
          restDelta: 0.001,
        },
        },
        tap:{
             scale: [1,0.5, 1.4, 0.5, 1],
        }
        
    }
  return(
  <motion.div
  variants={clickVariant}
  whileTap="tap"
  >
    <img alt={title?title:"image !~^-^~!"} className={`w-[99vw] sm:w-[70vw] md:w-[60vw]  h-[auto] rounded-md object-cover`} src={src} />
  </motion.div>)
}

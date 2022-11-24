import Image from "next/image";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

const Index = () => {
    return (
        <motion.div 
        animate={{
        opacity:1,
        x:0
            
        }}
        initial={{opacity:0,x:-100}}
       
        >
          <Layout/>
        </motion.div>
    );
}

export default Index;
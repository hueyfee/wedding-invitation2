import { motion } from "framer-motion";
import "./Loading.css";

import logo from "../../assets/images/wedding-logo.png";

function Loading({ onFinish }) {

    return (

      <motion.div
      className="hero"
  
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
  >
  
      <motion.img
          src={logo}
          alt="Wedding Logo"
          className="loading-logo"
  
          initial={{
              opacity:0,
              scale:0.92,
              y:30
          }}
  
          animate={{
              opacity:1,
              scale:1,
              y:0
          }}
  
          transition={{
              duration:1.6,
              ease:[0.22,1,0.36,1]
          }}
      />
  
      <motion.div
          className="names"
  
          initial={{
              opacity:0,
              y:20
          }}
  
          animate={{
              opacity:1,
              y:0
          }}
  
          transition={{
              delay:.6,
              duration:1.2
          }}
      >
  
          <h2>Huey Nee</h2>
  
          <p>&</p>
  
          <h2>Chuin Han</h2>
  
      </motion.div>
  
      <motion.div
  
          className="tap"
  
          initial={{opacity:0}}
  
          animate={{
              opacity:[0.25,.9,0.25]
          }}
  
          transition={{
              delay:2,
              duration:2,
              repeat:Infinity
          }}
  
      >
  
          Tap Anywhere
  
      </motion.div>
  
  </motion.div>

    );

}

export default Loading;
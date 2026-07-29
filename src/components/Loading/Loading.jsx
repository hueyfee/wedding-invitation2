import { motion } from "framer-motion";
import "./Loading.css";

function Loading({ onFinish }) {

    return (

        <motion.div
            className="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            onClick={onFinish}
        >

            <motion.h1

                className="logo"

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{
                    duration: 1.2,
                    ease: [0.22,1,0.36,1]
                }}

            >
                CHN
            </motion.h1>

            <motion.div

                className="names"

                initial={{ opacity: 0, y: 25 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{
                    delay:0.5,
                    duration:1.2,
                    ease:[0.22,1,0.36,1]
                }}

            >

                <h2>Huey Nee</h2>

                <p>&</p>

                <h2>Chuin Han</h2>

            </motion.div>

            <motion.div

                className="tap"

                initial={{ opacity:0 }}

                animate={{ opacity:0.65 }}

                transition={{
                    delay:2.0,
                    duration:1.4
                }}

            >

                Tap Anywhere

            </motion.div>

        </motion.div>

    );

}

export default Loading;
import { motion } from "framer-motion";
import "./Loading.css";

import background from "../../assets/images/background.png";
import logo from "../../assets/images/wedding-logo.png";

function Loading({ onFinish }) {

    return (

        <motion.div

            className="loading"

            initial={{ opacity:0 }}

            animate={{ opacity:1 }}

            exit={{ opacity:0 }}

            transition={{ duration:1 }}

            onClick={onFinish}

            style={{
                backgroundImage:`url(${background})`
            }}

        >

            <motion.div

                className="loading-content"

                initial={{ opacity:0 }}

                animate={{ opacity:1 }}

            >

                <motion.img

                    src={logo}

                    alt="Wedding Logo"

                    className="loading-logo"

                    initial={{
                        opacity:0,
                        scale:.9,
                        y:30
                    }}

                    animate={{
                        opacity:1,
                        scale:1,
                        y:0
                    }}

                    transition={{
                        duration:1.5,
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
                        delay:.5,
                        duration:1
                    }}

                >

                    <h2>Huey Nee</h2>

                    <span>&</span>

                    <h2>Chuin Han</h2>

                </motion.div>

                <motion.p

                    className="tap"

                    initial={{ opacity:0 }}

                    animate={{
                        opacity:[0.25,.8,0.25]
                    }}

                    transition={{
                        delay:1.8,
                        duration:2,
                        repeat:Infinity
                    }}

                >

                    ✨ Tap Anywhere ✨

                </motion.p>

            </motion.div>

        </motion.div>

    );

}

export default Loading;
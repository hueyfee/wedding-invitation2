import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./Envelope.css";

import envelopeOpen from "../../assets/images/envelope-open-no-background.png";
import Invitation from "../Invitation/Invitation";

// import { getLayout } from "../../utils/layout";

function DesktopEnvelope({layout, onFinished }) {

    const [stage, setStage] = useState("opening");

    // const [screen, setScreen] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight
    // });

    // const layout = getLayout(
    //     screen.width,
    //     screen.height
    // );

    // =====================================
    // Resize
    // =====================================

    // useEffect(() => {

    //     const resize = () => {

    //         setScreen({
    //             width: window.innerWidth,
    //             height: window.innerHeight
    //         });

    //     };

    //     window.addEventListener("resize", resize);

    //     return () => {

    //         window.removeEventListener("resize", resize);

    //     };

    // }, []);

    // =====================================
    // Animation Timeline
    // =====================================

    useEffect(() => {

        if (stage === "opening") {

            const timer = setTimeout(() => {

                setStage("pullout");

            }, 1800);

            return () => clearTimeout(timer);

        }

        if (stage === "pullout") {

            const timer = setTimeout(() => {

                setStage("focus");

            }, 900);

            return () => clearTimeout(timer);

        }

        if (stage === "focus") {

            const timer = setTimeout(() => {

                setStage("fullscreen");

            }, 900);

            return () => clearTimeout(timer);

        }

    }, [stage]);

    // =====================================
    // Continue
    // =====================================

    const handleContinue = () => {

        if (stage !== "fullscreen") return;

        onFinished?.();

    };

    // =====================================
    // Mouse Wheel
    // =====================================

    useEffect(() => {

        if (stage !== "fullscreen") return;

        const wheel = () => {

            onFinished?.();

        };

        window.addEventListener("wheel", wheel, { once: true });

        return () => {

            window.removeEventListener("wheel", wheel);

        };

    }, [stage, onFinished]);

    return (

        <motion.div

            className="scene"

            onClick={handleContinue}

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            transition={{ duration: 0.6 }}

        >

            <motion.img

                src={envelopeOpen}

                className="open-envelope"

                style={{

                    width: layout.envelope.width,

                    left: `${layout.envelope.left * 100}%`,

                    top: `${layout.envelope.top * 100}%`

                }}

                initial={{

                    y: 0,

                    opacity: 1

                }}

                animate={

                    stage === "pullout"

                    ? {

                        y: -30,

                        opacity: 1

                    }

                    : stage === "focus"

                    ? {

                        y: -30,

                        opacity: 0.45

                    }

                    : stage === "fullscreen"

                    ? {

                        y: -30,

                        opacity: 0

                    }

                    : {

                        y: 0,

                        opacity: 1

                    }

                }

                transition={{

                    duration: 0.8,

                    ease: [0.22, 1, 0.36, 1]

                }}

            />

            <Invitation stage={stage} />

            {stage === "fullscreen" && (

                <motion.div

                    className="begin-story"

                    initial={{

                        opacity: 0,

                        y: 20

                    }}

                    animate={{

                        opacity: 1,

                        y: 0

                    }}

                    transition={{

                        delay: 0.8,

                        duration: 0.8

                    }}

                    onClick={handleContinue}

                >

                    <p>Our Story Begins</p>

                    <span>﹀</span>

                </motion.div>

            )}

        </motion.div>

    );

}

export default DesktopEnvelope;
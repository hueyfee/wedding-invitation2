import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Envelope.css";

import background from "../../assets/images/background.png";
import envelopeClose from "../../assets/images/envelope-close.png";
import envelopeOpen from "../../assets/images/envelope-open-no-background.png";

import Invitation from "../Invitation/Invitation";

function Envelope({ onFinished }) {

    const [stage, setStage] = useState("closed");

    // ------------------------
    // Open Envelope
    // ------------------------

    const handleOpen = () => {

        if (stage !== "closed") return;

        setStage("opening");

    };

    // ------------------------
    // Continue to Wedding
    // ------------------------

    const handleContinue = () => {

        if (stage !== "fullscreen") return;

        onFinished?.();

    };

    // ------------------------
    // Mouse Wheel
    // ------------------------

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

    // ------------------------
    // Animation Timeline
    // ------------------------

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

    return (

        <div className="envelope-page">

            <img
                src={background}
                className="background"
                alt=""
            />

            <AnimatePresence mode="wait">

                {/* Closed Envelope */}

                {stage === "closed" && (

                    <motion.img

                        key="closed"

                        src={envelopeClose}

                        className="closed-envelope"

                        onClick={handleOpen}

                        initial={{
                            opacity: 0,
                            scale: 0.95
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1
                        }}

                        exit={{
                            opacity: 0
                        }}

                        transition={{
                            duration: 0.8
                        }}

                        whileHover={{
                            scale: 1.02,
                            y: -6
                        }}

                        whileTap={{
                            scale: 0.98
                        }}

                    />

                )}

                {/* Open Scene */}

                {stage !== "closed" && (

                    <motion.div

                        key="scene"

                        className="scene"

                        onClick={handleContinue}

                        initial={{
                            opacity: 0
                        }}

                        animate={{
                            opacity: 1
                        }}

                        exit={{
                            opacity: 0
                        }}

                        transition={{
                            duration: 0.6
                        }}

                    >

                        {/* Envelope */}

                        <motion.img

                            src={envelopeOpen}

                            className="open-envelope"

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

                        {/* Invitation */}

                        <Invitation
                            stage={stage}
                        />

                        {/* Begin Our Story */}

                        {stage === "fullscreen" && (
        <motion.div
            className="begin-story"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={handleContinue}
        >
            <p>Our Story Begins</p>
            <span>﹀</span>
        </motion.div>
    )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}

export default Envelope;
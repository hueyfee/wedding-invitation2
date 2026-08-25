import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Envelope.css";

import background from "../../assets/images/background.png";
import envelopeClose from "../../assets/images/envelope-close.png";

import DesktopEnvelope from "./DesktopEnvelope";
import InvitationMobile from "../Invitation/InvitationMobile";

import { getLayout } from "../../utils/layout";

function Envelope({ onFinished }) {

    const [stage, setStage] = useState("closed");




    const [screen, setScreen] = useState({

        
        width: window.innerWidth,
        height: window.innerHeight

    });

    const layout = getLayout(
        screen.width,
        screen.height
    );


    useEffect(() => {

        const resize = () => {

            setScreen({

                width: window.innerWidth,
                height: window.innerHeight

            });

        };

        window.addEventListener(
            "resize",
            resize
        );

        return () =>
            window.removeEventListener(
                "resize",
                resize
            );

    }, []);

    // =====================================
    // Open Envelope
    // =====================================

    const handleOpen = () => {

        if (stage !== "closed") return;

        if (layout.mobile) {

            setStage("mobileInvitation");

        } else {

            setStage("desktop");

        }

    };

    return (

        <div className="envelope-page">

            <img
                src={background}
                className="background"
                alt=""
            />

            <AnimatePresence mode="wait">

                {/* =====================================
                    Closed Envelope
                ===================================== */}

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

                        whileHover={

                            !layout.mobile

                                ? {

                                    scale: 1.02,
                                    y: -6

                                }

                                : undefined

                        }

                        whileTap={{

                            scale: 0.98

                        }}

                    />

                )}

                {/* =====================================
                    Desktop Experience
                ===================================== */}

                {stage === "desktop" && (

<DesktopEnvelope
layout={layout}
onFinished={onFinished}
/>

                )}

                {/* =====================================
                    Mobile Experience
                ===================================== */}

                {stage === "mobileInvitation" && (

                    <InvitationMobile
                        onContinue={onFinished}
                    />

                )}

            </AnimatePresence>

        </div>

    );

}

export default Envelope;
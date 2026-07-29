import { motion } from "framer-motion";
import "./Invitation.css";

import invitationCard from "../../assets/images/invitation-card.png";

function Invitation({ stage }) {

    const variants = {

        // Hidden inside envelope
        closed: {
            y: 180,
            scale: 0.55,
            rotate: -12
        },

        // Envelope flap opening
        opening: {
            y: 70,
            scale: 1,
            rotate: -12,

            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
            }
        },

        // Invitation slides out
        pullout: {
            y: -65,
            scale: 1,
            rotate: 0,

            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
            }
        },

        // Hold position
        focus: {
            y: -65,
            scale: 1,
            rotate: 0,

            transition: {
                duration: 0.6
            }
        },

        // Still hold position
        fullscreen: {
            y: -65,
            scale: 1,
            rotate: 0,

            transition: {
                duration: 0.6
            }
        }

    };

    return (

        <motion.img

            src={invitationCard}

            className="invitation"

            variants={variants}

            initial="closed"

            animate={stage}

            draggable={false}

        />

    );

}

export default Invitation;
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import "./Invitation.css";
import invitationCard from "../../assets/images/invitation-card.png";

function Invitation({ stage }) {

    const [screen, setScreen] = useState({

        width: window.innerWidth,
        height: window.innerHeight

    });

    const layout = useMemo(() => {

        const mobile = screen.width <= 768;
    
        return {
    
            mobile,
    
            cardWidth: mobile
                ? Math.min(screen.width * 0.52, 240)
                : 400,
    
            left: mobile
                ? 0.5
                : 0.35,
    
            top: mobile
                ? 0.40
                : 0.08,
    
            closedY: mobile
                ? screen.height * 0.10
                : 170,
    
            openingY: mobile
                ? screen.height * 0.03
                : 60,
    
            pulloutY: mobile
                ? -screen.height * 0.05
                : -120,
    
            focusY: mobile
                ? -screen.height * 0.13
                : -170,
    
            zoom: mobile
                ? screen.height / 300
                : 4.6,
    
            rotate: mobile
                ? -5
                : -8
    
        };
    
    }, [screen]);

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

    const variants = {

        closed:{
    
            y:layout.closedY,
    
            scale:.92,
    
            rotate:layout.rotate
    
        },
    
        opening:{
    
            y:layout.openingY,
    
            scale:.95,
    
            rotate:layout.rotate,
    
            transition:{
    
                duration:1.1,
    
                ease:[0.22,1,0.36,1]
    
            }
    
        },
    
        pullout:{
    
            y:layout.pulloutY,
    
            scale:1,
    
            rotate:layout.rotate,
    
            transition:{
    
                duration:1.2,
    
                ease:[0.22,1,0.36,1]
    
            }
    
        },
    
        focus:{
    
            y:layout.focusY,
    
            scale:1.08,
    
            rotate:0,
    
            transition:{
    
                duration:.8,
    
                ease:"easeOut"
    
            }
    
        },
    
        fullscreen:{
    
            y:layout.focusY,
    
            scale:layout.zoom,
    
            rotate:0,
    
            transition:{
    
                duration:1.8,
    
                ease:[0.22,1,0.36,1]
    
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
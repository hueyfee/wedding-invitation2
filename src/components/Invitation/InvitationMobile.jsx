import { motion } from "framer-motion";
import { useEffect } from "react";

import "./InvitationMobile.css";

import background from "../../assets/images/background.png";
import invitationCard from "../../assets/images/invitation-card.png";

function InvitationMobile({ onContinue }) {

    // useEffect(() => {

    //     console.log("InvitationMobile mounted");

    //     return () => {

    //         console.log("InvitationMobile unmounted");

    //     };

    // }, []);

    return (

        <div className="mobile-invitation-page">

        <img
            src={background}
            className="mobile-background"
            alt=""
        />
    
        <img
            src={invitationCard}
            className="mobile-card"
            alt="Wedding Invitation"
            onClick={onContinue}
        />
    
        <div className="tap-anywhere">
    
            <p>Tap the invitation to begin</p>
    
            <span>﹀</span>
    
        </div>
    
    </div>
    );

}

export default InvitationMobile;
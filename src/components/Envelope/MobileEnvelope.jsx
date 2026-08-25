import { motion } from "framer-motion";

import "./Envelope.css";

import InvitationMobile from "../Invitation/InvitationMobile";

function MobileEnvelope({ onFinished }) {

    return (

        <InvitationMobile
            onContinue={onFinished}
        />

    );

}

export default MobileEnvelope;
import { useState } from "react";

import "./Wedding.css";

import Album from "../../sections/Album/Album";
import Timeline from "../../sections/Timeline/Timeline";
import Venue from "../../sections/Venue/Venue";
import RSVP from "../../sections/RSVP/RSVP";
import AILoading from "../../sections/RSVP/components/AILoading";

function Wedding() {

    const [isGenerating, setIsGenerating] = useState(false);

    return (

        <>

            {isGenerating && <AILoading />}

            <main className="wedding-page">

                <Album />

                <Timeline />

                <Venue />

                <RSVP
                    isGenerating={isGenerating}
                    setIsGenerating={setIsGenerating}
                />

            </main>

        </>

    );

}

export default Wedding;
import "./Wedding.css";

import Album from "../../sections/Album/Album";
import Timeline from "../../sections/Timeline/Timeline";
import Venue from "../../sections/Venue/Venue";
import RSVP from "../../sections/RSVP/RSVP";
// import Ending from "../../sections/Ending/Ending";

function Wedding() {

    return (

        <main className="wedding-page">

            <Album />

            <Timeline />

            <Venue />

            <RSVP />

            {/* <Ending /> */}

        </main>

    );

}

export default Wedding;
import "./RSVP.css";

import RSVPCard from "./components/RSVPCard";

function RSVP() {

    return (

        <section className="rsvp">

            <div className="rsvp-header">

                <p>WE CAN'T WAIT TO CELEBRATE</p>

                <h2>RSVP</h2>

                <div className="divider">
                    ❤
                </div>

                <span>
                    Kindly respond before 1 May 2027
                </span>

            </div>

            <RSVPCard/>

        </section>

    );

}

export default RSVP;
import "./RSVP.css";

import RSVPCard from "./components/RSVPCard";

function RSVP({
    isGenerating,
    setIsGenerating
}) {

    return (

        <section className="rsvp">

            <div className="rsvp-header">

                <p>WE CAN'T WAIT TO CELEBRATE</p>

                <h2>RSVP</h2>

                <div className="divider">
                    ❤
                </div>

                <span>
                    Kindly respond before 31 August 2026
                </span>

            </div>

            <RSVPCard
    isGenerating={isGenerating}
    setIsGenerating={setIsGenerating}
/>

        </section>

    );

}

export default RSVP;
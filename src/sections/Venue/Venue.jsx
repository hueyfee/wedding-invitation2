import "./Venue.css";

import grandhyatt from "../../assets/images/grandhyatt.png";
import { SiGooglemaps } from "react-icons/si";
import { SiWaze } from "react-icons/si";

function Venue() {
    return (
        <section className="venue">

<div className="venue-hero">

<img
    src={grandhyatt}
    className="venue-bg"
    alt="Grand Hyatt"
/>

                <div className="venue-overlay"></div>

                <div className="venue-content">
                    

                    <span className="venue-subtitle">
                        WEDDING VENUE
                    </span>

                    <span className="venue-script">
                        Grand Hyatt Kuala Lumpur
                    </span>
        

                    <h2>
                        HOTEL
                    </h2>

                    <div className="venue-divider">
                    ──────── ♥ ────────
                    </div>

                    <h3>
                        Grand Hyatt Grand Salon Ballroom
                    </h3>

                    <p>
                        Level 1, 12 Jalan Pinang,
                        <br />
                        Kuala Lumpur 50450,
                        <br />
                        Malaysia
                    </p>

                    <div className="venue-buttons">

    <a
        href="https://maps.google.com/?q=Grand+Hyatt+Kuala+Lumpur"
        target="_blank"
        rel="noopener noreferrer"
        className="venue-button"
    >
        <SiGooglemaps />
         Google Maps
    </a>

    <a
        href="https://waze.com/ul?q=Grand+Hyatt+Kuala+Lumpur"
        target="_blank"
        rel="noopener noreferrer"
        className="venue-button secondary"
    >
        <SiWaze />
        Waze
    </a>

</div>

                </div>

            </div>

        </section>
    );
}

export default Venue;
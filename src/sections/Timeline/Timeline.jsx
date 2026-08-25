import "./Timeline.css";

import TimelineItem from "./components/TimelineItem";
import TimelineCurve from "./TimelineCurve";

import welcome from "../../assets/icons/welcome.png";
import champagne from "../../assets/icons/champagne.png";
import dinner from "../../assets/icons/dinner.png";
import afterparty from "../../assets/icons/afterparty.png";


const events = [
    {
        time: "6:00 PM",
        title: "Welcome",
        description: "Registration & Guest Arrival",
        icon: welcome,
        side: "left",
        iconSize: 200,
        iconTop : -40,
    },
    {
        time: "6:30 PM",
        title: "Canapé & Cocktails",
        description: "Drinks • Small Bites • Photos",
        icon: champagne,
        side: "right",
        iconSize: 95,
        iconTop : -40,
    },
    {
        time: "7:30 PM",
        title: "Wedding Ceremony",
        description: "Dinner",
        icon: dinner,
        side: "left",
        iconSize: 120,
        iconTop: -50,
    },

    {
        time: "10:00 PM",
        title: "After Party",
        description: "Dance The Night Away",
        icon: afterparty,
        side: "right",
        iconSize: 200,
        iconTop : -40,
    },
];

function Timeline() {
    return (
        <section className="timeline">

            {/* Background decorations */}
            <div className="timeline-bg bg1"></div>
            <div className="timeline-bg bg2"></div>
            <div className="timeline-bg bg3"></div>
           

            {/* Heading */}
            <div className="timeline-heading">

                <span className="timeline-subtitle">
                    WEDDING DAY
                </span>

                <h2>
                    Timeline
                </h2>

                <p>
                    We can't wait to celebrate
                    <br />
                    this beautiful day with you.
                </p>

            </div>

            <div className="divider">

    <span className="line"></span>

    <span className="heart">❤</span>

    <span className="line"></span>

</div>

            {/* Main Timeline Area */}
            <div className="timeline-container">

                {/* SVG Path */}
                <TimelineCurve />

                {/* Events */}
                {events.map((event, index) => (
                    <TimelineItem
                        key={index}
                        index={index}
                        {...event}
                    />
                ))}

            </div>

            <div className="timeline-end">
    <span className="timeline-end-line"></span>

    <p>The End</p>

    <span className="timeline-end-line"></span>
</div>

        </section>
    );
}

export default Timeline;
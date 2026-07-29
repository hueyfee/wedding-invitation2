import "./MomentCard.css";

function MomentCard({ image, reverse, size }) {

    return (

        <div className={`moment-card ${reverse ? "reverse" : ""}`}>

            <div className={`moment-image ${size}`}>

                <img src={image} alt="" />

            </div>

        </div>

    );

}

export default MomentCard;
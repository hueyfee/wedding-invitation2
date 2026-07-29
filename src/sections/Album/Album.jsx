import "./Album.css";

import proposal from "../../assets/images/proposal.jpg";
import preWedding1 from "../../assets/images/prewedding1.jpg";
import preWedding2 from "../../assets/images/prewedding2.jpg";
import preWedding3 from "../../assets/images/prewedding3.jpg";
import preWedding4 from "../../assets/images/prewedding4.jpg";

import MomentCard from "./components/MomentCard";

function Album() {

    const moments = [
        {
            image: proposal,
            size: "small",
        },
        {
            image: preWedding1,
            size: "small",
        },
        {
            image: preWedding2,
            size: "small",
        },
        {
            image: preWedding3,
            size: "small",
        },
        {
            image: preWedding4,
            size: "medium",
        },
    ];
    return (

        <section className="album">

            <div className="album-title">

            <p>OUR MOMENTS</p>
            <br />
            <h2>Captured with Love</h2>
            <br />
            <span>
                A collection of the little moments,
                <br />
                that became our forever.
               
            </span>

            </div>
            <div className="album-divider"></div>
            {moments.map((moment, index) => (

<MomentCard
    key={index}
    image={moment.image}
    size={moment.size}
    reverse={index % 2 === 1}
/>

))}

        </section>

    );

}

export default Album;
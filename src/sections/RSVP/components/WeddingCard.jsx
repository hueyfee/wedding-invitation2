import "./WeddingCard.css";

import { LuDownload } from "react-icons/lu";

function WeddingCard({ image , onClose}) {

    const handleDownload = async () => {

        try {

            const response = await fetch(image);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "Wedding-Keepsake.png";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (err) {

            console.error(err);
            alert("Unable to download image.");

        }

    };

    return (

        <div className="wedding-card-page">

            <img
                src={image}
                alt="Wedding Keepsake"
                className="wedding-image"
            />

            <button
                className="download-button"
                onClick={handleDownload}
            >
                <LuDownload />
                Download Keepsake
            </button>

            <button
    className="return-button"
    onClick={onClose}
>
    Return to Invitation
</button>

        </div>

    );

}

export default WeddingCard;
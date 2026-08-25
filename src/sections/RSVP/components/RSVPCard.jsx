
import { useState } from "react";
import "./RSVPCard.css";
import { supabase } from "../../../utils/supabase";
import AILoading from "./AILoading";
import imageCompression from "browser-image-compression";


import {
    LuLeaf,
    LuImagePlus
} from "react-icons/lu";

import {
    FaVenus,
    FaMars,
    FaM
} from "react-icons/fa6";

import WeddingCard from "./WeddingCard";

function RSVPCard() {

    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [gender, setGender] = useState("female");
    const [attendance, setAttendance] = useState("accept");
    const [guestNames, setGuestNames] = useState("");
    const [dietary, setDietary] = useState("");
    const [message, setMessage] = useState("");

    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const [showCard, setShowCard] = useState(false);

    const [generatedImage, setGeneratedImage] = useState(null);

    const handlePhotoUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPhoto(file);
        setPreview(URL.createObjectURL(file));

    };

    const submitRSVP = async () => {

        if (!name.trim()) {

            alert("Please enter your name.");
            return;

        }

        setLoading(true);
        setIsGenerating(true);

        try {

            // -----------------------------
// Upload Photo
// -----------------------------

let photoUrl = null;

if (photo) {

    //---------------------------------------
    // Compress image
    //---------------------------------------

    const compressedPhoto = await imageCompression(photo, {

        maxSizeMB: 1,

        maxWidthOrHeight: 1500,

        useWebWorker: true,

    });

    console.log(
        "Original:",
        (photo.size / 1024 / 1024).toFixed(2),
        "MB"
    );

    console.log(
        "Compressed:",
        (compressedPhoto.size / 1024 / 1024).toFixed(2),
        "MB"
    );

    //---------------------------------------
    // Upload
    //---------------------------------------

    const fileName = `${Date.now()}-${compressedPhoto.name}`;

    const { error: uploadError } = await supabase.storage
        .from("guest-photo")
        .upload(fileName, compressedPhoto, {
            upsert: false
        });

    if (uploadError) throw uploadError;

    //---------------------------------------
    // Get URL
    //---------------------------------------

    const { data } = supabase.storage
        .from("guest-photo")
        .getPublicUrl(fileName);

    photoUrl = data.publicUrl;

}

            // -----------------------------
            // Save RSVP
            // -----------------------------

            const { data, error } = await supabase
                .from("wedding invitation")
                .insert([
                    {
                        name,
                        gender,
                        guests,
                        attendance,
                        guest_names: guestNames,
                        photo_url: photoUrl,
                    },
                ])
                .select();

            if (error) throw error;

            console.log("RSVP Saved:", data);

            // -----------------------------
            // Generate AI Image
            // -----------------------------

//             console.log("Skipping AI generation...");
//             setGeneratedImage(result.imageUrl);
// setShowCard(true);

console.log("Generating guest artwork...");

const response = await fetch("http://localhost:3001/generate-invitation", {

    method: "POST",

    headers: {
        "Content-Type": "application/json",
    },

    body: JSON.stringify({
        photoUrl,
        gender
    }),

});

const result = await response.json();

console.log(result);

if (!result.success) {
    throw new Error(result.error);
}

setGeneratedImage(result.imageUrl);
setShowCard(true);

//             try {

//                 const response = await fetch("http://localhost:3001/generate-avatar", {

//                     method: "POST",

//                     headers: {
//                         "Content-Type": "application/json",
//                     },

//                     body: JSON.stringify({

//                         name,
//                         guests,
//                         attendance,
//                         photoUrl,

//                     }),

//                 });

//                 const result = await response.json();

// console.log("AI Result:", result);

// // Temporary until OpenAI image generation is finished
// const image =
//     result.imageUrl ||
//     "/placeholder-chibi.png";

// setGeneratedImage(image);
// setShowCard(true);

//             } catch (err) {

//                 console.warn("AI generation failed:", err);
            
//                 // Still show a placeholder keepsake
//                 setGeneratedImage("/placeholder-chibi.png");
//                 setShowCard(true);
            
//             }


            // -----------------------------
            // Reset Form
            // -----------------------------

            setName("");
            setGuests(1);
            setAttendance("accept");
            setGuestNames("");
            setPhoto(null);
            setPreview(null);

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

        finally {

            setLoading(false);
            setIsGenerating(false);

        }

    };

    return (

        <>

            {isGenerating && <AILoading />}

            {showCard && (
                <WeddingCard image = {generatedImage}  
                             onClose={() => setShowCard(false)}/>
            )}

            <div className="rsvp-card">

                <div className="rsvp-content">

                    {/* LEFT */}

                    <div className="rsvp-left">

                        <div className="form-group">

                            <label>

                                <LuLeaf />

                                Your Name

                            </label>

                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        <div className="gender-section">

    <label className="gender-title">

        <LuLeaf />

        Guest Gender

    </label>

    <div className="gender-cards">

        <button
            type="button"
            className={`gender-card ${
                gender === "female"
                    ? "active"
                    : ""
            }`}
            onClick={() => setGender("female")}
        >

            <FaVenus
                className="gender-icon"
                size={25}
            />

            <span className="gender-name">
                Female
            </span>

        </button>

        <button
            type="button"
            className={`gender-card ${
                gender === "male"
                    ? "active"
                    : ""
            }`}
            onClick={() => setGender("male")}
        >

            <FaMars
                className="gender-icon"
                size={25}
            />

            <span className="gender-name">
                Male
            </span>


        </button>

    </div>

</div>

                        <div className="form-group">

                            <label>

                                👥 Number of Guests

                            </label>

                            <div className="guest-counter">

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (guests > 1) {
                                            setGuests(guests - 1);
                                        }
                                    }}
                                >
                                    −
                                </button>

                                <span>{guests}</span>

                                <button
                                    type="button"
                                    onClick={() => setGuests(guests + 1)}
                                >
                                    +
                                </button>

                            </div>

                        </div>

                        <div className="form-group">

                            <label>

                                ♡ Will you be attending?

                            </label>

                            <div className="attendance">

                                <button
                                    type="button"
                                    className={attendance === "accept" ? "selected" : ""}
                                    onClick={() => setAttendance("accept")}
                                >

        

                                    Yes

                                </button>

                                <button
                                    type="button"
                                    className={attendance === "decline" ? "selected" : ""}
                                    onClick={() => setAttendance("decline")}
                                >


                                    No

                                </button>

                            </div>

                        </div>

                        <div className="form-group names-section">

    <label>
        🪑 Guest Names
    </label>

    <p className="field-description">
        Please enter the full names of everyone attending.
        These names will be used for your table seating.
        *Enter one name per line*
    </p>

    <textarea
        rows={4}
        className="guest-names-textarea"
        placeholder={`Please enter names here`}
        value={guestNames}
        onChange={(e) => setGuestNames(e.target.value)}
    />

</div>

                        {/*
                        <div className="form-group">

                            <label>🍽 Dietary Requirements</label>

                            <input
                                type="text"
                                value={dietary}
                                onChange={(e) => setDietary(e.target.value)}
                            />

                        </div>

                        <div className="form-group">

                            <label>💌 Message</label>

                            <textarea
                                rows="5"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                        </div>
                        */}

                    </div>

                    {/* RIGHT */}

                    <div className="rsvp-right">

                        <div className="photo-upload">

                            <input
                                id="photo-input"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handlePhotoUpload}
                            />

                            <label htmlFor="photo-input">

                                {

                                    preview ?

                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="photo-preview"
                                        />

                                        :

                                        <>

                                            <div className="camera">

                                                <LuImagePlus />

                                            </div>

                                            <h3>

                                                Upload Your Photo

                                            </h3>

                                            <p>

    Upload your photo to unlock a special surprise !
    <br />
    <em>Please upload a photo of one person only.</em>

</p>

                                        </>

                                }

                            </label>

                        </div>

                    </div>

                </div>

                <div className="rsvp-footer">

                    <button
                        className="submit-btn"
                        onClick={submitRSVP}
                        disabled={loading || isGenerating}
                    >

                        {

                            isGenerating

                                ? "✨ Creating your surprise..."

                                : loading

                                    ? "Submitting..."

                                    : "Submit RSVP"

                        }

                    </button>

                </div>

            </div>

        </>

    );

}

export default RSVPCard;
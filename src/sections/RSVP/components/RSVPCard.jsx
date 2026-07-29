import { useState } from "react";
import "./RSVPCard.css";
import { supabase } from "../../../utils/supabase";

import { LuLeaf, LuImagePlus } from "react-icons/lu";

function RSVPCard() {

    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [attendance, setAttendance] = useState("accept");
    const [dietary, setDietary] = useState("");
    const [message, setMessage] = useState("");

    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);

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
    
        try {

            // Upload photo to Supabase Storage
            let photoUrl = null;

            if (photo) {
            
                const fileName = `${Date.now()}-${photo.name}`;
            
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("guest-photo")
                    .upload(fileName, photo);
            
                console.log("Upload Data:", uploadData);
                console.log("Upload Error:", uploadError);
            
                if (uploadError) {
                    throw uploadError;
                }
            
                const { data } = supabase.storage
                    .from("guest-photo")
                    .getPublicUrl(fileName);
            
                photoUrl = data.publicUrl;
            }
              
            const { data, error } = await supabase
                .from("wedding invitation")
                .insert([
                    {
                        name,
                        guests,
                        attendance,
                        photo_url: photoUrl
                    }
                ])
                .select();
    
            if (error) {
    
                throw error;
    
            }
    
            console.log(data);
    
            alert("🎉 RSVP Submitted!");
    
            setName("");
            setGuests(1);
            setAttendance("accept");
            setPhoto(null);
            setPreview(null);
    
        }
    
        catch (error) {
    
            console.error(error);
    
            alert(error.message);
    
        }
    
        finally {
    
            setLoading(false);
    
        }
    
    };
    
    //         const text = await response.text();
    
    //         console.log(text);
    
    //         alert("🎉 RSVP Submitted!");
    
    //         setName("");
    //         setGuests(1);
    //         setAttendance("accept");
    //         setPhoto(null);
    //         setPreview(null);
    
    //     }
    
    //     catch (error) {
    
    //         console.error(error);
    
    //         alert(error.message);
    
    //     }
    
    //     finally {
    
    //         setLoading(false);
    
    //     }
    
    // };

    return (

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

                                ♡

                                <br />

                                Joyfully Accept

                            </button>

                            <button

                                type="button"

                                className={attendance === "decline" ? "selected" : ""}

                                onClick={() => setAttendance("decline")}

                            >

                                ♡

                                <br />

                                Regretfully Decline

                            </button>

                        </div>

                    </div>

                    {/* Uncomment if needed

                    <div className="form-group">

                        <label>🍽 Dietary Requirements</label>

                        <input

                            type="text"

                            placeholder="Optional"

                            value={dietary}

                            onChange={(e) => setDietary(e.target.value)}

                        />

                    </div>

                    <div className="form-group">

                        <label>💌 Leave us a Message</label>

                        <textarea

                            rows="5"

                            placeholder="Write a little note..."

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

                                (

                                    <img

                                        src={preview}

                                        alt="Preview"

                                        className="photo-preview"

                                    />

                                )

                                :

                                (

                                    <>

                                        <div className="camera">

                                            <LuImagePlus />

                                        </div>

                                        <h3>

                                            Moment with Us

                                        </h3>

                                        <p>

                                            Upload your photo to unlock a surprise!

                                        </p>

                                    </>

                                )

                            }

                        </label>

                    </div>

                </div>

            </div>

            {/* FOOTER */}

            <div className="rsvp-footer">

                <button

                    className="submit-btn"

                    onClick={submitRSVP}

                    disabled={loading}

                >

                    {

                        loading

                        ?

                        "Submitting..."

                        :

                        "Submit RSVP"

                    }

                </button>

            </div>

        </div>

    );

}

export default RSVPCard;
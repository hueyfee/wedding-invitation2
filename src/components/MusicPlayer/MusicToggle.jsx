import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import "./MusicToggle.css";

function MusicToggle({ playing, toggle }) {

    return (

        <button
            className="music-toggle"
            onClick={toggle}
            aria-label="Toggle music"
        >
            {playing ? (
                <HiSpeakerWave />
            ) : (
                <HiSpeakerXMark />
            )}
        </button>

    );

}

export default MusicToggle;
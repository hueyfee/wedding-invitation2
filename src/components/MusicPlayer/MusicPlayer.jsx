import { useEffect, useRef } from "react";

import music from "../../assets/music/wedding.mp3";

function MusicPlayer({ playing }) {

    const audioRef = useRef(null);

    useEffect(() => {

        const audio = audioRef.current;

        if (!audio) return;

        let fadeInterval;

        if (playing) {

            // Start quietly
            audio.volume = 0;

            audio.play().catch((err) => {

                console.log("Music autoplay prevented:", err);

            });

            let volume = 0;

            fadeInterval = setInterval(() => {

                volume += 0.02;

                if (volume >= 0.25) {

                    volume = 0.25;

                    clearInterval(fadeInterval);

                }

                audio.volume = volume;

            }, 100);

        } else {

            let volume = audio.volume;

            fadeInterval = setInterval(() => {

                volume -= 0.02;

                if (volume <= 0) {

                    volume = 0;

                    audio.volume = 0;

                    audio.pause();

                    clearInterval(fadeInterval);

                    return;

                }

                audio.volume = volume;

            }, 100);

        }

        return () => {

            clearInterval(fadeInterval);

        };

    }, [playing]);

    return (

        <audio

            ref={audioRef}

            loop

            preload="auto"

        >

            <source

                src={music}

                type="audio/mpeg"

            />

            Your browser does not support audio.

        </audio>

    );

}

export default MusicPlayer;
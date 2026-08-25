import { useState } from "react";

import Loading from "./components/Loading/Loading";
import Envelope from "./components/Envelope/Envelope";
import Wedding from "./pages/Wedding/Wedding";

import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import MusicToggle from "./components/MusicPlayer/MusicToggle";

import "./styles/responsive.css";
import "./App.css";

function App() {

    const [scene, setScene] = useState("loading");

    const [musicPlaying, setMusicPlaying] = useState(false);

    return (

        <>

            {/* Background Music */}

            <MusicPlayer
                playing={musicPlaying}
            />

          <MusicToggle
              playing={musicPlaying}
              toggle={() => setMusicPlaying(!musicPlaying)}
          />
            {/* Loading */}

            {scene === "loading" && (

                <Loading

                    onFinish={() => {

                        setMusicPlaying(true);

                        setScene("envelope");

                    }}

                />

            )}

            {/* Envelope */}

            {scene === "envelope" && (

                <Envelope

                    onFinished={() => {

                        setScene("wedding");

                    }}

                />

            )}

            {/* Wedding */}

            {scene === "wedding" && (

                <Wedding />

            )}

        </>

    );

}

export default App;
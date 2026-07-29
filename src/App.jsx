import { useState } from "react";

import Loading from "./components/Loading/Loading";
import Envelope from "./components/Envelope/Envelope";
import Wedding from "./pages/Wedding/Wedding";
import "./App.css";

function App() {

    const [scene, setScene] = useState("loading");
    console.log(scene);
    return (

        <>

            {scene === "loading" && (

                <Loading
                    onFinish={() => setScene("envelope")}
                />

            )}

            {scene === "envelope" && (

                <Envelope
                    onFinished={() => setScene("wedding")}
                />

            )}

            {scene === "wedding" && (

                <Wedding />

            )}

        </>

    );

}

export default App;
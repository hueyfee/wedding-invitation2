import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { analyseGuest } from "./services/analyseGuest.js";
import { generateGuest } from "./services/generateGuest.js";
import { composeInvitation } from "./services/composeInvitation.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(cors());

app.use(
    express.json({
        limit: "20mb"
    })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatedFolder = path.join(
    __dirname,
    "generated"
);

if (!fs.existsSync(generatedFolder)) {
    fs.mkdirSync(generatedFolder);
}

app.use(
    "/generated",
    express.static(generatedFolder)
);

app.get("/", (req, res) => {

    res.send("Wedding Invitation API Running");

});

app.post("/generate-invitation", async (req, res) => {

    try {

        const { photoUrl } = req.body;

        //----------------------------------------
        // Validation
        //----------------------------------------

        // if (!photoUrl) {

        //     return res.status(400).json({

        //         success: false,

        //         error: "photoUrl missing"

        //     });

        // }

        console.log("");
        console.log("======================================");
        console.log("AI Wedding Invitation");
        console.log("======================================");
        console.log("Photo:");
        console.log(photoUrl);
        console.log("");

        //----------------------------------------
// Guest Buffer
//----------------------------------------

let guestBuffer = null;

// Default gender from frontend
let finalGender = req.body.gender || "female";

//--------------------------------------------------
// Photo uploaded → Generate AI guest
//--------------------------------------------------

if (photoUrl) {

    console.log("");
    console.log("Photo uploaded.");
    console.log("Generating AI guest...");

    //----------------------------------------
    // STEP 1
    // Analyse guest
    //----------------------------------------

    const guest = await analyseGuest(photoUrl);

    console.log("");
    console.log("Guest Analysis");

    console.log(
        JSON.stringify(
            guest,
            null,
            2
        )
    );

    //----------------------------------------
    // STEP 2
    // Generate Guest
    //----------------------------------------

    guestBuffer = await generateGuest(
        photoUrl,
        guest
    );

    console.log("Guest Generated");

    finalGender = guest.gender;

}
else {

    console.log("");
    console.log("No photo uploaded.");
    console.log("Using placeholder character.");

}

//----------------------------------------
// STEP 3
// Compose Invitation
//----------------------------------------

const invitationBuffer =
    await composeInvitation(
        guestBuffer,
        finalGender
    );

console.log("Invitation Composed");

        //----------------------------------------
        // Save
        //----------------------------------------

        const filename =
            `invitation-${Date.now()}.png`;

        fs.writeFileSync(

            path.join(
                generatedFolder,
                filename
            ),

            invitationBuffer

        );

        console.log("");

        console.log("Finished");

        console.log("");

        //----------------------------------------
        // Return URL
        //----------------------------------------

        res.json({

            success: true,
        
            imageUrl:
                `${req.protocol}://${req.get("host")}/generated/${filename}`
        
        });

    }

    catch (err) {

        console.error("");

        console.error("======================================");
        console.error("Generation Failed");
        console.error("======================================");

        console.error(err);

        res.status(500).json({

            success: false,

            error: err.message

        });

    }

});

const PORT =
    process.env.PORT || 3001;

app.listen(PORT, () => {

    console.log("");
    console.log("======================================");
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("======================================");
    console.log("");

});
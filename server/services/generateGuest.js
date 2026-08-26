import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";
import OpenAI, { toFile } from "openai";
import { fileURLToPath } from "url";

import { GUEST_PROMPT } from "../prompts/guestPrompt.js";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateGuest(photoUrl, guest) {

    console.log("");
    console.log("======================================");
    console.log("Generating AI Wedding Guest");
    console.log("======================================");

    console.log(guest);

    //----------------------------------------
    // Download uploaded guest photo
    //----------------------------------------

    const response = await fetch(photoUrl);

    if (!response.ok) {
        throw new Error("Unable to download guest photo.");
    }

    const imageBuffer = Buffer.from(
        await response.arrayBuffer()
    );

    const contentType =
        response.headers.get("content-type") ||
        "image/jpeg";

    let extension = "jpg";

    if (contentType.includes("png"))
        extension = "png";

    if (contentType.includes("webp"))
        extension = "webp";

        //----------------------------------------
    // Generated Folder
    //----------------------------------------

    const generatedFolder = path.join(
        __dirname,
        "../generated"
    );

    if (!fs.existsSync(generatedFolder)) {

        fs.mkdirSync(generatedFolder);

    }

        //----------------------------------------
    // Save uploaded photo
    //----------------------------------------

    const uploadPath = path.join(

        generatedFolder,

        `guest-upload-${Date.now()}.${extension}`

    );

    fs.writeFileSync(
        uploadPath,
        imageBuffer
    );

    try {

        //----------------------------------------
        // Convert uploaded photo
        //----------------------------------------

        const guestPhoto = await toFile(

            await fs.promises.readFile(uploadPath),

            path.basename(uploadPath),

            {
                type: contentType
            }

        );

        //----------------------------------------
        // Build Guest Information
        //----------------------------------------

        const guestInformation = [

            `Gender: ${guest.gender}`,

            `Age Group: ${guest.ageGroup}`,

            `Hair Style: ${guest.hairStyle}`,

            `Hair Colour: ${guest.hairColour}`,

            `Face Shape: ${guest.faceShape}`,

            `Skin Tone: ${guest.skinTone}`,

            `Glasses: ${guest.glasses}`,

            `Expression: ${guest.expression}`,

            `Outfit: ${guest.outfit}`,

            `Accessories: ${
                guest.accessories?.length
                    ? guest.accessories.join(", ")
                    : "None"
            }`

        ].join("\n");

                //----------------------------------------
        // Dynamic Rules
        //----------------------------------------

        const glassesRule =
            guest.glasses === "none"
                ? `
The guest is NOT wearing glasses.

Do NOT generate glasses.
Do NOT invent glasses.
`
                : `
The guest IS wearing ${guest.glasses}.

Preserve the same glasses.
`;

        const accessoryRule =
            guest.accessories?.length
                ? `
Preserve these accessories exactly:

${guest.accessories.join(", ")}
`
                : `
The guest is not carrying any accessories.

Do not invent accessories.
`;

        //----------------------------------------
        // Bride Reference
        //----------------------------------------

        const brideReference = await toFile(

            await fs.promises.readFile(

                path.join(

                    __dirname,

                    "../assets/bride-reference.png"

                )

            ),

            "bride-reference.png",

            {

                type: "image/png"

            }

        );

                //----------------------------------------
        // Groom Reference
        //----------------------------------------

        const groomReference = await toFile(

            await fs.promises.readFile(

                path.join(

                    __dirname,

                    "../assets/groom-reference.png"

                )

            ),

            "groom-reference.png",

            {

                type: "image/png"

            }

        );
            //----------------------------------------
        // Build Prompt
        //----------------------------------------

        const prompt = `
${GUEST_PROMPT}

==================================================
ROLE
==================================================

Create ONE premium wedding chibi character.

The character must look like another person from the
same illustration as the bride and groom.

==================================================
REFERENCE IMAGES
==================================================

Image 1
Bride style reference.

Image 2
Groom style reference.

These TWO images define EVERYTHING about the art style.

Copy exactly:

• rendering
• lighting
• colour palette
• eye style
• face style
• body proportions
• head size
• body height
• shoulder width
• arm length
• leg length
• hand size
• foot size

Image 3
Uploaded guest.

Use ONLY for:

• identity
• hairstyle
• hair colour
• face
• skin tone
• outfit
• accessories

Ignore:

• pose
• body
• camera angle
• framing
• proportions

==================================================
GUEST INFORMATION
==================================================

${guestInformation}

==================================================
SPECIAL RULES
==================================================

${glassesRule}

${accessoryRule}

==================================================
BODY
==================================================

Generate a NEW body.

Never copy the uploaded body.

Always generate:

• standing upright

• facing forward

• relaxed pose

• both arms beside the body

• feet together

• symmetrical pose

• full body visible

• centred

==================================================
PROPORTIONS
==================================================

The guest MUST use the SAME chibi proportions as the
bride and groom.

For FEMALE guests:

• elegant

• petite

• slim waist

• narrow shoulders

For MALE guests:

• elegant

• slightly taller than the bride

• slim build

• narrow shoulders

• narrow torso

• fitted tailored suit

• slim waist

• long straight legs

• refined silhouette

The groom should remain the broadest male character.

The guest should be approximately 10% slimmer than the groom.

The head size should remain the SAME as the groom.

Only the torso should be slimmer.

Do NOT generate:

• bulky chest

• oversized jacket

• broad shoulders

• thick torso

• muscular build


==================================================
FRAMING
==================================================

Generate a complete full-body character.

Leave plenty of white space around the character.

The entire character must be visible.

Do not crop.

Do not zoom in.

Pure white background.

==================================================
OUTPUT
==================================================

One character only.

No background.

No shadow.

No floor.

No text.

No border.

The output should look like an official character from
the bride and groom illustration.
`;

        //----------------------------------------
        // Save Prompt
        //----------------------------------------

        fs.writeFileSync(

            path.join(
                generatedFolder,
                "guest-prompt.txt"
            ),

            prompt

        );

        console.log("======================================");
        console.log("Generating Guest...");
        console.log("======================================");

                //----------------------------------------
        // GPT Image
        //----------------------------------------

        const result = await client.images.edit({

            model: "gpt-image-1",

            image: [


                guestPhoto,

                brideReference,

                groomReference


            ],

            prompt,

            quality: "high"

        });

        if (!result.data || result.data.length === 0) {

            throw new Error(
                "OpenAI returned no image."
            );

        }

                //----------------------------------------
        // Convert Base64 → Buffer
        //----------------------------------------

        const guestBuffer = Buffer.from(

            result.data[0].b64_json,

            "base64"

        );

                //----------------------------------------
        // Save Raw Guest
        //----------------------------------------

        fs.writeFileSync(

            path.join(
                generatedFolder,
                "raw-guest.png"
            ),

            guestBuffer

        );

                //----------------------------------------
        // Save Latest Guest
        //----------------------------------------

        fs.writeFileSync(

            path.join(
                generatedFolder,
                "latest-guest.png"
            ),

            guestBuffer

        );

                //----------------------------------------
        // Save Timestamp Copy
        //----------------------------------------

        fs.writeFileSync(

            path.join(

                generatedFolder,

                `guest-${Date.now()}.png`

            ),

            guestBuffer

        );

                //----------------------------------------
        // Log
        //----------------------------------------

        console.log("");

        console.log("======================================");
        console.log("Guest Generated Successfully");
        console.log("======================================");

        console.log("Gender:", guest.gender);

        console.log("Hair:", guest.hairStyle);

        console.log("Outfit:", guest.outfit);

        console.log("Accessories:", guest.accessories);

        console.log("");

                //----------------------------------------
        // Return
        //----------------------------------------

        return guestBuffer;

    }

    finally {

        //----------------------------------------
        // Cleanup
        //----------------------------------------

        if (fs.existsSync(uploadPath)) {

            fs.unlinkSync(uploadPath);

        }

    }

}
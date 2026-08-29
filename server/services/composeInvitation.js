import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//--------------------------------------------------
// Position Settings
//--------------------------------------------------

const GUEST_POSITION = {

    female: {

        left: 85,

        groundY: 1328,

        targetHeight: 630,

        bodyWidth : 0.80

    },

    male: {

        left: 760,

        groundY: 1330,

        targetHeight: 680,

        bodyWidth: 0.80


    }

};

//--------------------------------------------------
// Ground Position
//--------------------------------------------------

const GROUND_MARGIN = 55;
//--------------------------------------------------
//--------------------------------------------------
// Use placeholder if no AI guest exists
//--------------------------------------------------



export async function composeInvitation(
    guestBuffer,
    gender = "female"
) {

    console.log("======================================");
    console.log("Compositing Invitation");
    console.log("======================================");

    //--------------------------------------------------
    // Load Invitation
    //--------------------------------------------------

    const invitationPath = path.join(
        __dirname,
        "../assets/placeholder-chibi.png"
    );

    const invitation = sharp(invitationPath);

    //--------------------------------------------------
    // No guest uploaded
    //--------------------------------------------------

    if (!guestBuffer) {

        console.log("");
        console.log("No photo uploaded.");
        console.log("Returning original invitation.");

        return await invitation
            .png()
            .toBuffer();

    }

    //--------------------------------------------------
    // Generated folder
    //--------------------------------------------------

    const generatedFolder = path.join(
        __dirname,
        "../generated"
    );

    //--------------------------------------------------
// Remove white background
//--------------------------------------------------

//--------------------------------------------------
// Guest Image
//--------------------------------------------------

const guestImage = sharp(guestBuffer);

const { data, info } = await guestImage
    .ensureAlpha()
    .raw()
    .toBuffer({
        resolveWithObject: true
    });
for (let i = 0; i < data.length; i += 4) {

const r = data[i];
const g = data[i + 1];
const b = data[i + 2];

// Distance from pure white
const distance =
    Math.sqrt(
        (255 - r) ** 2 +
        (255 - g) ** 2 +
        (255 - b) ** 2
    );

// Remove near-white pixels
if (distance < 35) {

    data[i + 3] = 0;

}

}

const transparentGuest = await sharp(data, {

raw: {

    width: info.width,
    height: info.height,
    channels: 4

}

})
.png()
.toBuffer();

fs.writeFileSync(

path.join(
    generatedFolder,
    "transparent-guest.png"
),

transparentGuest

);

console.log("✅ Background removed.");
    //--------------------------------------------------
    // Trim transparent border
    //--------------------------------------------------

    const trimmedGuest = await sharp(
        transparentGuest
    )
        .trim()
        .png()
        .toBuffer();

    //--------------------------------------------------
// Read trimmed guest as raw pixels
//--------------------------------------------------

const {

    data: trimmedPixels,

    info: trimmedInfo

} = await sharp(trimmedGuest)
    .ensureAlpha()
    .raw()
    .toBuffer({

        resolveWithObject: true

    });

    fs.writeFileSync(
        path.join(
            generatedFolder,
            "trimmed-guest.png"
        ),
        trimmedGuest
    );

    //--------------------------------------------------
// Find body bounding box
//--------------------------------------------------

let minX = trimmedInfo.width;
let minY = trimmedInfo.height;

let maxX = 0;
let maxY = 0;

for (

    let y = 0;

    y < trimmedInfo.height;

    y++

) {

    for (

        let x = 0;

        x < trimmedInfo.width;

        x++

    ) {

        const index =
            (y * trimmedInfo.width + x) * 4;

        const alpha =
            trimmedPixels[index + 3];

        if (alpha > 10) {

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;

            if (y < minY) minY = y;
            if (y > maxY) maxY = y;

        }

    }

}

//--------------------------------------------------
// Add small padding
//--------------------------------------------------

const PADDING = 8;

minX = Math.max(
    0,
    minX - PADDING
);

minY = Math.max(
    0,
    minY - PADDING
);

maxX = Math.min(
    trimmedInfo.width,
    maxX + PADDING
);

maxY = Math.min(
    trimmedInfo.height,
    maxY + PADDING);


    //--------------------------------------------------
// Crop body
//--------------------------------------------------

const croppedGuest = await sharp(
    trimmedGuest
)

.extract({

    left: minX,

    top: minY,

    width: maxX - minX,

    height: maxY - minY

})

.png()

.toBuffer();

fs.writeFileSync(

    path.join(

        generatedFolder,

        "cropped-guest.png"

    ),

    croppedGuest

);
    //--------------------------------------------------
    // Guest Metadata
    //--------------------------------------------------

    const croppedMeta =
    await sharp(croppedGuest).metadata();

    console.log("Cropped Guest");

    console.log({
    
        width: croppedMeta.width,
    
        height: croppedMeta.height
    
    });
    //--------------------------------------------------
    // Resize using MAX WIDTH + MAX HEIGHT
    //--------------------------------------------------

    const pos =
        GUEST_POSITION[gender] ||
        GUEST_POSITION.female;

    //--------------------------------------------------
// Resize Guest
//--------------------------------------------------

const resizedGuest = await sharp(croppedGuest)
.resize({

    height: pos.targetHeight,

    fit: "inside",

    withoutEnlargement: false

})
.png()
.toBuffer();

// Read resized dimensions
const resizedMeta = await sharp(resizedGuest).metadata();

// Compress width only
const slimGuest = await sharp(resizedGuest)
    .resize({
        width: Math.round(resizedMeta.width * pos.bodyWidth),
        height: resizedMeta.height,
        fit: "fill"
    })
    .png()
    .toBuffer();


fs.writeFileSync(

path.join(

    generatedFolder,

    "resized-guest.png"

),

resizedGuest

);

//     //--------------------------------------------------
//     // Load Invitation
//     //--------------------------------------------------

//     const invitationPath = path.join(

//         __dirname,

//         "../assets/placeholder-chibi.png"

//     );

//     const invitation =
//         sharp(invitationPath);

//     const invitationMeta =
//         await invitation.metadata();

//     //--------------------------------------------------
// // No guest uploaded
// //--------------------------------------------------

// if (!guestBuffer) {

//     console.log("");
//     console.log("No photo uploaded.");
//     console.log("Returning original invitation.");

//     return await invitation
//         .png()
//         .toBuffer();

// }

    const guestMeta =
        await sharp(slimGuest).metadata();

    //--------------------------------------------------
// Guest Position
//--------------------------------------------------

const left = pos.left;

const feetOffset = 40;

const top =
    pos.groundY -
    guestMeta.height+
    feetOffset;

console.log("");

console.log("Guest Placement");

console.log({

    left,

    top,

    guestWidth: guestMeta.width,

    guestHeight: guestMeta.height,

    groundY: pos.groundY

});

    //--------------------------------------------------
    // Composite
    //--------------------------------------------------

    const finalInvitation =
        await invitation
            .composite([
                {
                    input: slimGuest,
                    left,
                    top
                }
            ])
            .png()
            .toBuffer();

    //--------------------------------------------------
    // Save
    //--------------------------------------------------

    fs.writeFileSync(

        path.join(
            generatedFolder,
            "latest-invitation.png"
        ),

        finalInvitation

    );

    console.log("✅ Invitation composed.");

    return finalInvitation;

}
import fs from "fs";
import dotenv from "dotenv";
import OpenAI, { toFile } from "openai";
import mime from "mime-types";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const filename = "./test-photo.jpg";

async function main() {

    try {

        const image = await toFile(
            await fs.promises.readFile(filename),
            "test-photo.jpg",
            {
                type: mime.lookup(filename)
            }
        );

        const result = await client.images.edit({

            model: "gpt-image-1",

            image,

            prompt: `
Turn this person into a cute 3D chibi.
Keep the same face.
Wedding guest outfit.
Transparent PNG.
No background.
            `

        });

        fs.writeFileSync(
            "output.png",
            Buffer.from(
                result.data[0].b64_json,
                "base64"
            )
        );

        console.log("✅ SUCCESS");

    } catch (err) {

        console.dir(err, { depth: null });

    }

}

main();
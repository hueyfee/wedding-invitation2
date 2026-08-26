import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
    try {

        const result = await client.images.generate({
            model: "gpt-image-1",
            prompt: "A cute cat",
            size: "1024x1024"
        });

        console.log("✅ SUCCESS");
        console.log(result);

    } catch (err) {

        console.error("❌ FAILED");
        console.error(err);

    }
}

test();
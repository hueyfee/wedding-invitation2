import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.REPLICATE_API_TOKEN);

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

try {

    console.log("Testing Replicate...");

    const output = await replicate.run(
        "black-forest-labs/flux-schnell",
        {
            input: {
                prompt: "A cute white cat"
            }
        }
    );

    console.log("✅ Success!");
    console.log(output);

} catch (err) {

    console.error(err);

}
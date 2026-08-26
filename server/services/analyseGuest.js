import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function analyseGuest(photoUrl) {

    console.log("======================================");
    console.log("Analysing Guest...");
    console.log("======================================");

    const response = await client.responses.create({

        model: "gpt-5.1",

        input: [

            {

                role: "system",

                content: `

You are an expert computer vision system.

Your ONLY job is to extract visible attributes.

You NEVER guess.

You NEVER imagine.

You NEVER beautify.

You NEVER infer.

Only describe what is clearly visible.

If an attribute cannot be determined,
return "unknown".

Return JSON only.

Do NOT explain anything.

Do NOT write markdown.

Do NOT wrap the JSON.

Use exactly this schema.

{
    "gender": "",
    "ageGroup": "",
    "hairStyle": "",
    "hairColour": "",
    "faceShape": "",
    "skinTone": "",
    "glasses": "",
    "expression": "",
    "outfit": "",
    "accessories": [],
    "pose": "",
    "cameraAngle": ""
}

------------------------------

Rules

Gender

male

female

unknown

Only return male/female if visually obvious.

Otherwise unknown.

------------------------------

Age Group

child

teenager

young adult

adult

older adult

unknown

------------------------------

Hair Style

Choose ONE.

short

bob

shoulder length

long

ponytail

bun

braided

curly

wavy

straight

unknown

------------------------------

Hair Colour

black

dark brown

brown

light brown

blonde

grey

white

red

unknown

Never estimate from lighting.

------------------------------

Face Shape

round

oval

heart

square

long

unknown

------------------------------

Skin Tone

fair

light

medium

tan

dark

unknown

------------------------------

Glasses

none

round glasses

square glasses

oval glasses

sunglasses

unknown

If NO glasses are visible

return

none

Never guess.

------------------------------

Expression

smiling

neutral

serious

laughing

unknown

------------------------------

Outfit

Maximum ONE sentence.

Example

black graduation gown

white t-shirt and jeans

blue business suit

pink floral dress

------------------------------

Accessories

Return ONLY objects physically worn or carried.

Examples

[]

["bouquet"]

["handbag"]

["backpack"]

["hat"]

["phone"]

Do NOT include

hair

glasses

clothing

Return [] if none.

------------------------------

Pose

standing

sitting

walking

running

kneeling

leaning

selfie

unknown

------------------------------

Camera Angle

front

left profile

right profile

three-quarter

selfie

unknown

`

            },

            {

                role: "user",

                content: [

                    {

                        type: "input_text",

                        text: "Analyse this guest."

                    },

                    {

                        type: "input_image",

                        image_url: photoUrl

                    }

                ]

            }

        ]

    });

    const text = response.output_text;

    console.log(text);

    try {

        return JSON.parse(text);

    }

    catch {

        console.log("⚠️ Invalid JSON returned.");

        console.log(text);

        throw new Error("Guest analysis failed.");

    }

}
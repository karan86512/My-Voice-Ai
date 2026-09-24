const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const upload = multer({
    dest: "uploads/"
});

// Make sure folders exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

if (!fs.existsSync("generated")) {
    fs.mkdirSync("generated");
}

// ===============================
// CREATE VOICE CLONE
// ===============================

app.post(
    "/api/clone-voice",
    upload.array("audioFiles", 5),
    async (req, res) => {

        try {

            const { voiceName } = req.body;

            if (!voiceName) {
                return res.status(400).json({
                    success: false,
                    message: "Voice name is required."
                });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Please upload at least one MP3 file."
                });
            }

            // Native Node.js FormData
            const formData = new FormData();

            // Voice name
            formData.append("name", voiceName);

            // Add uploaded MP3 files
            for (const file of req.files) {

                const audioBuffer = fs.readFileSync(file.path);

                const audioBlob = new Blob(
                    [audioBuffer],
                    {
                        type: "audio/mpeg"
                    }
                );

                formData.append(
                    "files",
                    audioBlob,
                    file.originalname
                );
            }

            console.log("Sending voice clone request to ElevenLabs...");

            const response = await fetch(
                "https://api.elevenlabs.io/v1/voices/add",
                {
                    method: "POST",

                    headers: {
                        "xi-api-key":
                            process.env.ELEVENLABS_API_KEY
                    },

                    body: formData
                }
            );

            const data = await response.json();

            // Delete temporary uploaded files
            for (const file of req.files) {

                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            }

            console.log(
                "ElevenLabs Status:",
                response.status
            );

            if (!response.ok) {

                console.error(
                    "ElevenLabs Clone Error:",
                    data
                );

                return res.status(response.status).json({
                    success: false,
                    message:
                        typeof data?.detail === "string"
                            ? data.detail
                            : data?.detail?.message ||
                              "Voice cloning failed."
                });
            }

            console.log(
                "Voice created:",
                data.voice_id
            );

            return res.json({
                success: true,
                voiceId: data.voice_id
            });

        } catch (error) {

            console.error(
                "Voice Clone Server Error:",
                error
            );

            // Cleanup uploaded files if an error occurs
            if (req.files) {

                for (const file of req.files) {

                    if (fs.existsSync(file.path)) {
                        try {
                            fs.unlinkSync(file.path);
                        } catch (cleanupError) {
                            console.error(
                                "Cleanup error:",
                                cleanupError
                            );
                        }
                    }
                }
            }

            return res.status(500).json({
                success: false,
                message:
                    "Server error while creating voice."
            });
        }
    }
);
 

         

// ===============================
// GENERATE SPEECH
// ===============================

app.post("/api/generate-speech", async (req, res) => {

    try {

        const { text, voiceId } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Script is required."
            });
        }

        if (!voiceId) {
            return res.status(400).json({
                success: false,
                message: "Voice ID is required."
            });
        }

        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
            {
                method: "POST",

                headers: {
                    "xi-api-key": process.env.ELEVENLABS_API_KEY,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text,
                    model_id: "eleven_multilingual_v2"
                })
            }
        );

        if (!response.ok) {

            const errorText = await response.text();

            console.error("TTS Error:", errorText);

            return res.status(response.status).json({
                success: false,
                message: "Speech generation failed."
            });
        }

        const audioBuffer = Buffer.from(
            await response.arrayBuffer()
        );

        const fileName =
            `voice-${Date.now()}.mp3`;

        const filePath =
            path.join(__dirname, "generated", fileName);

        fs.writeFileSync(
            filePath,
            audioBuffer
        );

        res.json({
            success: true,
            downloadUrl: `/generated/${fileName}`
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error while generating speech."
        });
    }
});


// Serve generated MP3 files
app.use(
    "/generated",
    express.static(
        path.join(__dirname, "generated")
    )
);


// Test API
app.get("/api/test", (req, res) => {

    res.json({
        success: true,
        message: "MyVoice AI backend is working!"
    });

});


app.listen(PORT, () => {

    console.log(
        `MyVoice AI running at http://localhost:${PORT}`
    );

});
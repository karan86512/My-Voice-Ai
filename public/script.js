let currentVoiceId = null;


const voiceName =
    document.getElementById("voiceName");

const audioFiles =
    document.getElementById("audioFiles");

const cloneBtn =
    document.getElementById("cloneBtn");

const cloneStatus =
    document.getElementById("cloneStatus");

const scriptText =
    document.getElementById("scriptText");

const charCount =
    document.getElementById("charCount");

const voiceStatus =
    document.getElementById("voiceStatus");

const generateBtn =
    document.getElementById("generateBtn");

const generateStatus =
    document.getElementById("generateStatus");

const downloadBtn =
    document.getElementById("downloadBtn");


/* =========================
   CHARACTER COUNTER
========================= */

scriptText.addEventListener(
    "input",
    () => {

        charCount.textContent =
            scriptText.value.length;

    }
);


/* =========================
   CLONE VOICE
========================= */

cloneBtn.addEventListener(
    "click",
    async () => {

        if (
            !voiceName.value.trim()
        ) {
            cloneStatus.textContent =
                "Please enter a voice name.";

            return;
        }


        if (
            audioFiles.files.length === 0
        ) {
            cloneStatus.textContent =
                "Please upload at least one voice sample.";

            return;
        }


        const formData =
            new FormData();

        formData.append(
            "voiceName",
            voiceName.value
        );


        for (
            let i = 0;
            i < audioFiles.files.length;
            i++
        ) {

            formData.append(
                "audioFiles",
                audioFiles.files[i]
            );

        }


        try {

            cloneBtn.disabled = true;

            cloneBtn.textContent =
                "Creating AI Voice...";

            cloneStatus.textContent =
                "Uploading voice samples...";


            const response =
                await fetch(
                    "/api/clone-voice",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!data.success) {
                throw new Error(
                    data.message
                );
            }


            currentVoiceId =
                data.voiceId;


            cloneStatus.textContent =
                "✓ Voice cloned successfully!";


            voiceStatus.textContent =
                "✓ AI Voice Ready";


            voiceStatus.style.color =
                "#22a06b";


        } catch (error) {

            cloneStatus.textContent =
                "Error: " + error.message;

        } finally {

            cloneBtn.disabled = false;

            cloneBtn.textContent =
                "Create My AI Voice";

        }

    }
);


/* =========================
   GENERATE SPEECH
========================= */

generateBtn.addEventListener(
    "click",
    async () => {

        const text =
            scriptText.value.trim();


        if (!currentVoiceId) {

            generateStatus.textContent =
                "Please create your AI voice first.";

            return;
        }


        if (!text) {

            generateStatus.textContent =
                "Please enter a script.";

            return;
        }


        try {

            generateBtn.disabled = true;

            generateBtn.textContent =
                "Generating Voice...";

            generateStatus.textContent =
                "AI is creating your audio...";

            downloadBtn.style.display =
                "none";


            const response =
                await fetch(
                    "/api/generate-speech",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            text: text,
                            voiceId: currentVoiceId
                        })
                    }
                );


            const data =
                await response.json();


            if (!data.success) {

                throw new Error(
                    data.message
                );

            }


            generateStatus.textContent =
                "✓ Audio generated successfully!";


            downloadBtn.href =
                data.downloadUrl;


            downloadBtn.style.display =
                "block";


        } catch (error) {

            generateStatus.textContent =
                "Error: " + error.message;

        } finally {

            generateBtn.disabled = false;

            generateBtn.textContent =
                "Generate Voice";

        }

    }
);
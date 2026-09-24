# 🎙️ MyVoice AI

**AI Voice Studio for creating natural speech from your own voice.**

MyVoice AI is a Node.js-based AI voice generation web application that allows users to upload their own voice sample, create an AI voice using the ElevenLabs API, and generate speech from an original script.

> **Use only your own voice or a voice you have explicit permission to use.**

---

## ✨ Features

- 🎙️ Upload your own voice samples
- 🤖 AI voice creation using ElevenLabs
- 📝 Write or paste your script
- 🔊 Generate natural AI speech
- 🎧 MP3 output
- ⬇️ Download generated audio
- 📊 Real-time character counter
- 🔒 Environment-variable based API key protection
- 📱 Responsive and modern UI
- ⚡ Node.js backend
- 🌐 Separate frontend and backend architecture

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### AI
- ElevenLabs API

### Development
- Git
- GitHub
- VS Code

---

## 📁 Project Structure

```text
my-voice-ai/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── .env
```

> `.env` is intentionally excluded from GitHub using `.gitignore`.

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/my-voice-ai.git
```

### 2. Open the project

```bash
cd my-voice-ai
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a file named:

```text
.env
```

Add your ElevenLabs API key:

```env
ELEVENLABS_API_KEY=your_api_key_here
```

**Never commit `.env` to GitHub.**

### 5. Start the server

```bash
node server.js
```

The application should run at:

```text
http://localhost:3000
```

---

## 🎯 How It Works

### Step 1 — Upload Voice

Upload a clear recording of your own voice and provide a voice name.

### Step 2 — Create AI Voice

MyVoice AI sends the voice sample to the ElevenLabs API and creates an AI voice.

### Step 3 — Add Script

Write or paste your original script into the text area.

### Step 4 — Generate Speech

The backend sends the script to the selected AI voice and receives generated audio.

### Step 5 — Download

The generated speech can be downloaded as an MP3 file.

---

## 🔐 Security

MyVoice AI uses environment variables for the ElevenLabs API key.

The API key should be stored only in:

```text
.env
```

The `.env` file is included in `.gitignore` and should **never** be uploaded to GitHub.

If an API key is accidentally exposed publicly, revoke it and create a new one immediately.

---

## ⚠️ Responsible Voice Use

MyVoice AI is designed for legitimate voice creation and experimentation.

Please:

- Use your own voice.
- Use another person's voice only with their permission.
- Do not impersonate people without authorization.
- Do not use generated audio for fraud, deception, or other harmful activities.
- Follow ElevenLabs' terms and applicable laws.

---

## 📌 Current Status

**Project:** MyVoice AI  
**Type:** AI Voice Generation Web App  
**Backend:** Node.js + Express  
**AI Provider:** ElevenLabs  
**Output:** MP3 Audio

---

## 🔮 Future Improvements

Planned improvements may include:

- 🎚️ Voice settings
- 📚 Generation history
- 💾 Saved voices
- 👤 User accounts
- ☁️ Cloud storage
- 📈 Usage dashboard
- 🌍 Multi-language support
- 🚀 Production deployment
- 🔐 Improved authentication

---

## 👨‍💻 Author

**Karan More**

Computer Science Student & Developer

GitHub:  
`https://github.com/YOUR-USERNAME`

---

## 📄 License

This project is intended for educational and personal development purposes.

Before deploying or distributing the application commercially, review the licensing and terms of all third-party services and dependencies used by the project.

# AI First Aid Instructor (Offline KB) - Ready to Run

This package is a fully offline demo: **no OpenAI key, no paid API required**. It uses a local knowledge base of first-aid procedures (12+ scenarios) and a voice-enabled React frontend.

## Folder structure
```
AI-FirstAid-Instructor-offline/
  backend/
    app.py
    knowledge_base.json
    requirements.txt
  frontend/
    index.html
    package.json
    vite.config.js
    postcss.config.cjs
    tailwind.config.cjs
    src/
      main.jsx
      App.jsx
      index.css
      components/
        VoiceButton.jsx
  README.md
```

## Quick start (Linux / macOS)

1. Open terminal and go to the backend folder:
```bash
cd path/to/AI-FirstAid-Instructor-offline/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```
Backend will run on `http://0.0.0.0:5000`.

2. In a new terminal start the frontend:
```bash
cd path/to/AI-FirstAid-Instructor-offline/frontend
npm install
npm run dev
```
Open the address Vite prints (usually `http://localhost:5173`).

## Quick start (Windows PowerShell)

1. Backend:
```powershell
cd path	o\AI-FirstAid-Instructor-offlineackend
python -m venv venv
.env\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

2. Frontend:
```powershell
cd path	o\AI-FirstAid-Instructor-offlinerontend
npm install
npm run dev
```

## How to use
- Open the frontend in a browser (Chrome recommended for SpeechRecognition).
- Type or click **Speak**, say an emergency (e.g., "slipped on stairs", "fall from height", "choking"), then press **Get Help** or wait — the app will show the matched scenario and read steps aloud.
- The app uses only the local knowledge base. If you need to expand scenarios, edit `backend/knowledge_base.json`.

## Demo tips for expo
- Run the backend on your laptop and use `HOST=0.0.0.0` so phones on the same Wi-Fi can access it (ensure firewall allows port 5000).
- Use Chrome on mobile for speech input.
- Bring a simple one-page poster with example queries to demonstrate speed and safety.

## Disclaimer
This app provides simplified first-aid guidance for educational/demo purposes only. In real emergencies always call local emergency services.

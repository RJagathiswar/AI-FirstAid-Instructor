import React, {useState, useRef, useEffect} from 'react'

export default function VoiceButton({onResult}) {
  const [listening, setListening] = useState(false)
  const recRef = useRef(null)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    const rec = new SpeechRecognition()
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript
      onResult(text)
      setListening(false)
    }
    rec.onend = () => setListening(false)
    recRef.current = rec
  }, [onResult])
  if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    return (
      <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700" disabled>Voice not supported</button>
    )
  }
  function start() {
    if (recRef.current) {
      setListening(true)
      try { recRef.current.start() } catch(e) {}
    }
  }
  function stop() {
    if (recRef.current) {
      try { recRef.current.stop() } catch(e) {}
      setListening(false)
    }
  }
  return (
    <button
      onClick={() => listening ? stop() : start()}
      className={`px-4 py-2 rounded-md ${listening ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'}`}>
      {listening ? 'Listening... (click to stop)' : 'Speak'}
    </button>
  )
}
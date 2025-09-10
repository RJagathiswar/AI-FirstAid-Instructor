import React, {useState} from 'react'
import VoiceButton from './components/VoiceButton'

export default function App() {
  const [q, setQ] = useState('')
  const [steps, setSteps] = useState([])
  const [match, setMatch] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

  async function fetchSteps(query) {
    if (!query) return
    setLoading(true)
    setMessage('')
    try {
      const resp = await fetch(`${API_BASE}/api/lookup`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({q: query})
      })
      if (!resp.ok) {
        const err = await resp.json().catch(()=>({message:'No match'}))
        setMessage(err.message || 'No match found')
        setSteps([])
        setMatch('')
      } else {
        const data = await resp.json()
        setSteps(data.steps)
        setMatch(data.match)
        speakSteps(data.steps)
      }
    } catch(e) {
      setMessage('Error connecting to backend')
      setSteps([])
      setMatch('')
    }
    setLoading(false)
  }

  function onVoiceResult(text) {
    setQ(text)
    fetchSteps(text)
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetchSteps(q)
  }

  function speakSteps(steps) {
    if (!('speechSynthesis' in window)) return
    const utter = new SpeechSynthesisUtterance(steps.join('. '))
    utter.lang = 'en-US'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-2">AI First Aid Instructor (Offline KB)</h1>
        <p className="text-sm text-gray-600 mb-6">Type or speak an emergency (e.g. "choking", "fall from height") and get step-by-step first aid. Voice will speak the instructions.</p>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Describe emergency (e.g. 'heart attack')" className="flex-1 px-4 py-3 border rounded-lg outline-none" />
          <VoiceButton onResult={onVoiceResult} />
          <button type="submit" className="px-4 py-3 bg-emerald-500 text-white rounded-lg">Get Help</button>
        </form>

        {loading && <div className="text-sm text-gray-500">Searching...</div>}
        {message && <div className="text-sm text-red-500">{message}</div>}

        {match && <div className="mt-4">
          <div className="text-sm text-indigo-700 mb-2">Showing: <strong>{match}</strong></div>
          <ol className="list-decimal ml-6 space-y-2">
            {steps.map((s,i)=>(<li key={i} className="text-gray-800">{s}</li>))}
          </ol>
          <div className="mt-4 flex gap-2">
            <button className="px-3 py-2 rounded-md bg-blue-600 text-white" onClick={(e)=>{e.preventDefault(); speakSteps(steps)}}>🔊 Read aloud</button>
            <button className="px-3 py-2 rounded-md bg-gray-200" onClick={(e)=>{e.preventDefault(); navigator.clipboard.writeText(steps.join('\n'))}}>Copy steps</button>
          </div>
        </div>}

        <div className="mt-6 text-xs text-gray-500">Disclaimer: This project is done by Jagathiswar R from MVIT, Puducherry.</div>
      </div>
    </div>
  )
}
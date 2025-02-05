import { useState, useRef } from "react"

export default function AudioRecorder({ onAudioRecorded }) {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" })
      const audioUrl = URL.createObjectURL(audioBlob)

      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      recognition.lang = "en-US"
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event) => {
        const transcription = event.results[0][0].transcript
        onAudioRecorded(audioUrl, transcription)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
      }

      recognition.start()
    }

    mediaRecorderRef.current.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      chunksRef.current = []
    }
  }

  return (
    <div className="mb-4">
      {!isRecording ? (
        <button
          type="button"
          onClick={startRecording}
          className="w-full bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clipRule="evenodd"
            />
          </svg>
          Start Recording
        </button>
      ) : (
        <button
          type="button"
          onClick={stopRecording}
          className="w-full bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
              clipRule="evenodd"
            />
          </svg>
          Stop Recording
        </button>
      )}
    </div>
  )
}


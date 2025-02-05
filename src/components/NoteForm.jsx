import { useState, useEffect } from "react"
import AudioRecorder from "./AudioRecorder"

export default function NoteForm({ onSubmit, initialNote }) {
  const [note, setNote] = useState({ title: "", content: "", audioUrl: "" })

  useEffect(() => {
    if (initialNote) {
      setNote(initialNote)
    }
  }, [initialNote])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(note)
    setNote({ title: "", content: "", audioUrl: "" })
  }

  const handleAudioRecorded = (audioUrl, transcription) => {
    setNote((prevNote) => ({
      ...prevNote,
      content: prevNote.content + " " + transcription,
      audioUrl,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        required
      />
      <AudioRecorder onAudioRecorded={handleAudioRecorded} />
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white px-4 py-3 rounded-md hover:bg-indigo-600 transition-colors duration-300"
      >
        {initialNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  )
}


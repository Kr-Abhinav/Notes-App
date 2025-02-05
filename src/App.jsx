import { useState, useEffect } from "react"
import NoteList from "./components/NoteList"
import NoteForm from "./components/NoteForm"

export default function App() {
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]")
    setNotes(savedNotes)
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = (newNote) => {
    setNotes([...notes, { ...newNote, id: Date.now() }])
  }

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    setEditingNote(null)
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Note Taking App</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <NoteForm onSubmit={editingNote ? updateNote : addNote} initialNote={editingNote} />
        </div>
        <NoteList notes={filteredNotes} onEdit={setEditingNote} onDelete={deleteNote} />
      </div>
    </div>
  )
}


export default function NoteCard({ note, onEdit, onDelete }) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-800">{note.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
          {note.audioUrl && (
            <audio controls className="w-full mb-4">
              <source src={note.audioUrl} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        <div className="bg-gray-100 px-6 py-4 flex justify-end space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
  
  
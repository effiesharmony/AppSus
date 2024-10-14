import { NotePreview } from "../cmps/NotePreview.jsx"
import { notesService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        notesService.query()
            .then(setNotes)
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!notes) return <div>Loading your notes...</div>

    return (
        <div>
            {notes.map(note =>
                <section key={note.id} className="note">
                    <NotePreview note={note} />
                </section>
            )}
        </div>
    )
}
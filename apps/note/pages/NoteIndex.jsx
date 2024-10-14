import { NotePreview } from "../cmps/NotePreview.jsx"
import { notesService } from "../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [notes])

    function loadNotes() {
        notesService.query()
            .then(setNotes)
            .catch(err => {
                console.log('err:', err)
                return 'Oh nooooo! Error loading notes 🥺'
            })
    }

    if (!notes || notes.length === 0) {
        return (
            <div>
                <AddNote></AddNote>
                <h3>Try adding some notes! 🤩</h3>
            </div>
        )
    }

    return (
        <div className="note-index">
            <AddNote></AddNote>
            <section>
                <h1>Notes</h1>
            </section>
            <section className="note-preview-container">
                {notes.map(note =>
                    <section key={note.id} className="note">
                        <NotePreview note={note} />
                    </section>
                )}
            </section>
        </div>
    )
}
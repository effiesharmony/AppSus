import { NotePreview } from "../cmps/NotePreview.jsx"
import { notesService } from "../services/note.service.js"
import { emptyNote } from "../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteFilter } from "../pages/NoteFilter.jsx"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())
    const [note, setNote] = useState(emptyNote)

    useEffect(() => {
        loadNotes()
    }, [notes])

    function loadNotes() {
        notesService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('err:', err)
                return 'Oh nooooo! Error loading notes 🥺'
            })
    }

    function onRemoveNote(noteId) {
        notesService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
            })
            .catch(err => {
                console.log('Problems removing note:', err)
            })
    }

    if (!notes || notes.length === 0) {
        return (
            <div>
            <NoteFilter setFilterBy={setFilterBy} filterBy={filterBy}/>
            <AddNote note={note} setNote={setNote}/>
            <h3>Try adding some notes! 🤩</h3>
            </div>
        )
    }

    return (
        <div className="note-index">
            <NoteFilter setFilterBy={setFilterBy} filterBy={filterBy}/>
            <AddNote note={note} setNote={setNote} />
            <section>
                <h1>Notes</h1>
            </section>
            <section className="note-preview-container">
                {notes.map(note =>
                    <section key={note.id} className="note">
                        <NotePreview note={note} onRemoveNote={onRemoveNote}/>
                    </section>
                )}
            </section>
        </div>
    )
}
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
                <NoteFilter setFilterBy={setFilterBy} filterBy={filterBy} />
                <AddNote note={note} setNote={setNote} />
                <h3>Try adding some notes! 🤩</h3>
            </div>
        )
    }

    return (
        <div className="note-index">
            <NoteFilter setFilterBy={setFilterBy} filterBy={filterBy} />
            <AddNote note={note} setNote={setNote} />
            <section className="note-preview-container">
                <div className="pinned-notes">
                    {notes.some(note => note.isPinned) && <h2 className="pinned-notes-title">Pinned</h2>}
                    {notes.map(note => note.isPinned ?
                            <section key={note.id} className="pinned-notes">
                                <NotePreview note={note} onRemoveNote={onRemoveNote} />
                            </section> : null
                    )}
                </div>

                <div className="other-notes">
                    <h2 className="other-notes-title">Others</h2>
                    {notes.map(note => !note.isPinned ?
                            <section key={note.id} className="pinned-notes">
                                <NotePreview note={note} onRemoveNote={onRemoveNote} />
                            </section> : null
                    )}
                </div>

            </section>
        </div>
    )
}
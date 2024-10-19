import { NotePreview } from "../cmps/NotePreview.jsx"
import { notesService } from "../services/note.service.js"
import { emptyNote } from "../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteFilter } from "../pages/NoteFilter.jsx"
import { EditNote } from "../cmps/EditNote.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { UserMsg } from "../../mail/cmps/UserMsg.jsx"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())
    const [note, setNote] = useState(emptyNote)
    const [noteToEdit, setNoteToEdit] = useState(null)

    useEffect(() => {
        if (noteToEdit) document.querySelector('.edit-dialog').showModal()
    }, [noteToEdit])

    useEffect(() => {
        loadNotes()
    }, [notes])

    function loadNotes() {
        notesService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg("Problem loading notes")
                return 'Oh nooooo! Error loading notes 🥺'
            })
    }

    function onRemoveNote(noteId) {
        notesService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
                showSuccessMsg("Note removed successfully")
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg("Couldn't delete note. please try again")
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
            {noteToEdit &&
                <dialog className="edit-dialog">
                    <EditNote noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} />
                </dialog>
            }
            <NoteFilter setFilterBy={setFilterBy} filterBy={filterBy} />
            <AddNote note={note} setNote={setNote} setNoteToEdit={setNoteToEdit} />
            <section className="note-preview-container">
                {notes.some(note => note.isPinned) && <h2 className="pinned-notes-title">Pinned</h2>}
                <div className="pinned-notes">
                    {notes.map(note => note.isPinned ?
                        <section key={note.id} className="pinned-notes">
                            <NotePreview note={note} onRemoveNote={onRemoveNote} setNoteToEdit={setNoteToEdit} />
                        </section> : null
                    )}
                </div>

                {notes.some(note => note.isPinned) && <h2 className="other-notes-title">Others</h2>}
                <div className="other-notes">
                    {notes.map(note => !note.isPinned ?
                        <section key={note.id} className="pinned-notes">
                            <NotePreview note={note} onRemoveNote={onRemoveNote} setNoteToEdit={setNoteToEdit} />
                        </section> : null
                    )}
                </div>
            </section>
            <UserMsg />
        </div>
    )
}
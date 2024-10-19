import { AddNote } from "./AddNote.jsx"
import { notesService } from "../services/note.service.js"
const { useState, useEffect } = React
const { useParams } = ReactRouterDOM


export function EditNote({ noteToEdit, setNoteToEdit }) {

    const [note, setNote] = useState(null)

    function getNote() {
        notesService.get(noteToEdit)
            .then(setNote)
            .catch(err => {
                console.log('Problem getting Note:', err)
            })
    }

    useEffect(() => {
        getNote()
    }, [])


    if (!note) return <p>Loading...</p>
    return (
        <AddNote note={note} setNote={setNote} setNoteToEdit={setNoteToEdit} />
    )
}
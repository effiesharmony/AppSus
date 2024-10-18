import { AddNote } from "./AddNote.jsx"
import { notesService } from "../services/note.service.js"
const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM


export function EditNote() {

    const [note, setNote] = useState(null)
    const { noteId } = useParams()

    function getNote() {
        notesService.get(noteId)
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
        <AddNote note={note} setNote={setNote} />
    )
}
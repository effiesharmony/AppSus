import { notesService } from "../services/note.service.js"
import { TextNote } from "./TextNote.jsx"
const { useState } = React

export function AddNote() {

    const [backgroundColor, setBackgroundColor] = useState('#efeff1')
    const [isColorInputShown, setIsColorInputShown] = useState(false)
    const [note, setNote] = useState({
        type: null,
        createdAt: null,
        isPinned: false,
        info: {},
        style: {},
    })

    function onSaveNote(ev) {
        ev.preventDefault()
        notesService.addNote(newNote)
        title.value = ''
        noteTxt.value = ''
    }

    function onSetColor(color) {
        setBackgroundColor(color)
    }

    function onCancel() {
        title.value = ''
        noteTxt.value = ''
    }

    function onSetNoteType(type){
        let newNote = {...note}
        newNote.type = type
        setNote({...note, ...newNote})
    }

    function onSetNoteTitle(ev){
        let newNote = {...note}
        newNote.info['title'] = ev.target.value
        setNote({...note, ...newNote})
    }

    return (
        <section style={{ backgroundColor: backgroundColor }} className="add-note">
            <form onSubmit={onSaveNote} className="add-note">
                <input onChange={(ev) => onSetNoteTitle(ev)} onClick={() => onSetNoteType('NoteText')} type="text" placeholder="Title" id="title" />
                {note.type === 'NoteText' && <TextNote onCancel={onCancel} onSetColor={onSetColor} backgroundColor={backgroundColor} isColorInputShown={isColorInputShown} setIsColorInputShown={setIsColorInputShown} />}
            </form>
        </section>
    )
}
import { notesService } from "../services/note.service.js"
import { ColorInput } from "./ColorInput.jsx"
const { useState } = React

export function AddNote() {

    const [backgroundColor, setBackgroundColor] = useState('#efeff1')

    function onSaveNote(ev) {
        ev.preventDefault()
        const { title, noteTxt } = ev.target.elements
        const newNote = {
            type: 'NoteTxt',
            createdAt: Date.now(),
            isPinned: false,
            info: {
                title: title.value,
                txt: noteTxt.value
            },
            style: {
                backgroundColor: backgroundColor
            },
        }
        notesService.addNote(newNote)
        title.value = ''
        noteTxt.value = ''
    }

    function onSetColor(color) {
        setBackgroundColor(color)
    }

    return (
        <section style={{backgroundColor: backgroundColor}} className="add-note">
            <form onSubmit={onSaveNote} className="add-note">
                <input type="text" placeholder="Title" id="title" />
                <br />
                <textarea placeholder="Take a note" id="noteTxt" ></textarea>
                <br />
                <ColorInput onChangeColor={onSetColor} chosenColor={backgroundColor}/>
                <br />
                <button type="submit">Add Note</button>
            </form>
        </section>
    )
}
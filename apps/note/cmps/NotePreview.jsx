import { notesService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"
const { useState, useEffect } = React

export function NotePreview({ note, onRemoveNote }) {

    const [isColorInputShown, setIsColorInputShown] = useState(false)

    function onChangeColor(color) {
        note.style.backgroundColor = color
        notesService.save(note)
    }

    return (
        <article style={{ backgroundColor: note.style.backgroundColor }} className="note-preview">
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
            <section className="btns">
                <button className="delete-btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash"></i></button>
                <button onClick={() => setIsColorInputShown(!isColorInputShown)} className="color-btn">
                    <i className="fa-solid fa-palette"></i>
                </button>
                {isColorInputShown && <ColorPicker chosenColor={note.style.backgroundColor} onChangeColor={onChangeColor} />}
                {/* <button>Edit</button> */}
            </section>
        </article>
    )
}
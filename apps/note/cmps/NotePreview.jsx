import { notesService } from "../services/note.service.js"
import { ColorInput } from "./ColorInput.jsx"
const { useEffect } = React
export function NotePreview({ note, onRemoveNote}) {

    function onChangeColor(color) {
        note.style.backgroundColor = color
        notesService.save(note)
    }


    return (
        <article style={{ backgroundColor: note.style.backgroundColor }} className="note-preview">
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
            <section>
                <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                <button>Edit</button>
                <ColorInput chosenColor={note.style.backgroundColor} onChangeColor={onChangeColor}/>
            </section>
        </article>
    )
}
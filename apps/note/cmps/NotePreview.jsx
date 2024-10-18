import { notesService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"
const { useState, useEffect } = React

export function NotePreview({ note, onRemoveNote }) {

    const [isColorInputShown, setisColorInputShown] = useState(false)

    function onChangeColor(color) {
        note.style.backgroundColor = color
        notesService.save(note)
    }

    return (
        <article style={{ backgroundColor: note.style.backgroundColor }} className="note-preview">
            <h2>{note.info.title}</h2>
            {note.type === 'NoteTxt' && <p>{note.info.txt}</p>}
            {note.type === 'NoteImg' && <img src={note.info.url} />}
            {note.type === 'NoteVid' && <a href={note.info.url} target="_blank">{note.info.url}</a>}
            {note.type === 'NoteTodos' && note.info.todos.map((todo, index) =>
                <div key={index}>
                    <input type="checkbox" checked={todo.isChecked}/>
                    <p>{todo.text}</p>
                </div>
            )
            }
            <section className="btns">
                <button className="delete-btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash"></i></button>
                <button onClick={() => setisColorInputShown(!isColorInputShown)} className="color-btn">
                    <i className="fa-solid fa-palette"></i>
                </button>
                {isColorInputShown && <ColorPicker chosenColor={note.style.backgroundColor} onChangeColor={onChangeColor} />}
            </section>
        </article>
    )
}
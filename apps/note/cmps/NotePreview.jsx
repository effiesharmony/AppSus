import { notesService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"
const { useState } = React
const { Link } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote }) {

    const [isColorInputShown, setIsColorInputShown] = useState(false)

    function onChangeColor(color) {
        note.style.backgroundColor = color
        notesService.save(note)
    }

    function onCheck(value, index) {
        note.info.todos[index].isChecked = value
        notesService.save(note)
    }

    function onDeleteItem(index) {
        note.info.todos.splice(index, 1)
        notesService.save(note)
    }

    function onDuplicateNote(){
        notesService.get(note.id)
        .then(newNote => {
            newNote.id = null
            notesService.save(newNote)
        })
        .catch(err => {
            console.log('Problem duplicating Note:', err)
        })
    }

    return (
        <article style={{ backgroundColor: note.style.backgroundColor }} className="note-preview">
            <h2>{note.info.title}</h2>
            {note.type === 'NoteTxt' && <p>{note.info.txt}</p>}
            {note.type === 'NoteImg' && <img src={note.info.url} />}
            {note.type === 'NoteVid' && <a href={note.info.url} target="_blank">{note.info.url}</a>}
            {note.type === 'NoteTodos' &&
                <ul>
                    {note.info.todos.map((todo, index) =>
                        <li key={index}>
                            <input onChange={(ev) => onCheck(ev.target.checked, index)} type="checkbox" checked={todo.isChecked} />
                            <span className={`${todo.isChecked ? 'strike' : 'todo-txt'}`}>{todo.text}</span>
                            <button onClick={() => onDeleteItem(index)} type="button" className="list-delete-btn">X</button>
                        </li>
                    )}
                </ul>
            }
            <section className="btns">
                <button className="delete-btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash"></i></button>
                <button onClick={() => setIsColorInputShown(!isColorInputShown)} className="color-btn">
                    <i className="fa-solid fa-palette"></i>
                </button>
                {isColorInputShown && <ColorPicker chosenColor={note.style.backgroundColor} onChangeColor={onChangeColor} />}
                <button className="edit"><Link to={`/note/${note.id}`}><i className="fa-solid fa-pen"></i></Link></button>
                <button onClick={onDuplicateNote} className="duplicate"><i className="fa-solid fa-copy"></i></button>
            </section>
        </article>
    )
}
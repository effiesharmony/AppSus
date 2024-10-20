import { notesService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"
import { mailService } from "../../mail/services/mail.service.js"
const { useState } = React
const { Link } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote, setNoteToEdit }) {

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

    function onDuplicateNote() {
        notesService.get(note.id)
            .then(newNote => {
                newNote.id = null
                notesService.save(newNote)
            })
            .catch(err => {
                console.log('Problem duplicating Note:', err)
            })
    }

    function onPin() {
        note.isPinned = !note.isPinned
        notesService.save(note)
        if(note.isPinned)showSuccessMsg('Pinned note')
        if(!note.isPinned)showSuccessMsg('Unpinned note')
    }

    function onSendAsMail() {
        mailService.save(
            {
                createdAt: Date.now(),
                subject: note.info.title || '(no subject)',
                body: note.info.txt || note.info.url || note.info.todos.map(todo => todo.text) || '(no body)',
                isRead: true,
                sentAt: null,
                removedAt: null,
                from: "valery@appsus.com",
                to: '',
                status: 'draft',
                isNote: true
            }
        )
    }


    return (
        <article style={{ backgroundColor: note.style.backgroundColor }} className="note-preview">
            <h2>{note.info.title}</h2>
            <button className="pin-btn" onClick={onPin}>
                <img src="assets/img/pin.icon.svg" alt="Pin-Note" />
            </button>
            {note.type === 'NoteTxt' && <p>{note.info.txt}</p>}
            {note.type === 'NoteImg' && <img src={note.info.url} />}
            {note.type === 'NoteVid' && <a href={note.info.url} target="_blank">{note.info.url}</a>}
            {note.type === 'NoteTodos' &&
                <ul>
                    {note.info.todos.map((todo, index) => !todo.isChecked ?
                        <li key={index} className="preview-li">
                            <input onChange={(ev) => onCheck(ev.target.checked, index)} type="checkbox" checked={todo.isChecked} />
                            <span className={`${todo.isChecked ? 'todo-txt strike' : 'todo-txt'}`}>{todo.text}</span>
                            <button onClick={() => onDeleteItem(index)} type="button" className="list-delete-btn">
                                <img src="assets/img/X.icon.svg" alt="" />
                            </button>
                        </li> : null
                    )}
                    {note.info.todos.some(note => note.isChecked) && note.info.todos.some(note => !note.isChecked) && <hr />}
                    {note.info.todos.map((todo, index) => todo.isChecked ?
                        <li key={index} className="preview-li">
                            <input onChange={(ev) => onCheck(ev.target.checked, index)} type="checkbox" checked={todo.isChecked} />
                            <span className={`${todo.isChecked ? 'todo-txt strike' : 'todo-txt'}`}>{todo.text}</span>
                            <button onClick={() => onDeleteItem(index)} type="button" className="list-delete-btn">
                                <img src="assets/img/X.icon.svg" alt="" />
                            </button>
                        </li> : null
                    )}
                </ul>
            }
            <section className="btns">
                <button className="delete-btn" onClick={() => onRemoveNote(note.id)}>
                    <img src="assets/img/trash.icon.svg" alt="Delete" />
                </button>
                <button className="color-btn" onClick={() => setIsColorInputShown(!isColorInputShown)}>
                    <img src="assets/img/color.palette.icon.png" />
                </button>
                {isColorInputShown && <ColorPicker chosenColor={note.style.backgroundColor} onChangeColor={onChangeColor} />}
                <button className="edit-btn" onClick={() => setNoteToEdit(note.id)}>
                    <img src="assets/img/pen.icon.svg" alt="Edit" />
                </button>
                <button onClick={onDuplicateNote} className="duplicate">
                    <img src="assets/img/copy.icon.svg" alt="Copy" />
                </button>
                <button onClick={onSendAsMail}>
                    <Link to='/mail'>
                        <img src="assets/img/send.mail.icon.svg" alt="Send as mail" />
                    </Link>
                </button>
            </section>
        </article>
    )
}
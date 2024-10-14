import { notesService } from "../services/note.service.js"
const { useEffect } = React
export function NotePreview({ note }) {

    function onColorChange(ev) {
        console.log(ev.target.value)
        note.style.backgroundColor = ev.target.value
        notesService.save(note)
    }

    return (
        <article style={{ backgroundColor: note.style.backgroundColor }} className="note-preview">
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
            <section>
                <button>Delete</button>
                <button>Edit</button>
                <input onInput={onColorChange} type="color" id="color-picker" value={note.style.backgroundColor}/>
            </section>
        </article>
    )
}

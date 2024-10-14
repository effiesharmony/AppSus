import { notesService } from "../services/note.service.js"

export function AddNote() {

    function onSaveNote(ev) {
        ev.preventDefault()
        const { title, noteTxt, color } = ev.target.elements
        const newNote = {
            type: 'NoteTxt',
            createdAt: Date.now(),
            isPinned: false,
            info: {
                title: title.value,
                txt: noteTxt.value
            },
            style: {
                backgroundColor: color.value
            },
        }
        notesService.addNote(newNote)
        title.value = ''
        noteTxt.value = ''
    }

    return (
        <section className="add-note">
            <form onSubmit={onSaveNote} className="add-note">
                <input type="text" placeholder="Title" id="title" />
                <br />
                <textarea placeholder="Take a note" id="noteTxt" ></textarea>
                <br />
                <input type="color" id="color" />
                <br />
                <button type="submit">Add Note</button>
            </form>
        </section>
    )
}
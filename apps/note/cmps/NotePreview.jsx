export function NotePreview({note}) {
    console.log(note)

    return (
        <article className="note-preview">
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
            <button>Delete</button>
            <button>Edit</button>
            <input type="color" id="color-picker" />
        </article>
    )
}

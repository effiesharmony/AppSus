export function NoteTitle({ onSetNoteTitle, onSetNoteType, note }) {
    return (
        <div className="title-container">
            <input type="text" placeholder="Title" id="title"
                onChange={(ev) => onSetNoteTitle(ev)} onClick={() => {if(!note.type) onSetNoteType('NoteTxt')}} />
            <button type="button" onClick={() => onSetNoteType('NoteTodos')}><i className="fa-regular fa-square-check"></i></button>
            <button type="button" onClick={() => onSetNoteType('NoteImg')}><i className="fa-regular fa-image"></i></button>
            <button type="button" onClick={() => onSetNoteType('NoteVid')}><i className="fa-brands fa-youtube"></i></button>
        </div>
    )
}
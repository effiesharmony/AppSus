export function ImageNote({ onAddInfo, note }) {

    return (
        <div className="image-note">
            <input onInput={(ev) => onAddInfo(ev.target.value)} type="text" placeholder="Enter image URL..." id="noteImg" value={note.info.url ? note.info.url : ''} />
            {note.info.url && <img src={note.info.url} />}
        </div>
    )
}
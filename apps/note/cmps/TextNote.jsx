export function TextNote({ onAddInfo, note }) {

    return (
        <div className="text-note">
            <input onInput={(ev) => onAddInfo(ev.target.value)} type="text" placeholder="Take a note..." id="noteTxt" value={note.info.txt ? note.info.txt : ''} />
        </div>
    )
}
export function TextNote({ onAddInfo, note }) {

    return (
            <textarea className="text-input" onInput={(ev) => onAddInfo(ev.target.value)} type="text"
            placeholder="Take a note..." id="noteTxt" value={note.info.txt ? note.info.txt : ''} />
    )
}
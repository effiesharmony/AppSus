export function TextNote({onAddInfo}) {

    return (
        <div className="text-note">
                <input onInput={(ev) => onAddInfo(ev.target.value)} type="text" placeholder="Take a note..." id="noteTxt"/>
        </div>
    )
}
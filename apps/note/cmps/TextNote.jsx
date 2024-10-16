import { ColorPicker } from "./ColorPicker.jsx"

export function TextNote({onCancel, onSetColor, backgroundColor, isColorInputShown, setIsColorInputShown}) {

    return (
        <form className="text-note">
                 <br />
                <textarea placeholder="Take a note" id="noteTxt" ></textarea>
                <br />
                <button type="button" onClick={() => setIsColorInputShown(!isColorInputShown)} className="color-btn">
                    <i className="fa-solid fa-palette"></i>
                </button>
                {isColorInputShown && <ColorPicker onChangeColor={onSetColor} chosenColor={backgroundColor}/>}
                <br />
                <button>Add Note</button>
                <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
}
import { ColorPicker } from "./ColorPicker.jsx"

export function AddNoteBtns({ onCancel, onSetColor, backgroundColor, isColorInputShown, setisColorInputShown }) {
    return (
        <div>
            <button>Add</button>
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="button" onClick={() => setisColorInputShown(!isColorInputShown)} className="color-btn">
                <i className="fa-solid fa-palette"></i>
            </button>
            {isColorInputShown && <ColorPicker onChangeColor={onSetColor} chosenColor={backgroundColor} />}
        </div>
    )
}
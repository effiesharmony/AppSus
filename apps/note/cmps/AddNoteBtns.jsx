import { ColorPicker } from "./ColorPicker.jsx"
const { Link } = ReactRouterDOM


export function AddNoteBtns({ onCancel, onSetColor, backgroundColor, isColorInputShown, setIsColorInputShown, onSaveNote }) {
    return (
        <div>
            <button onClick={onSaveNote}><Link to={'/notes'}>Save</Link></button>
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="button" onClick={() => setIsColorInputShown(!isColorInputShown)} className="color-btn">
                <i className="fa-solid fa-palette"></i>
            </button>
            {isColorInputShown && <ColorPicker onChangeColor={onSetColor} chosenColor={backgroundColor} />}
        </div>
    )
}
import { ColorPicker } from "./ColorPicker.jsx"
const { Link } = ReactRouterDOM


export function AddNoteBtns({ onCancel, onSetColor, backgroundColor, isColorInputShown, setIsColorInputShown, onSaveNote, }) {
    return (
        <React.Fragment>
             <section>
                <button type="button" onClick={() => setIsColorInputShown(!isColorInputShown)} className="color-btn">
                    <img src="../../../assets/img/color.palette.icon.png" />
                </button>
                {isColorInputShown && <ColorPicker onChangeColor={onSetColor} chosenColor={backgroundColor} />}
            </section>
            <section>
                <button className="save-btn" onClick={onSaveNote}><Link to={'/notes'}>Save</Link></button>
                <button className="close-btn" type="button" onClick={onCancel}>Close</button>
            </section>
        </React.Fragment>
    )
}
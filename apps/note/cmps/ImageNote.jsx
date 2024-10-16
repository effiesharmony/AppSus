export function ImageNote(){

    return (
        <form className="image-note">
            <input type="text" placeholder="Title" id="title" />
            <br />
            <textarea placeholder="Enter image URL..." id="noteImg" ></textarea>
            <br />
            <ColorInput onChangeColor={onSetColor} chosenColor={backgroundColor} />
            <br />
            <button type="submit">Add Note</button>
            <button>Cancel</button>
        </form>
    )
}
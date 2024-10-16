export function TodosNote(){

    return (
        <form className="todos-note">
            <input type="text" placeholder="Title" id="title" />
            <br />
            <textarea placeholder="List item" id="noteTodos" ></textarea>
            <br />
            <ColorInput onChangeColor={onSetColor} chosenColor={backgroundColor} />
            <br />
            <button type="submit">Add Note</button>
            <button>Cancel</button>
        </form>
    )
}
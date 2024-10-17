const { useState } = React
export function TodosNote({ onAddInfo }) {

    const [todosList, setTodosList] = useState([])

    function addListValues(newInput) {
        setTodosList(newInput)
        onAddInfo(todosList)
    }

    function addEmptyListItem() {
        const newInput = [...todosList]
        newInput.push({
            isChecked: false,
            text: ''
        })
        addListValues(newInput)
    }

    function onTextInput(value, index) {
        const newInput = [...todosList]
        newInput[index].text = value
        addListValues(newInput)
    }

    function onCheck(value, index) {
        const newInput = [...todosList]
        newInput[index].isChecked = value
        addListValues(newInput)
    }

    function onRemoveItem(index) {
        const newInput = [...todosList]
        newInput.splice(index, 1)
        addListValues(newInput)
    }

    return (
        <div className="todos-note">
            <button onClick={() => addEmptyListItem()} type="button" className="list-add-btn">+</button>
            <ul className="todos-list" >
                {
                    todosList.map((todo, index) =>
                        <li key={index}>
                            <input onChange={(ev) => onCheck(ev.target.checked, index)} className="checkbox" type="checkbox" checked={todo.isChecked} />
                            <input onInput={(ev) => onTextInput(ev.target.value, index)} className="list-item-txt" type="text" placeholder="List item" value={todo.text} />
                            <button onClick={() => onRemoveItem(index)} type="button" className="list-delete-btn">X</button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
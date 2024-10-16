export function ColorPicker({ chosenColor, onChangeColor }) {

    const colors = [
        '#faafa8',
        '#f39f76',
        '#fff8b8',
        '#e2f6d3',
        '#b4ddd3',
        '#d4e4ed',
        '#aeccdc',
        '#d3bfdb',
        '#f6e2dd',
        '#e9e3d4',
        '#efeff1',
    ]


    return (
        <section className="color-input">
            <div className="colors-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`color ${color === chosenColor ? 'chosen' : ''}`}
                        style={{ backgroundColor: color}}
                        onClick={() => onChangeColor(color)}
                    ></div>
                ))}
            </div>
        </section >
    )
}
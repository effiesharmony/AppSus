const { useState, useEffect } = React
import { ColorPicker } from "../cmps/ColorPicker"

export function NoteFilter({filterBy, setFilterBy}) {

function onSetFilter(ev){
    setFilterBy(prevFilter => ({ ...prevFilter, txt: ev.target.value }))
}

function onClearFilter(){
    setFilterBy(prevFilter => ({ ...prevFilter, txt: '' }))

}

    return (
        <div className="filter">
            <input onInput={(ev) => onSetFilter(ev)} type="text" placeholder="Search" value={filterBy.txt}/>
            <button onClick={() => onClearFilter()} className="clear-filter-btn">X</button>
        </div>
        // <div className="filter-options">
        //     <div className="filter-by-type">
        //         <h2>Types</h2>
        //         <section className="type-categories">
        //             <div className="lists" onClick={()=> onSelectFilter}>Lists</div>
        //             <div className="urls">URLs</div>
        //         </section>
        //     </div>
        //     <div className="filter-by-color">
        //         <h2>Colors</h2>
        //         <section className="color-categories">
        //         <ColorPicker onChangeColor={{}}/>
        //         </section>
        //     </div>
        // </div>
    )
}
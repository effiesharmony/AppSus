export function NoteFilter({ filterBy, setFilterBy }) {

    function onSetFilter(ev) {
        setFilterBy(prevFilter => ({ ...prevFilter, txt: ev.target.value }))
    }

    function onClearFilter() {
        setFilterBy(prevFilter => ({ ...prevFilter, txt: '' }))

    }

    return (
        <div className="note-filter">
            <button>
                <img src="../../../assets/img/search-icon.svg" />
            </button>
            <input onInput={(ev) => onSetFilter(ev)} type="text" placeholder="Search" value={filterBy.txt} />
            <button onClick={() => onClearFilter()} className="clear-filter-btn">
                <img src="../../../assets/img/X.icon.svg" alt="Cancel-filter" />
            </button>
        </div>
    )
}
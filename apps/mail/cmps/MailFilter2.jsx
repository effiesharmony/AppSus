const { useState, useEffect } = React;

export function MailFilter2({ filterBy, onSetFilter }) {
  const [filter2, setFilter2] = useState(filterBy);

  // useEffect(() => {
  //   setFilter2(filterBy);
  // }, [filterBy]);

  useEffect(() => {
    onSetFilter(filter2);
  }, [filter2]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;
    }
    setFilter2((prevFilter) => { 
      const newFilter = { ...prevFilter, [field]: value };
      return newFilter; 
    });
  }

  function handleSortByDate() {
    setFilter2((prevFilter) => ({
      ...prevFilter,
      type: "sentAt",
      order: prevFilter.type === "sentAt" ? !prevFilter.order : true,
    }));
  }

  function handleSortByAlphabet() {
    setFilter2((prevFilter) => ({
      ...prevFilter,
      type: "subject",
      order: prevFilter.type === "subject" ? !prevFilter.order : false,
    }));
  }

  function onCleanFilter() {
    setFilter2({ ...filterBy, txt: "", type: "" });
    onSetFilter({ ...filterBy, txt: "", type: "" })
  }

  const { txt, type, order, status } = filter2;

  return (
    <section className="mail-filter2">
      <div className="mail-filter2-form">
        <button
          className={type === "all" ? "active" : ""}
          onClick={onCleanFilter}
        >
          All
        </button>

        <button
          className={type === "sentAt" ? "active" : ""}
          onClick={handleSortByDate}
        >
          {type === "sentAt" ? (order ? "▲" : "▼") : ""} Date
        </button>

        <button
          className={type === "subject" ? "active" : ""}
          onClick={handleSortByAlphabet}
        >
          {type === "subject" ? (order ? "▲" : "▼") : ""} Subject
        </button>
        <form>
          <input
            onChange={handleChange}
            value={txt}
            className="mail-filter2-input-txt"
            placeholder="Search mail"
            type="text"
            name="txt"
            id="txt"
          />
        </form>
        <button className="mail-filter2-refresh" onClick={onCleanFilter}>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>
    </section>
  );
}

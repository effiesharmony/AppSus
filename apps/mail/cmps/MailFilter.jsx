const { useState, useEffect } = React;

export function MailFilter({ filterBy, onSetFilter }) {
  const [filter, setFilter] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filter);
  }, [filter]);

  function handleFilterChange(selectedFilter) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      status: selectedFilter,
    }));
  }

  return (
    <section className="mail-filter">
      <button
        className={filter.status === "" ? "active" : ""}
        onClick={() => handleFilterChange("")}
      >
        Inbox
      </button>
      <button
        className={filter.status === "starred" ? "active" : ""}
        onClick={() => handleFilterChange("starred")}
      >
        Starred
      </button>
      <button
        className={filter.status === "sent" ? "active" : ""}
        onClick={() => handleFilterChange("sent")}
      >
        Sent
      </button>
      <button
        className={filter.status === "trash" ? "active" : ""}
        onClick={() => handleFilterChange("trash")}
      >
        Trash
      </button>
      <button
        className={filter.status === "draft" ? "active" : ""}
        onClick={() => handleFilterChange("draft")}
      >
        Draft
      </button>
    </section>
  );
}

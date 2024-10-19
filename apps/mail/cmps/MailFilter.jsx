import { MailAdd } from "../cmps/MailAdd.jsx";

const { useState, useEffect } = React;

export function MailFilter({
  filterBy,
  onSetFilter,
  onSentMail,
  onCancel,
}) {
  const [filter, setFilter] = useState(filterBy);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingMail, setIsAddingMail] = useState(false);

  useEffect(() => {
    onSetFilter(filter);
  }, [filter]);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleFilterChange(selectedFilter) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      status: selectedFilter,
    }));
  }

  function addMail() {
    setIsAddingMail(true);
  }

  function cancelAddMail() {
    setIsAddingMail(false);
    onCancel()
  }

  function sentMail() {
    setIsAddingMail(false);
    onSentMail();
  }

  return (
    <section onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {!isHovered && (
        <div className="mail-filter">
          <div className="mail-filter-add-mail-button">
            <button
              className="mail-filter-add-mail-button"
              onClick={addMail}
              title="Compose"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          </div>

          <button
            className={filter.status === "" ? "active" : ""}
            onClick={() => handleFilterChange("")}
            title="Inbox"
          >
            <i className="fa-solid fa-inbox"></i>
          </button>
          <button
            className={filter.status === "starred" ? "active" : ""}
            onClick={() => handleFilterChange("starred")}
            title="Starred"
          >
            <i className="fa-regular fa-star"></i>
          </button>
          <button
            className={filter.status === "sent" ? "active" : ""}
            onClick={() => handleFilterChange("sent")}
            title="Sent"
          >
            <i className="fa-regular fa-paper-plane"></i>
          </button>
          <button
            className={filter.status === "draft" ? "active" : ""}
            onClick={() => handleFilterChange("draft")}
            title="Draft"
          >
            <i className="fa-regular fa-note-sticky"></i>
          </button>
          <button
            className={filter.status === "trash" ? "active" : ""}
            onClick={() => handleFilterChange("trash")}
            title="Trash"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      )}

      {isHovered && (
        <div className="mail-filter hover">
          <div className="mail-filter-add-mail-button">
            <button
              className="mail-filter-add-mail-button button"
              onClick={addMail}
              title="Compose"
            >
              <i className="fa-solid fa-pen"></i>
              <span>Compose</span>
            </button>
          </div>
          <button
            className={filter.status === "" ? "active" : ""}
            onClick={() => handleFilterChange("")}
            title="Inbox"
          >
            <i className="fa-solid fa-inbox"></i>
            <label>Inbox</label>
          </button>
          <button
            className={filter.status === "starred" ? "active" : ""}
            onClick={() => handleFilterChange("starred")}
            title="Starred"
          >
            <i className="fa-regular fa-star"></i>
            <label>Starred</label>
          </button>
          <button
            className={filter.status === "sent" ? "active" : ""}
            onClick={() => handleFilterChange("sent")}
            title="Sent"
          >
            <i className="fa-regular fa-paper-plane"></i>
            <label>Sent</label>
          </button>
          <button
            className={filter.status === "draft" ? "active" : ""}
            onClick={() => handleFilterChange("draft")}
            title="Draft"
          >
            <i className="fa-regular fa-note-sticky"></i>
            <label>Draft</label>
          </button>
          <button
            className={filter.status === "trash" ? "active" : ""}
            onClick={() => handleFilterChange("trash")}
            title="Trash"
          >
            <i className="fa-solid fa-trash-can"></i>
            <label>Trash</label>
          </button>
        </div>
      )}
      <div>
        {isAddingMail && (
          <MailAdd sentMail={sentMail} cancelAddMail={cancelAddMail} />
        )}
      </div>
    </section>
  );
}

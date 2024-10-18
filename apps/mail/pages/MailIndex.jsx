import { mailService } from "../services/mail.service.js";
import { utilService } from "../../../services/util.service.js";
import { MailList } from "../cmps/MailList.jsx";
import { MailAdd } from "../cmps/MailAdd.jsx";
import { MailEditor } from "../cmps/MailEditor.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";

const { useState, useEffect } = React;
const { useSearchParams } = ReactRouterDOM;

export function MailIndex() {
  const [mails, setMails] = useState(null);
  const [editingDraft, setEditingDraft] = useState(null);
  const [isAddingMail, setIsAddingMail] = useState(false);
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  );

  useEffect(() => {
    setSearchParams(utilService.getTruthyValues(filterBy));
    loadMails();
  }, [filterBy]);

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => console.log("err:", err));
  }

  function onRemoveMail(mailId) {
    const updatedMails = mails.map((mail) => {
      if (mail.id === mailId) {
        if (mail.status !== "trash") {
          return { ...mail, status: "trash" };
        } else {
          mailService
            .remove(mailId)
            .then(() => {
              setMails((prevMails) => prevMails.filter((m) => m.id !== mailId));
            })
            .catch((err) => {
              console.log("Problems removing mail:", err);
            });
        }
      }
      return mail;
    });

    const updatedMail = updatedMails.find((mail) => mail.id === mailId);
    setMails(updatedMails);
    mailService.save(updatedMail);
  }

  function onMarkAsRead(mailId) {
    const updatedMail = mails.find((mail) => {
      if (mail.id === mailId) {
        mail.isRead = true;
        return mail;
      }
    });
    setMails(updatedMail);
    mailService.save(updatedMail);
  }

  function onMarkStar(mailId) {
    const updatedMails = mails.map((mail) => {
      if (mail.id === mailId) {
        if (mail.isStarred === false) {
          return { ...mail, isStarred: true, status: "starred" };
        } else {
          return { ...mail, isStarred: false, status: "" };
        }
      }
      return mail;
    });
    setMails(updatedMails);
    const updatedMail = updatedMails.find((mail) => mail.id === mailId);
    mailService.save(updatedMail);
  }

  function onAddMail() {
    setIsAddingMail(true);
  }

  function onCancel() {
    setIsAddingMail(false);
    setIsEditingDraft(false)
    loadMails()
  }

  function onSentMail() {
    loadMails();
    setIsAddingMail(false);
    setIsEditingDraft(false)
  }

  function onDraftClick(mailId){
    const draftMail = mails.find((mail) => mail.id === mailId)
      setIsEditingDraft(true);
      setEditingDraft(draftMail);
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterByToEdit }));
  }

  if (!mails) return <div>Loading...</div>;
  return (
    <main className="main-mail-index">
      <div className="main-mail-index-page">
        <div className="main-mail-index-btn">
          <button className="main-mail-index-btn-add-mail" onClick={onAddMail} title="Compose">
            <i className="fa-solid fa-pen"></i>
          </button>
          <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        </div>
        <div>
          <MailList
            mails={mails}
            filterBy={filterBy}
            onRemoveMail={onRemoveMail}
            onMarkAsRead={onMarkAsRead}
            onMarkStar={onMarkStar}
            onDraftClick={onDraftClick}
            onSetFilter={onSetFilter}
          />
        </div>
      </div>
      <div>
        {isAddingMail && (
          <MailAdd onSentMail={onSentMail} onCancel={onCancel} />
        )}
      </div>
      <div>
        {isEditingDraft && (
          <MailEditor editingDraft={editingDraft} onSentMail={onSentMail} onCancel={onCancel} />
        )}
      </div>
    </main>
  );
}

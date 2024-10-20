import { mailService } from "../services/mail.service.js";
import { utilService } from "../../../services/util.service.js";
import {showErrorMsg,showSuccessMsg} from "../../../services/event-bus.service.js";
import { MailList } from "../cmps/MailList.jsx";
import { MailEditor } from "../cmps/MailEditor.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { UserMsg } from "../cmps/UserMsg.jsx";
const { useState, useEffect } = React;
const { useSearchParams } = ReactRouterDOM;

export function MailIndex() {
  const [mails, setMails] = useState(null);
  const [editingDraft, setEditingDraft] = useState(null);
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  );

  useEffect(() => {
    setSearchParams(utilService.getTruthyValues(filterBy));
    loadMails();
  }, [filterBy]);

  useEffect(() => {
    if (mails) {
      let noteMails = mails.filter((mail) => mail.isNote);
      if (noteMails.length > 0) {
        setEditingDraft(noteMails[0]);
        setIsEditingDraft(true);
      }
    }
  }, [mails]);

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
          const updatedMail = { ...mail, status: "trash" };
          mailService.save(updatedMail);
          showSuccessMsg("Mail added to trash");
          return updatedMail;
        } else {
          mailService
            .remove(mailId)
            .then(() => {
              setMails((prevMails) => prevMails.filter((m) => m.id !== mailId));
              showSuccessMsg("Mail successfully deleted");
            })
            .catch((err) => {
              console.log("Problems removing mail:", err);
            });
          return mail;
        }
      }
      return mail;
    });
    setMails(updatedMails);
    mailService.saveAll(updatedMails.filter((mail) => mail.status !== "trash"));
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

  function onCancel() {
    setIsEditingDraft(false);
    showSuccessMsg("Mail added to drafts");
    loadMails();
  }

  function onSentMail() {
    setIsEditingDraft(false);
    showSuccessMsg("Mail has been sent");
    loadMails();
  }

  function onDraftClick(mailId) {
    const draftMail = mails.find((mail) => mail.id === mailId);
    setIsEditingDraft(true);
    setEditingDraft(draftMail);
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterByToEdit }));
  }

  function onMarkUnreadRead(mailId) {
    const updatedMails = mails.map((mail) => {
      if (mail.id === mailId) {
        mail.isRead = !mail.isRead;
      }
      return mail;
    });
    setMails(updatedMails);
    const updatedMail = updatedMails.find((mail) => mail.id === mailId);
    mailService.save(updatedMail);
  }

  if (!mails)
    return (
      <div className="loader">
        <img src="/apps/mail/svg/loader.svg" alt="" />
      </div>
    );
  return (
    <main className="main-mail-index">
      <div className="main-mail-index-page">
        <div className="main-mail-index-btn">
          <MailFilter
            filterBy={filterBy}
            onSetFilter={onSetFilter}
            onSentMail={onSentMail}
            onCancel={onCancel}
          />
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
            onMarkUnreadRead={onMarkUnreadRead}
          />
        </div>
      </div>
      <div>
        {isEditingDraft && (
          <MailEditor
            editingDraft={editingDraft}
            onSentMail={onSentMail}
            onCancel={onCancel}
          />
        )}
      </div>
      <UserMsg />
    </main>
  );
}

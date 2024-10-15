import { mailService } from "../services/mail.service.js";
import { MailList } from "../cmps/MailList.jsx";
import { MailAdd } from "../cmps/MailAdd.jsx";

const { useState, useEffect } = React;

export function MailIndex() {
  const [mails, setMails] = useState(null);
  const [isAddingMail, setIsAddingMail] = useState(false)

  useEffect(() => {
    loadMails();
  }, [mails]);

  function loadMails() {
    mailService.query()
      .then(setMails)
      .catch((err) => console.log("err:", err))
  }

  function onRemoveMail(mailId) {
    mailService.remove(mailId)
    .then(() => {
      setMails((mails) => mails.filter((mail) => mail.id !== mailId))
    })
    .catch((err) => console.log("Problems removing mail:", err))
  }

  function onAddMail() {
    setIsAddingMail(true)
  }

  function onCancel() {
    setIsAddingMail(false)
  }

  if (!mails) return <div>Loading...</div>
  return (
  <main className="main-mail-index">
    <div className="main-mail-index-btns-list">
    <div className="main-mail-index-btn">
    <button className="main-mail-index-btn-add-mail" onClick={onAddMail}><i className="fa-solid fa-pen"></i></button>
    </div>
    <MailList mails={mails} onRemoveMail={onRemoveMail}/>
    </div>
    <div>
      {isAddingMail && <MailAdd onCancel={onCancel}/>}
    </div>
  </main>
)
}

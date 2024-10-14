import { mailService } from "../services/mail.service.js";
import { MailList } from "../cmps/MailList.jsx";

const { useState, useEffect } = React;

export function MailIndex() {
  const [mails, setMails] = useState(null);

  useEffect(() => {
    loadMails();
  }, []);

  function loadMails() {
    mailService.query()
      .then(setMails)
      .catch((err) => console.log("err:", err))
  }

  if (!mails) return <div>Loading...</div>
  return (
  <main>
    <MailList mails={mails} />
  </main>
)
}

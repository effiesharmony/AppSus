import { mailService } from "../mail.service.js";
import { MailList } from "../MailList.jsx";

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

  return (
  <main>
    <MailList mails={mails} />
  </main>
)
}

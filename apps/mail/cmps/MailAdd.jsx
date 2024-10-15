import { utilService } from "../../../services/util.service.js";
import { mailService } from "../services/mail.service.js";
const { useState } = React;

export function MailAdd({onCancel}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const loggedinUser = {
    email: "emilia@appsus.com",
    fullname: "Emilia Clarke",
  };

  function onMailAdd(ev) {
    ev.preventDefault();
    const newMail = {
      id: utilService.makeId(),
      createdAt: Date.now(),
      subject: subject,
      body: body,
      isRead: false,
      sentAt: Date.now(),
      removedAt: null,
      from: loggedinUser.email,
      to: "recipient@example.com",
    };

    mailService
      .save(newMail)
      .then(() => {
        setSubject("");
        setBody("");
      })
      .catch((err) => console.log("Error with sending a mail", err));
  }

  return (
    <form onSubmit={onMailAdd}>
      <div>
        <label htmlFor="subject">From:</label>
        <input
          type="text"
          id="subject"
          value={loggedinUser.email}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit">Send Mail</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
}

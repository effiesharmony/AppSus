import { utilService } from "../../../services/util.service.js";
import { mailService } from "../services/mail.service.js";
const { useState } = React;

export function MailAdd({ onCancel }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [to, setTo] = useState("");

  const loggedInUser = {
    email: "emilia@appsus.com",
    fullname: "Emilia Clarke",
  };

  function onMailAdd(ev) {
    ev.preventDefault();
    const newMail = {
      createdAt: Date.now(),
      subject: subject,
      body: body,
      isRead: false,
      sentAt: Date.now(),
      removedAt: null,
      from: loggedInUser.email,
      to: to,
    };

    mailService
      .save(newMail)
      .then(() => {
        setSubject("")
        setBody("")
        setTo("")
        console.log(newMail);
        
      })
      .catch((err) => console.log("Error with sending a mail", err));
  }

  return (
    <form onSubmit={onMailAdd}>
      <div className="mail-add-form">

        <div className="mail-add-form-header">
          <div className="mail-add-form-header-title">New mail</div>
          <button onClick={onCancel}>X</button>
        </div>

        <div className="mail-add-form-header">
        <div>
          <label>From:</label>
          <div>{loggedInUser.email}</div>
        </div>
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="subject"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
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
      </div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
}

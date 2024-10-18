import { mailService } from "../services/mail.service.js";
const { useState } = React;

export function MailAdd({ onSentMail, onCancel }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [to, setTo] = useState("");

  const loggedInUser = {
    email: "emilia@appsus.com",
    fullName: "Emilia Clarke",
  };

  function mailAdd(ev) {
    ev.preventDefault();
    const newMail = {
      createdAt: Date.now(),
      subject: subject,
      body: body,
      isRead: true,
      sentAt: Date.now(),
      removedAt: null,
      from: loggedInUser.email,
      to: to,
      status:'sent'
    };
    mailService.save(newMail)
    .then(() => {
        setSubject("");
        setBody("");
        setTo("");
    })
    .catch((err) => console.log("Error with sending a mail", err));
    onSentMail()
  }

  function mailDraft(ev) {
    ev.preventDefault();
    const newDraft = {
      createdAt: Date.now(),
      subject: subject,
      body: body,
      isRead: true,
      sentAt: null,
      removedAt: null,
      from: loggedInUser.email,
      to: to,
      status:'draft'
    };
    mailService.save(newDraft)
    .then(() => {
        setSubject("");
        setBody("");
        setTo("");
    })
    .catch((err) => console.log("Error with sending a mail", err));
    onCancel()
  }

  return (
    <form onSubmit={mailAdd}>
      <div className="mail-add-form">

        <div className="mail-add-form-header">
          <div className="mail-add-form-header-title">New Message</div>
          <button className="mail-add-form-header-button" onClick={mailDraft}>X</button>
        </div>

        <div className="mail-add-form-inputs">
        <div className="mail-add-form-inputs-email">
          <input
            type="email"
            id="subject"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className="mail-add-form-inputs-subject">
          <input
            id="Subject:"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mail-add-form-inputs-textarea">
          <textarea
            id="body"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
      </div>
        <button className="mail-add-form-submit-button" type="submit">Send</button>
      </div>
    </form>
  );
}

import { mailService } from "../services/mail.service.js";
const { useState, useEffect } = React;

export function MailEditor({ editingDraft, onSentMail, onCancel }) {
  const [to, setTo] = useState(editingDraft ? editingDraft.to : "");
  const [subject, setSubject] = useState(editingDraft ? editingDraft.subject : "");
  const [body, setBody] = useState(editingDraft ? editingDraft.body : "");

  const loggedInUser = {
    email: "emilia@appsus.com",
    fullName: "Emilia Clarke",
  };

    useEffect(() => {
        setTo(editingDraft.to);
        setSubject(editingDraft.subject);
        setBody(editingDraft.body);
    }, [editingDraft]);

  function mailAdd(ev) {
    ev.preventDefault();
    const newMail = {
      id: editingDraft.id,
      createdAt: Date.now(),
      subject: subject || '(no subject)',
      body: body || '(no body)',
      isRead: true,
      sentAt: Date.now(),
      removedAt: null,
      from: loggedInUser.email,
      to: to,
      status: "sent",
    };
    mailService
      .save(newMail)
      .then(() => {
        setSubject("");
        setBody("");
        setTo("");
        onSentMail();
      })
      .catch((err) => console.log("Error with sending a mail", err));
  }

  function mailDraft(ev) {
    ev.preventDefault();
    const draft = {
      id: editingDraft.id,
      createdAt: Date.now(),
      subject: subject || '(no subject)',
      body: body || '(no body)',
      isRead: true,
      sentAt: null,
      removedAt: null,
      from: loggedInUser.email,
      to: to,
      status: "draft",
    };
    mailService
      .save(draft)
      .then(() => {
        setSubject("");
        setBody("");
        setTo("");
        onCancel();
      })
      .catch((err) => console.log("Error with sending a mail", err));
  }

  return (
    <form onSubmit={mailAdd}>
      <div className="mail-add-form">
        <div className="mail-add-form-header">
          <div className="mail-add-form-header-title">New Message</div>
          <button className="mail-add-form-header-button" onClick={mailDraft}>
            X
          </button>
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
        <button className="mail-add-form-submit-button" type="submit">
          Send
        </button>
      </div>
    </form>
  );
}

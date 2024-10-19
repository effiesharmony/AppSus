import { mailService } from "../services/mail.service.js";
import { notesService } from "../../note/services/note.service.js";

const { useEffect, useState } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function MailDetails() {
  const [mail, setMail] = useState(null);
  const { mailId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadMail();
  }, [mailId]);

  function loadMail() {
    mailService
      .get(mailId)
      .then(setMail)
      .catch((err) => {
        console.log("Problem getting mail:", err)
      });
  }

  function onRemoveMail() {
        mailService.remove(mailId)
          .then(() => {
            navigate("/mail");
          })
          .catch((err) => {
            console.log("Problems removing mail:", err)
          })
  }

  function onSaveAsNote(){
    notesService.save({
      type: "NoteTxt",
      createdAt: Date.now(),
      isPinned: false,
      info: {
          title: mail.subject,
          txt: mail.body
      },
      style: {
          backgroundColor: '#ffffff'
      },
  })
  }

  function handlePrint() {
    window.print();
  }

  if (!mail) return <div className="loader"><img src="/apps/mail/svg/loader.svg" alt="" /></div>
  const date = new Date(mail.sentAt).toLocaleString()
  return (
    <div className="mail-details">
      <div className="mail-details-btns">
        <button onClick={() => navigate("/mail")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button onClick={() => onRemoveMail(mail.id)}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>

      <div className="mail-details-info">
        <div className="mail-details-subject-print">
          <h1 className="mail-details-subject">{mail.subject}</h1>
          <div>
          <button onClick={onSaveAsNote} >
            <Link to='/notes'>
              <img src="assets/img/note.add.icon.svg" alt="save as note" />
          </Link>
          </button>
          <button onClick={handlePrint}>
            <i className="fa-solid fa-print"></i>
          </button>
          </div>
        </div>

        <div className="mail-details-img-from-to-date">
          <div className="mail-details-img-from-to">
            <div className="mail-details-img">
              <img src="/apps/mail/img/profile-img.png" alt="profile image" />
            </div>

            <div className="mail-details-from-to">
              <div className="mail-details-from">{mail.from}</div>
              <div className="mail-details-to">to: {mail.to}</div>
            </div>
          </div>

          <div>
            <div className="mail-details-to">{date}</div>
          </div>
        </div>

        <p className="mail-details-body">{mail.body}</p>
      </div>
    </div>
  );
}
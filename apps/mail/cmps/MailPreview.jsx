import { mailService } from "../services/mail.service.js";

const { useNavigate } = ReactRouterDOM;

export function MailPreview({ mail, onRemoveMail, onMarkAsRead, onMarkStar, onDraftClick }) {
  const { subject, body, from, sentAt, isRead, isStarred } = mail;
  const date = new Date(sentAt).toLocaleString();
  const navigate = useNavigate();

  function onMailClick() {
    if (mail.status !== 'draft') {
      onMarkAsRead(mail.id);
      navigate(`/mail/${mail.id}`);
    } else if (mail.status === 'draft'){
      onDraftClick(mail.id)
    }
  }

  function onMailStarClick(ev) {
    ev.stopPropagation();
    console.log('Star clicked for mailId:', mail.id)
    onMarkStar(mail.id)
  }

  function onRemoving(ev) {
    ev.stopPropagation();
    onRemoveMail(mail.id);
  }

  return (
    <div
      className={`mail-preview ${isRead ? "true" : "false"}`}
      onClick={onMailClick}
    >
      <div className="mail-preview-details-from">
        <div className="mail-preview-details-star"
        onClick={onMailStarClick}
        style={{ color: isStarred ? 'gold' : 'gray' }}>
          {isStarred ? "★" : "☆"}
          </div>
        <div className="mail-preview-from">{from}</div>
      </div>

      <div className="mail-preview-details-subject-body">
        <span className="mail-preview-subject">{subject}</span>
        <span className="mail-preview-body"> - {body}</span>
      </div>

      <div className="mail-preview-detail-sentAt">
        <span className="mail-preview-sentAt">{date}</span>
      </div>

      <div className="mail-preview-detail-delete-btn">
        <button className="mail-preview-delete-btn" onClick={onRemoving}>
        <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}

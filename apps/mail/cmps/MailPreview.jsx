const { useNavigate } = ReactRouterDOM
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {
  const { subject, body, from, sentAt, isRead } = mail
  const date = new Date(sentAt).toLocaleString()
  const navigate = useNavigate()

  function onMailClick() {
    navigate(`/mail/${mail.id}`)
  }

function onRemoving(ev){
  ev.stopPropagation()
  onRemoveMail(mail.id)
}

  return (
    <div
      className={`mail-preview ${isRead ? "true" : "false"}`}
      onClick={onMailClick}
    >
      <div className="mail-preview-details-from">
        <div className="mail-preview-from">{from}</div>
      </div>

      <div className="mail-preview-details-subject">
        <span className="mail-preview-subject">{subject}</span>
        <span className="mail-preview-body"> - {body}</span>
      </div>

      <div className="mail-preview-detail-sentAt">
        <span className="mail-preview-sentAt">{date}</span>
      </div>

      <div className="mail-preview-detail-delete-btn">
      <button className="mail-preview-delete-btn" onClick={onRemoving}><i className="fa-solid fa-trash"></i></button>
      </div>
      
    </div>
  );
}

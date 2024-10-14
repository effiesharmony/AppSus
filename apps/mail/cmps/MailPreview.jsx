export function MailPreview({ mail }) {
  const { subject, body, from, sentAt, isRead } = mail
  const date = new Date(sentAt).toLocaleString()

  return (
    <div className={`mail-preview ${isRead ? "true" : "false"}`}>

      <div className="mail-preview">

        <div className="mail-preview-details-from">
          <div className="mail-preview-from">{from}</div>
        </div>

        <div className="mail-preview-details-subject">
          <span className="mail-preview-subject">{subject}</span>
          <span className="mail-preview-body">{body}</span>
        </div>

        <div className="mail-preview-detail-sentAt">
          <span className="mail-preview-sentAt">{date}</span>
        </div>

      </div>

    </div>
  )
}

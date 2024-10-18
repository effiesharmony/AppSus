import { MailPreview } from "./MailPreview.jsx";
import { MailFilter2 } from "../cmps/MailFilter2.jsx";

export function MailList({ mails, onRemoveMail, onMarkAsRead, onMarkStar, filterBy, onSetFilter, onDraftClick }) {
  function getFilteredMails(mails, filterBy) {
    if (filterBy.status === 'trash') {
      return mails.filter(mail => mail.status === 'trash');
    } else if (filterBy.status === 'sent') {
      return mails.filter(mail => mail.status === 'sent');
    } else if (filterBy.status === 'draft') {
      return mails.filter(mail => mail.status === 'draft');
    } else {
      return mails.filter(mail => mail.status !== 'trash' && mail.status !== 'sent' && mail.status !== 'draft');
    }
  }
    const filteredMails = getFilteredMails(mails, filterBy)
    
  return (
    <div className="mail-list">
      <MailFilter2 filterBy={filterBy} onSetFilter={onSetFilter} />
      <ul className="mail-list">
        {filteredMails.map((mail) => (
          <li key={mail.id} className="mail-list-mails">
            <MailPreview
              mail={mail}
              onRemoveMail={onRemoveMail}
              onMarkAsRead={onMarkAsRead}
              onDraftClick={onDraftClick}
              onMarkStar={onMarkStar}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

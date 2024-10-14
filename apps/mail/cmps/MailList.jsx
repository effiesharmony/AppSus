import { MailPreview } from "./MailPreview.jsx";

export function MailList({mails}) {
    
    return (
        <ul className="book-list">
            {mails.map(mail =>
                <li key={mail.id} className="book-list-book">
                    <MailPreview mail={mail}/>
                </li>
            )}
        </ul>
    )
}

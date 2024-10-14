import { MailPreview } from "./MailPreview.jsx";

export function MailList({mails}) {
    
    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id} className="mail-list-mails">
                    <MailPreview mail={mail}/>
                </li>
            )}
        </ul>
    )
}

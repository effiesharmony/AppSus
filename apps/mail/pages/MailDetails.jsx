import { mailService } from "../services/mail.service.js";

const { useEffect, useState } = React;
const { useParams, useNavigate } = ReactRouterDOM;

export function MailDetails({onRemoveMail}) {
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

  if (!mail) return <div>Loading...</div>
  return (
    <div>
      <h1>{mail.subject}</h1>
      <p>{mail.body}</p>
      <button onClick={() => navigate("/mail")}>Go back</button>
      <button onClick={() => onRemoveMail(mail.id)}>Delete</button>
    </div>
  )
}
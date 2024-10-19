// mail service
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    get,
    remove,
    save,
    getFilterFromSearchParams,
    getFiltered,
    saveAll
}
const MAIL_KEY = 'mailDB'
_createMails()

function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.status) {
                mails = mails.filter(mail => mail.status === filterBy.status);
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i');
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body));
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead);
            }
            if (filterBy.labels && filterBy.labels.length) {
                mails = mails.filter(mail =>
                    mail.labels && mail.labels.some(label => filterBy.labels.includes(label))
                );
            }
            if (filterBy.type) {
                mails.sort((a, b) => {
                    if (filterBy.type === 'sentAt') {
                        return filterBy.order ? a.sentAt - b.sentAt : b.sentAt - a.sentAt;
                    } else if (filterBy.type === 'subject') {
                        return filterBy.order ? a.subject.localeCompare(b.subject) : b.subject.localeCompare(a.subject);
                    }
                    return 0;
                });
            }
            return mails
        })
}

function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)//.then(_setNextPrevMailId)
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function saveAll(mails) {
    return asyncStorageService.put(MAIL_KEY, mails);
}

function getFiltered() {
    return ['inbox','starred', 'sent', 'trash', 'draft']
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const isRead = searchParams.get('isRead') || ''
    const status = searchParams.get('status') || ''
    const type = searchParams.get('type') || ''
    return {
        txt,
        isRead,
        status,
        type
    }
}

// function _setNextPrevMailId(mail) {
//     return query().then((mails) => {
//         const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
//         const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
//         const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
//         mail.nextMailId = nextMail.id
//         mail.prevMailId = prevMail.id
//         return mail
//     })
// }

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            // non status/starred
            { id: 'e001', createdAt: 1735103682000, subject: 'Quick check-in', body: 'Just wanted to check in and see how you are doing. Let’s catch up soon!', isRead: false, isStarred: false, sentAt: 1735103682000, removedAt: null, from: 'colleague@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e002', createdAt: 1735003682000, subject: 'Your feedback is needed', body: 'I would appreciate your feedback on the attached document.', isRead: false, isStarred: false, sentAt: 1735003682000, removedAt: null, from: 'assistant@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e003', createdAt: 1734903682000, subject: 'Lunch plans?', body: 'Are we still on for lunch this week?', isRead: false, isStarred: false, sentAt: 1734903682000, removedAt: null, from: 'friend@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e004', createdAt: 1734803682000, subject: 'Update on the project', body: 'Here’s an update on the project status. Please review and let me know your thoughts.', isRead: false, isStarred: true, sentAt: 1734803682000, removedAt: null, from: 'projectlead@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e005', createdAt: 1734703682000, subject: 'Reminder for tomorrow', body: 'Just a quick reminder about our meeting tomorrow at 10 AM.', isRead: true, isStarred: true, sentAt: 1734703682000, removedAt: null, from: 'calendar@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e006', createdAt: 1734603682000, subject: 'Question regarding the assignment', body: 'I have a question regarding the assignment you sent over. Can we discuss it?', isRead: true, isStarred: false, sentAt: 1734603682000, removedAt: null, from: 'student@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e007', createdAt: 1734503682000, subject: 'Thanks for your help', body: 'Thank you for your assistance with the last project. It was greatly appreciated!', isRead: true, isStarred: true, sentAt: 1734503682000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e008', createdAt: 1734403682000, subject: 'Seeking advice', body: 'I’m seeking your advice on a matter that has come up. When would be a good time to chat?', isRead: false, isStarred: false, sentAt: 1734403682000, removedAt: null, from: 'mentor@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e009', createdAt: 1734303682000, subject: 'Follow-up on your application', body: 'Just following up on your application. We will get back to you shortly.', isRead: true, isStarred: false, sentAt: 1734303682000, removedAt: null, from: 'hr@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e010', createdAt: 1734203682000, subject: 'New policy update', body: 'There has been a new policy update that you should be aware of. Please find the details attached.', isRead: true, isStarred: false, sentAt: 1734203682000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e011', createdAt: 1735103681000, subject: 'Project feedback', body: 'Your feedback on the latest project changes is very important. Please reply when you can.', isRead: true, isStarred: true, sentAt: 1735103681000, removedAt: null, from: 'client@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e012', createdAt: 1735003681000, subject: 'Invitation to the conference', body: 'You are invited to the upcoming conference next month. Let me know if you can attend.', isRead: true, isStarred: false, sentAt: 1735003681000, removedAt: null, from: 'events@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e013', createdAt: 1734903681000, subject: 'Weekly team sync', body: 'Let’s schedule a weekly sync to discuss ongoing projects and any blockers.', isRead: false, isStarred: false, sentAt: 1734903681000, removedAt: null, from: 'teammate@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e014', createdAt: 1734803681000, subject: 'Interesting article', body: 'I found this article that I thought you might find interesting. Check it out!', isRead: false, isStarred: false, sentAt: 1734803681000, removedAt: null, from: 'newsletter@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e015', createdAt: 1734703681000, subject: 'Looking forward to our meeting', body: 'I am looking forward to our meeting next week to discuss the new strategy.', isRead: false, isStarred: false, sentAt: 1734703681000, removedAt: null, from: 'ceo@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e016', createdAt: 1734603681000, subject: 'Clarification needed', body: 'Could you please clarify the requirements for the upcoming project?', isRead: false, isStarred: false, sentAt: 1734603681000, removedAt: null, from: 'developer@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e017', createdAt: 1734503681000, subject: 'Thank you for your patience', body: 'Thank you for your patience while we resolved the issue.', isRead: true, isStarred: false, sentAt: 1734503681000, removedAt: null, from: 'support@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e018', createdAt: 1734403681000, subject: 'Can we reschedule?', body: 'Due to unforeseen circumstances, I need to reschedule our meeting. When are you available?', isRead: true, isStarred: false, sentAt: 1734403681000, removedAt: null, from: 'partner@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e019', createdAt: 1734303681000, subject: 'Reminder: Submit your report', body: 'This is a friendly reminder to submit your report by the end of the week.', isRead: true, isStarred: true, sentAt: 1734303681000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e020', createdAt: 1734203681000, subject: 'Year-end review', body: 'It’s time to prepare for the year-end review. Let’s gather our data and discuss.', isRead: true, isStarred: true, sentAt: 1734203681000, removedAt: null, from: 'finance@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e021', createdAt: 1735103680000, subject: 'Feedback request', body: 'Could you provide feedback on the presentation I gave last week?', isRead: true, isStarred: false, sentAt: 1735103680000, removedAt: null, from: 'mentor@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e022', createdAt: 1735003680000, subject: 'Final call for applications', body: 'This is the final call for applications for the upcoming program.', isRead: true, isStarred: false, sentAt: 1735003680000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e023', createdAt: 1734903680000, subject: 'Team outing planning', body: 'We are planning a team outing next month. Please let me know your preferences.', isRead: true, isStarred: false, sentAt: 1734903680000, removedAt: null, from: 'events@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e024', createdAt: 1734803680000, subject: 'Reminder: Project deadline', body: 'A reminder that the project deadline is approaching. Please finalize your work.', isRead: true, isStarred: true, sentAt: 1734803680000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e025', createdAt: 1734703680000, subject: 'Client feedback', body: 'We received feedback from the client. Let’s discuss the next steps.', isRead: true, isStarred: false, sentAt: 1734703680000, removedAt: null, from: 'client@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e026', createdAt: 1734603680000, subject: 'New training program', body: 'We are rolling out a new training program next month. Please register.', isRead: true, isStarred: false, sentAt: 1734603680000, removedAt: null, from: 'hr@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e027', createdAt: 1734503680000, subject: 'Project review meeting', body: 'Let’s schedule a meeting to review the project status and next steps.', isRead: true, isStarred: false, sentAt: 1734503680000, removedAt: null, from: 'projectlead@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e028', createdAt: 1734403680000, subject: 'Networking event', body: 'You are invited to a networking event next week. Let me know if you can make it.', isRead: true, isStarred: false, sentAt: 1734403680000, removedAt: null, from: 'events@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e029', createdAt: 1734303680000, subject: 'Your invoice', body: 'Attached is your invoice for the last month. Please review it.', isRead: true, isStarred: true, sentAt: 1734303680000, removedAt: null, from: 'billing@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e030', createdAt: 1734203680000, subject: 'Updates to the guidelines', body: 'We’ve made updates to the guidelines that you need to be aware of.', isRead: true, isStarred: true, sentAt: 1734203680000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e031', createdAt: 1735103678000, subject: 'Quarterly results', body: 'The quarterly results are in. Please find the report attached.', isRead: true, isStarred: false, sentAt: 1735103678000, removedAt: null, from: 'finance@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e032', createdAt: 1735003678000, subject: 'Team achievements', body: 'I wanted to share our team’s achievements over the last quarter.', isRead: false, isStarred: false, sentAt: 1735003678000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e033', createdAt: 1734903678000, subject: 'Happy New Year!', body: 'Wishing you a happy and prosperous New Year!', isRead: false, isStarred: false, sentAt: 1734903678000, removedAt: null, from: 'friend@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e034', createdAt: 1734803678000, subject: 'Invitation to celebrate', body: 'You are invited to celebrate the new year with us!', isRead: true, isStarred: false, sentAt: 1734803678000, removedAt: null, from: 'family@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e035', createdAt: 1734703678000, subject: 'Upcoming deadlines', body: 'Please be aware of the upcoming deadlines for your projects.', isRead: true, isStarred: true, sentAt: 1734703678000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e036', createdAt: 1734603678000, subject: 'Feedback on your article', body: 'I’d love to get your thoughts on the article I shared.', isRead: true, isStarred: true, sentAt: 1734603678000, removedAt: null, from: 'editor@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e037', createdAt: 1734503678000, subject: 'Project kick-off', body: 'Let’s kick off the project with a meeting next week.', isRead: true, isStarred: true, sentAt: 1734503678000, removedAt: null, from: 'projectlead@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e038', createdAt: 1734403678000, subject: 'Spring gathering', body: 'Join us for a spring gathering to discuss our plans.', isRead: true, isStarred: false, sentAt: 1734403678000, removedAt: null, from: 'events@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e039', createdAt: 1734303678000, subject: 'Final notice', body: 'This is a final notice regarding your subscription.', isRead: false, isStarred: false, sentAt: 1734303678000, removedAt: null, from: 'billing@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e040', createdAt: 1734203678000, subject: 'Holiday greetings', body: 'Wishing you warm holiday greetings from all of us!', isRead: false, isStarred: false, sentAt: 1734203678000, removedAt: null, from: 'holiday@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e041', createdAt: 1735103676000, subject: 'Thank you!', body: 'Thank you for your support and collaboration throughout the year!', isRead: false, isStarred: true, sentAt: 1735103676000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e042', createdAt: 1735003676000, subject: 'Exciting updates!', body: 'We have some exciting updates that I can’t wait to share with you.', isRead: false, isStarred: false, sentAt: 1735003676000, removedAt: null, from: 'newsletter@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e043', createdAt: 1734903676000, subject: 'Project completion', body: 'Congratulations on completing the project ahead of schedule!', isRead: true, isStarred: false, sentAt: 1734903676000, removedAt: null, from: 'client@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e044', createdAt: 1734803676000, subject: 'Invitation to connect', body: 'I would like to invite you to connect on LinkedIn.', isRead: false, isStarred: false, sentAt: 1734803676000, removedAt: null, from: 'network@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e045', createdAt: 1734703676000, subject: 'Updates on your account', body: 'There are some updates regarding your account that you need to review.', isRead: true, isStarred: false, sentAt: 1734703676000, removedAt: null, from: 'support@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e046', createdAt: 1734603676000, subject: 'Best wishes', body: 'Sending my best wishes for the new year ahead!', isRead: false, isStarred: false, sentAt: 1734603676000, removedAt: null, from: 'friend@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e047', createdAt: 1734503676000, subject: 'Let’s catch up', body: 'It’s been a while! Let’s catch up soon.', isRead: true, isStarred: false, sentAt: 1734503676000, removedAt: null, from: 'friend@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e048', createdAt: 1734403676000, subject: 'Year-end review', body: 'It’s time for the year-end review. Please prepare your report.', isRead: true, isStarred: false, sentAt: 1734403676000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e049', createdAt: 1734303676000, subject: 'Feedback request', body: 'I would appreciate your feedback on the recent changes.', isRead: true, isStarred: false, sentAt: 1734303676000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e050', createdAt: 1734203676000, subject: 'Seasonal greetings', body: 'Season’s greetings to you and your family!', isRead: true, isStarred: false, sentAt: 1734203676000, removedAt: null, from: 'holiday@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e051', createdAt: 1735103674000, subject: 'Project updates', body: 'Here are the updates on your project.', isRead: true, isStarred: false, sentAt: 1735103674000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e052', createdAt: 1735003674000, subject: 'Your feedback is valuable', body: 'We value your feedback and would love to hear from you.', isRead: true, isStarred: false, sentAt: 1735003674000, removedAt: null, from: 'support@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e053', createdAt: 1734903674000, subject: 'Year-end reflection', body: 'As the year ends, let’s reflect on our achievements.', isRead: true, isStarred: true, sentAt: 1734903674000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e054', createdAt: 1734803674000, subject: 'New beginnings', body: 'Looking forward to new beginnings in the upcoming year!', isRead: false, isStarred: false, sentAt: 1734803674000, removedAt: null, from: 'friend@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e055', createdAt: 1734703674000, subject: 'Let’s collaborate', body: 'I’d love to collaborate on a project with you.', isRead: true, isStarred: false, sentAt: 1734703674000, removedAt: null, from: 'partner@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e056', createdAt: 1734603674000, subject: 'Appreciation note', body: 'Thank you for your hard work and dedication.', isRead: false, isStarred: false, sentAt: 1734603674000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e057', createdAt: 1734503674000, subject: 'Plans for next year', body: 'Let’s discuss our plans for the next year.', isRead: false, isStarred: true, sentAt: 1734503674000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e058', createdAt: 1734403674000, subject: 'Summer plans', body: 'What are your plans for the summer? Let’s catch up!', isRead: false, isStarred: false, sentAt: 1734403674000, removedAt: null, from: 'friend@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e059', createdAt: 1734303674000, subject: 'Looking back', body: 'Looking back at the past year, we have achieved so much!', isRead: false, isStarred: false, sentAt: 1734303674000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e060', createdAt: 1734203674000, subject: 'A special message', body: 'Here’s a special message just for you!', isRead: false, isStarred: false, sentAt: 1734203674000, removedAt: null, from: 'friend@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e061', createdAt: 1735103672000, subject: 'Thank you for being part of our team', body: 'Your contributions have made a significant impact.', isRead: true, isStarred: true, sentAt: 1735103672000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e062', createdAt: 1735003672000, subject: 'We appreciate your efforts', body: 'Thank you for your hard work and commitment.', isRead: true, isStarred: true, sentAt: 1735003672000, removedAt: null, from: 'support@example.com', to: 'valery@appsus.com', status: 'starred' }, //2024
            { id: 'e063', createdAt: 1734903672000, subject: 'Feedback on your presentation', body: 'Your presentation was well-received. Great job!', isRead: true, isStarred: false, sentAt: 1734903672000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e064', createdAt: 1734803672000, subject: 'Upcoming meeting', body: 'We have an upcoming meeting scheduled for next week.', isRead: true, isStarred: false, sentAt: 1734803672000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e065', createdAt: 1734703672000, subject: 'Year-end report', body: 'Please prepare the year-end report for our review.', isRead: true, isStarred: false, sentAt: 1734703672000, removedAt: null, from: 'finance@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e066', createdAt: 1734603672000, subject: 'New training resources', body: 'We have new training resources available for you.', isRead: true, isStarred: false, sentAt: 1734603672000, removedAt: null, from: 'hr@example.com', to: 'valery@appsus.com', status: '' }, //2024
            { id: 'e067', createdAt: 1734503684000, subject: 'Newsletter issue', body: 'The latest newsletter is now available. Check out the new articles!', isRead: true, isStarred: true, sentAt: 1734503684000, removedAt: null, from: 'newsletter@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2024
            { id: 'e068', createdAt: 1715103686000, subject: 'Reminder: Project deadline', body: 'This is a reminder that the project deadline is approaching next week.', isRead: true, isStarred: true, sentAt: 1715103686000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2024
            { id: 'e069', createdAt: 1714603686000, subject: 'Follow-up on your application', body: 'We are following up on your application status. Please get back to us.', isRead: false, isStarred: false, sentAt: 1714603686000, removedAt: null, from: 'hr@example.com', to: 'valery@appsus.com', status: '' }, // 2024
            { id: 'e070', createdAt: 1714503686000, subject: 'Meeting notes review', body: 'Please review the meeting notes and provide any feedback.', isRead: true, isStarred: true, sentAt: 1714503686000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2024
            { id: 'e071', createdAt: 1674703686000, subject: 'Weekly newsletter', body: 'The latest weekly newsletter is now available. Check it out!', isRead: true, isStarred: false, sentAt: 1674703686000, removedAt: null, from: 'newsletter@example.com', to: 'valery@appsus.com', status: '' }, // 2023
            { id: 'e072', createdAt: 1674603686000, subject: 'Project update', body: 'Here is the latest update on the project status.', isRead: true, isStarred: true, sentAt: 1674603686000, removedAt: null, from: 'manager@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2023
            { id: 'e073', createdAt: 1674603686000, subject: 'Survey results', body: 'The results of the survey are now available. Please take a look.', isRead: false, isStarred: false, sentAt: 1674603686000, removedAt: null, from: 'survey@example.com', to: 'valery@appsus.com', status: '' }, // 2023
            { id: 'e074', createdAt: 1674703686000, subject: 'Reminder: Meeting tomorrow', body: 'Just a reminder that we have a meeting scheduled for tomorrow at 10 AM.', isRead: false, isStarred: false, sentAt: 1674703686000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, // 2023
            { id: 'e075', createdAt: 1675003685000, subject: 'Client feedback', body: 'We received feedback from the client regarding the last project. Please review.', isRead: false, isStarred: true, sentAt: 1675003685000, removedAt: null, from: 'client@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2023
            { id: 'e076', createdAt: 1675103685000, subject: 'Team lunch plans', body: 'Let’s discuss our lunch plans for next week. What day works for you?', isRead: true, isStarred: false, sentAt: 1675103685000, removedAt: null, from: 'team@example.com', to: 'valery@appsus.com', status: '' }, // 2023
            { id: 'e077', createdAt: 1644603686000, subject: 'Survey participation', body: 'We would love your participation in our survey. Your feedback is valuable to us.', isRead: false, isStarred: false, sentAt: 1644603686000, removedAt: null, from: 'survey@example.com', to: 'valery@appsus.com', status: '' }, // 2022
            { id: 'e078', createdAt: 1644203686000, subject: 'Budget approval needed', body: 'The budget proposal requires your approval. Please review.', isRead: false, isStarred: true, sentAt: 1644203686000, removedAt: null, from: 'finance@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2022
            { id: 'e079', createdAt: 1624803686000, subject: 'Team outing plans', body: 'We are planning a team outing next month. Please share your suggestions!', isRead: false, isStarred: true, sentAt: 1624803686000, removedAt: null, from: 'team@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2021
            { id: 'e080', createdAt: 1624903686000, subject: 'Sales report', body: 'Please review the attached sales report and provide your feedback.', isRead: true, isStarred: false, sentAt: 1624903686000, removedAt: null, from: 'sales@example.com', to: 'valery@appsus.com', status: '' }, // 2021
            { id: 'e081', createdAt: 1644603685000, subject: 'Holiday plans', body: 'What are your holiday plans? Let’s discuss over lunch.', isRead: false, isStarred: false, sentAt: 1644603685000, removedAt: null, from: 'team@example.com', to: 'valery@appsus.com', status: '' }, // 2022
            { id: 'e082', createdAt: 1674203686000, subject: 'Networking event', body: 'Join us for a networking event next week. It’s a great opportunity to connect!', isRead: true, isStarred: false, sentAt: 1674203686000, removedAt: null, from: 'events@example.com', to: 'valery@appsus.com', status: '' }, // 2023
            { id: 'e083', createdAt: 1644203686000, subject: 'New feature release', body: 'We are excited to announce the release of our new feature!', isRead: true, isStarred: true, sentAt: 1644203686000, removedAt: null, from: 'marketing@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2022
            { id: 'e084', createdAt: 1634403684000, subject: 'Social media updates', body: 'Don’t miss our latest updates on social media. Follow us for more!', isRead: false, isStarred: false, sentAt: 1634403684000, removedAt: null, from: 'marketing@example.com', to: 'valery@appsus.com', status: '' }, // 2021
            { id: 'e085', createdAt: 1734303684000, subject: 'Thank you for your support', body: 'We appreciate your support. Here is a special offer just for you!', isRead: true, isStarred: true, sentAt: 1734303684000, removedAt: null, from: 'customer.service@example.com', to: 'valery@appsus.com', status: 'starred' }, // 2024
            { id: 'e086', createdAt: 1624903685000, subject: 'Reminder: Submission deadline', body: 'A quick reminder that the submission deadline is tomorrow.', isRead: true, isStarred: false, sentAt: 1624903685000, removedAt: null, from: 'admin@example.com', to: 'valery@appsus.com', status: '' }, // 2021
            { id: 'e087', createdAt: 1634403685000, subject: 'Product launch announcement', body: 'We are excited to announce the launch of our new product next month.', isRead: false, isStarred: false, sentAt: 1634403685000, removedAt: null, from: 'marketing@example.com', to: 'valery@appsus.com', status: '' }, // 2021
            // senet
            { id: 'e088', createdAt: 1756310400000, subject: 'Meet your new coworkers', body: 'Meet your new coworkers! We’re excited to introduce them in our next team meeting.', isRead: true, isStarred: false, sentAt: 1756310400000, removedAt: null, from: 'valery@appsus.com', to: 'events@example.com', status: 'sent' }, // 2024
            { id: 'e089', createdAt: 1753728000000, subject: 'Upcoming events in your area', body: 'Upcoming events in your area that you won’t want to miss.', isRead: true, isStarred: false, sentAt: 1753728000000, removedAt: null, from: 'valery@appsus.com', to: 'finance@example.com', status: 'sent' }, // 2024
            { id: 'e090', createdAt: 1751145600000, subject: 'Weekly update from your project team', body: 'Here’s your weekly update from the project team. We’ve made significant progress and would like to share our milestones.', isRead: true, isStarred: false, sentAt: 1751145600000, removedAt: null, from: 'valery@appsus.com', to: 'events@example.com', status: 'sent' }, // 2024
            { id: 'e091', createdAt: 1748563200000, subject: 'Join us for an exciting adventure!', body: 'Join us for an exciting adventure! We are planning a trip to the mountains and would love for you to join us.', isRead: true, isStarred: false, sentAt: 1748563200000, removedAt: null, from: 'valery@appsus.com', to: 'reviewer@example.com', status: 'sent' }, // 2024
            { id: 'e092', createdAt: 1745980800000, subject: 'Don’t miss out on this limited-time offer', body: 'Don’t miss out on this limited-time offer. Act now to save!', isRead: true, isStarred: false, sentAt: 1745980800000, removedAt: null, from: 'valery@appsus.com', to: 'reviewer@example.com', status: 'sent' }, // 2024
            { id: 'e093', createdAt: 1743398400000, subject: 'Your package has been shipped', body: 'We wanted to let you know that your package has been shipped. You can track your shipment using the link provided.', isRead: true, isStarred: false, sentAt: 1743398400000, removedAt: null, from: 'valery@appsus.com', to: 'manager@example.com', status: 'sent' }, // 2024
            { id: 'e094', createdAt: 1740816000000, subject: 'Your subscription is about to expire', body: 'Your subscription is about to expire in a few days. Don’t miss out on the benefits!', isRead: true, isStarred: false, sentAt: 1740816000000, removedAt: null, from: 'valery@appsus.com', to: 'team@example.com', status: 'sent' }, // 2024
            { id: 'e095', createdAt: 1738233600000, subject: 'Check out these travel deals!', body: 'Check out these travel deals! We’ve found some amazing offers for you to explore.', isRead: true, isStarred: false, sentAt: 1738233600000, removedAt: null, from: 'valery@appsus.com', to: 'info@example.com', status: 'sent' }, // 2024
            { id: 'e096', createdAt: 1735660800000, subject: 'New features in the latest app version', body: 'New features in the latest app version are ready for you to explore.', isRead: true, isStarred: false, sentAt: 1735660800000, removedAt: null, from: 'valery@appsus.com', to: 'team@example.com', status: 'sent' }, // 2024
            { id: 'e097', createdAt: 1732982400000, subject: 'Your feedback is important to us', body: 'Your feedback is important to us! Share your thoughts about our service.', isRead: true, isStarred: false, sentAt: 1732982400000, removedAt: null, from: 'valery@appsus.com', to: 'projectlead@example.com', status: 'sent' }, // 2024
            { id: 'e098', createdAt: 1730304000000, subject: 'Meet your new coworkers', body: 'Meet your new coworkers! We’re excited to introduce them in our next team meeting.', isRead: true, isStarred: false, sentAt: 1730304000000, removedAt: null, from: 'valery@appsus.com', to: 'projectlead@example.com', status: 'sent' }, // 2024
            { id: 'e099', createdAt: 1714579200000, subject: 'Upcoming events in your area', body: 'Upcoming events in your area that you won’t want to miss.', isRead: true, isStarred: false, sentAt: 1714579200000, removedAt: null, from: 'valery@appsus.com', to: 'info@example.com', status: 'sent' }, // 2024
            { id: 'e100', createdAt: 1694006400000, subject: 'Weekly update from your project team', body: 'Here’s your weekly update from the project team. We’ve made significant progress and would like to share our milestones.', isRead: true, isStarred: false, sentAt: 1694006400000, removedAt: null, from: 'valery@appsus.com', to: 'reviewer@example.com', status: 'sent' }, // 2024
            { id: 'e101', createdAt: 1691510400000, subject: 'Join us for an exciting adventure!', body: 'Join us for an exciting adventure! We are planning a trip to the mountains and would love for you to join us.', isRead: true, isStarred: false, sentAt: 1691510400000, removedAt: null, from: 'valery@appsus.com', to: 'reviewer@example.com', status: 'sent' }, // 2023
            { id: 'e102', createdAt: 1675200000000, subject: 'Explore the new features of our service', body: 'Explore the new features of our service and how they can benefit you.', isRead: true, isStarred: false, sentAt: 1675200000000, removedAt: null, from: 'valery@appsus.com', to: 'friend@example.com', status: 'sent' }, // 2023
            { id: 'e103', createdAt: 1662537600000, subject: 'Don’t miss out on this limited-time offer', body: 'Don’t miss out on this limited-time offer. Act now to save!', isRead: true, isStarred: false, sentAt: 1662537600000, removedAt: null, from: 'valery@appsus.com', to: 'reviewer@example.com', status: 'sent' }, // 2022
            { id: 'e104', createdAt: 1630992000000, subject: 'Your package has been shipped', body: 'We wanted to let you know that your package has been shipped. You can track your shipment using the link provided.', isRead: true, isStarred: false, sentAt: 1630992000000, removedAt: null, from: 'valery@appsus.com', to: 'admin@example.com', status: 'sent' }, // 2021
            { id: 'e105', createdAt: 1609459200000, subject: 'Your monthly newsletter is here', body: 'Your monthly newsletter is here! Check out the latest updates and news from our company.', isRead: true, isStarred: false, sentAt: 1609459200000, removedAt: null, from: 'valery@appsus.com', to: 'friend@example.com', status: 'sent' }, // 2021
            { id: 'e106', createdAt: 1577836800000, subject: 'Your subscription is about to expire', body: 'Your subscription is about to expire in a few days. Don’t miss out on the benefits!', isRead: true, isStarred: false, sentAt: 1577836800000, removedAt: null, from: 'valery@appsus.com', to: 'team@example.com', status: 'sent' }, // 2020
            { id: 'e107', createdAt: 1546272000000, subject: 'Your feedback is important to us', body: 'Your feedback is important to us! Share your thoughts about our service.', isRead: true, isStarred: false, sentAt: 1546272000000, removedAt: null, from: 'valery@appsus.com', to: 'finance@example.com', status: 'sent' }, // 2019
            { id: 'e108', createdAt: 1514764800000, subject: 'Join us for an exciting adventure!', body: 'Join us for an exciting adventure! We are planning a trip to the mountains and would love for you to join us.', isRead: true, isStarred: false, sentAt: 1514764800000, removedAt: null, from: 'valery@appsus.com', to: 'manager@example.com', status: 'sent' }, // 2019
            // draft
            { id: 'e109', createdAt: 1735063680000, subject: 'Meeting agenda', body: 'Please find the agenda for our upcoming meeting attached. Let me know if you have any additions.', isRead: true, isStarred: false, sentAt: 1735063680000, removedAt: null, from: 'valery@appsus.com', to: 'finance@example.com', status: 'draft' }, // 2024
            { id: 'e110', createdAt: 1734963680000, subject: 'Newsletter draft', body: 'Here’s the draft for our next newsletter. Please provide your feedback by the end of the week.', isRead: true, isStarred: false, sentAt: 1734963680000, removedAt: null, from: 'valery@appsus.com', to: 'admin@example.com', status: 'draft' }, // 2024
            { id: 'e111', createdAt: 1734863680000, subject: 'Event invitation', body: 'You are invited to our annual event. Please see the details in the attached document.', isRead: true, isStarred: false, sentAt: 1734863680000, removedAt: null, from: 'valery@appsus.com', to: 'admin@example.com', status: 'draft' }, // 2024
            { id: 'e112', createdAt: 1734763680000, subject: 'Proposal for the new project', body: 'Attached is the proposal for the new project. Please review it and let me know if you have any questions.', isRead: true, isStarred: false, sentAt: 1734763680000, removedAt: null, from: 'valery@appsus.com', to: 'marketing@example.com', status: 'draft' }, // 2024
            { id: 'e113', createdAt: 1734663680000, subject: 'Follow-up on our conversation', body: 'I wanted to follow up on our recent conversation. Please let me know your thoughts.', isRead: true, isStarred: false, sentAt: 1734663680000, removedAt: null, from: 'valery@appsus.com', to: 'admin@example.com', status: 'draft' }, // 2024
            { id: 'e114', createdAt: 1734563680000, subject: 'Feedback on your presentation', body: 'I have some feedback on your presentation. Please find my comments attached.', isRead: true, isStarred: false, sentAt: 1734563680000, removedAt: null, from: 'valery@appsus.com', to: 'admin@example.com', status: 'draft' }, // 2024
            { id: 'e115', createdAt: 1734463680000, subject: 'Your recent order details', body: 'Here are the details for your recent order. Please review and confirm.', isRead: true, isStarred: false, sentAt: 1734463680000, removedAt: null, from: 'valery@appsus.com', to: 'marketing@example.com', status: 'draft' }, // 2024
            { id: 'e116', createdAt: 1670443680000, subject: 'Vacation plans', body: 'Let’s finalize our vacation plans. What dates work best for you?', isRead: true, isStarred: false, sentAt: 1670443680000, removedAt: null, from: 'valery@appsus.com', to: 'marketing@example.com', status: 'draft' }, // 2022
            { id: 'e117', createdAt: 1609283680000, subject: 'Upcoming deadlines', body: 'Just a reminder about the upcoming deadlines for the projects.', isRead: true, isStarred: false, sentAt: 1609283680000, removedAt: null, from: 'valery@appsus.com', to: 'marketing@example.com', status: 'draft' }, // 2020
            { id: 'e118', createdAt: 1577863680000, subject: 'Last minute changes to the project', body: 'Please note the last-minute changes to the project. Check your email for updates.', isRead: true, isStarred: false, sentAt: 1577863680000, removedAt: null, from: 'valery@appsus.com', to: 'projectlead@example.com', status: 'draft' }, // 2019
            // trash
            { id: 'e119', createdAt: 1714531200000, subject: 'Holiday Specials!', body: 'Don’t miss our holiday specials this season!', isRead: false, isStarred: false, sentAt: 1714531200000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2024
            { id: 'e120', createdAt: 1672537600000, subject: 'Welcome to 2023!', body: 'Let’s make 2023 an amazing year!', isRead: false, isStarred: false, sentAt: 1672537600000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2023
            { id: 'e121', createdAt: 1682995200000, subject: 'Enjoy the Beach!', body: 'Time to relax and enjoy the beach this summer!', isRead: false, isStarred: false, sentAt: 1682995200000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2023
            { id: 'e122', createdAt: 1640995200000, subject: 'Happy New Year 2022!', body: 'Wishing you a fantastic 2022 filled with joy!', isRead: false, isStarred: false, sentAt: 1640995200000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2022
            { id: 'e123', createdAt: 1651363200000, subject: 'Summer Adventures!', body: 'Make the most of your summer adventures!', isRead: false, isStarred: false, sentAt: 1651363200000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2022
            { id: 'e124', createdAt: 1660233600000, subject: 'Thanksgiving Wishes!', body: 'Wishing you a happy Thanksgiving filled with gratitude!', isRead: false, isStarred: false, sentAt: 1660233600000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2022
            { id: 'e125', createdAt: 1640995200000, subject: 'Happy New Year 2022!', body: 'Wishing you a fantastic 2022 filled with joy!', isRead: false, isStarred: false, sentAt: 1640995200000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2022
            { id: 'e126', createdAt: 1609459200000, subject: 'Cheers to 2021!', body: 'Here’s to new beginnings in 2021!', isRead: false, isStarred: false, sentAt: 1609459200000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2021
            { id: 'e127', createdAt: 1619827200000, subject: 'Fall into Autumn!', body: 'Experience the beauty of autumn colors!', isRead: false, isStarred: false, sentAt: 1619827200000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2021
            { id: 'e128', createdAt: 1577836800000, subject: 'Welcome to 2020!', body: 'Let’s make 2020 a year to remember!', isRead: false, isStarred: false, sentAt: 1577836800000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2020
            { id: 'e129', createdAt: 1588204800000, subject: 'Summer Vibes!', body: 'Feel the warmth of the sun this summer!', isRead: false, isStarred: false, sentAt: 1588204800000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2020
            { id: 'e130', createdAt: 1596153600000, subject: 'Fall Sale is Here!', body: 'Check out our fall sale for great deals!', isRead: false, isStarred: false, sentAt: 1596153600000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2020                    ]
            { id: 'e131', createdAt: 1546300800000, subject: 'Happy New Year 2019!', body: 'Wishing you a joyful and prosperous New Year!', isRead: false, isStarred: false, sentAt: 1546300800000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2019
            { id: 'e132', createdAt: 1564617600000, subject: 'Back to School!', body: 'Get ready for a new school year with fresh supplies!', isRead: false, isStarred: false, sentAt: 1564617600000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2019
            { id: 'e133', createdAt: 1556668800000, subject: 'Spring is here!', body: 'Enjoy the beauty of spring as nature comes alive!', isRead: false, isStarred: false, sentAt: 1556668800000, removedAt: null, from: 'info@example.com', to: 'valery@appsus.com', status: 'trash' }, // 2019
        ]
            storageService.saveToStorage(MAIL_KEY, mails)
    }
}

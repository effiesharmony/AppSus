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
        mails = [{
            id: 'e101',
            createdAt: 1733203680000,
            subject: 'Get more done with the Slack desktop app',
            body: 'Our desktop app brings your team together in one place, keeping everyone on the same page. With Slack on your computer you can easily discuss projects, share updates, or ask teammates for help. Add the Slack app to collaborate online as easily as you do in person.',
            isRead: true,
            isStarred: false,
            sentAt: 1733203680000,
            removedAt: null,
            from: 'slack@appsus.com',
            to: 'user@appsus.com',
            labels: [],
            status: 'sent',
        },
        {
            id: 'e102',
            createdAt: 1694481674323,
            subject: 'Get €15 off your first train booking on Uber',
            body: 'Let’s get you places with more savings Book your first train ticket on the Uber app and get €15 off! T&Cs apply. Book a train!',
            isRead: false,
            isStarred: true,
            sentAt: 1694481674323,
            removedAt: null,
            from: 'uber@appsus.com',
            to: 'user@appsus.com',
            labels: [],
            status: 'starred',
        },
        {
            id: 'e103',
            createdAt: 1696300954223,
            subject: 'Keep it up!',
            body: 'Another week is over, which means the results of your Leaderboard are in: you finished at position 15 out of 50. Can you beat your results in this week\'s competition? Start a lesson!',
            isRead: true,
            sentAt: 1696300954223,
            removedAt: null,
            from: 'mimo@appsus.com',
            to: 'user@appsus.com',
            labels: [],
            status: 'draft',
        },
        {
            id: 'e104',
            createdAt: 1654739889305,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt: 1654739889305,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com',
            labels: [],
            status: '',
        },
        {
            id: 'e105',
            createdAt: 1643247407812,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt: 1643247407812,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com',
            labels: [],
            status: '',
        },
        {
            id: 'e106',
            createdAt: 1604368274567,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt: 1604368274567,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com',
            labels: [],
            status: '',
        },
        {
            id: 'e107',
            createdAt: 1534900841234,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt: 1534900841234,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com',
            labels: [],
            status: 'trash',
        },]
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

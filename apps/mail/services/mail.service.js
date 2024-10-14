// mail service
import { asyncStorageService } from './services/async-storage.service.js'
import { storageService } from './services/storage.service.js'

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    // getFilterFromSearchParams,
}
const MAIL_KEY = 'bookDB'
_createMails()

function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.subject) {
                const regExp = new RegExp(filterBy.title, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.body) {
                const regExp = new RegExp(filterBy.title, 'i')
                mails = mails.filter(mail => regExp.test(mail.body))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
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

function getDefaultFilter() {
    return { subject: '', body: 0, isRead: false }
}

// function getFilterFromSearchParams(searchParams) {
//     const subject = searchParams.get('subject') || ''
//     const body = searchParams.get('body') || ''
//     const isRead = searchParams.get('isRead') || ''
//     return {
//         subject,
//         body,
//         isRead
//     }
// }

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
            createdAt: 1551133930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'lili@appsus.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e101',
            createdAt: 1551133930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e101',
            createdAt: 1551133930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e101',
            createdAt: 1551133930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e101',
            createdAt: 1551133930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e101',
            createdAt: 1551133930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e101',
            createdAt: 1551133930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'appsus@appsus.com',
            to: 'user@appsus.com'
        },]
        storageService.saveToStorage(MAIL_KEY, mail)
    }
}

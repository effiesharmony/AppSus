import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTES_KEY = 'notesDB'

export const emptyNote = {
    type: null,
    createdAt: null,
    isPinned: false,
    info: {
        title: ''
    },
    style: {
        backgroundColor: '#fffff'
    },
}

const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'Sprint 3',
            txt: 'We fucking got thisss!!!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'dads retirement party',
            txt: '20.11 in Haifa'
        }
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'new houseplant',
            txt: 'name: Calathea. dont water it too much!'
        }
    }
]

export const notesService = {
    query,
    get,
    remove,
    save,
    addNote,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTES_KEY, 0)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(notes => regExp.test(notes.info.txt) || regExp.test(notes.info.title) || regExp.test(notes.info.url) )
            }
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTES_KEY, note)
    } else {
        return asyncStorageService.post(NOTES_KEY, note)
    }
}

function addNote(note) {
    return asyncStorageService.post(NOTES_KEY, note)
}

function getDefaultFilter() {
    return { txt: '' }
}
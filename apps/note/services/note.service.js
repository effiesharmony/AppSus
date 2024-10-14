import { asyncStorageService } from "../../../services/async-storage.service.js"
import {storageService} from "../../../services/storage.service.js"

const NOTES_KEY = 'notesDB'

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

storageService.saveToStorage(NOTES_KEY, notes)

export const notesService = {
    query,
    get,
    remove,
    save,
}

function query() {
    return asyncStorageService.query(NOTES_KEY)
        .then(notes => {
            // if (filterBy.title) {
            //     const regExp = new RegExp(filterBy.title, 'i')
            //     notes = notes.filter(notes => regExp.test(notes.info.title))
            // }
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     notes = notes.filter(notes => regExp.test(notes.info.txt))
            // }
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
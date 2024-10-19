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
        backgroundColor: '#ffffff'
    },
}

const demoData = [
    {
        type: "NoteImg",
        createdAt: 1729362755162,
        isPinned: false,
        info: {
            title: "Cutest cat!",
            url: "https://media.self.com/photos/57d8c2d150778cef321a5c63/master/w_1600,c_limit/cute-kitty-rub-my-belly.jpg"
        },
        style: {
            backgroundColor: "#aeccdc"
        },
        id: "FwL7H"
    },
    {
        type: "NoteTxt",
        createdAt: 1729362774661,
        isPinned: false,
        info: {
            title: "Sprint 3",
            txt: "We fucking got thisss!!!"
        },
        style: {
            backgroundColor: "#faafa8"
        },
        id: "vJOyv"
    },
    {
        type: "NoteTodos",
        createdAt: 1729362886627,
        isPinned: false,
        info: {
            title: "Thing to finish",
            todos: [
                {
                    isChecked: true,
                    text: "fix bugs"
                },
                {
                    isChecked: true,
                    text: "create demo data"
                },
                {
                    isChecked: false,
                    text: "add homepage and info"
                },
                {
                    isChecked: false,
                    text: "catch them all"
                }
            ]
        },
        style: {
            backgroundColor: "#e2f6d3"
        },
        id: "v6TFm"
    },
    {
        type: "NoteVid",
        createdAt: 1729363033537,
        isPinned: false,
        info: {
            title: "cookie recipe",
            url: "https://www.youtube.com/watch?v=hqd8i8eXDsQ&ab_channel=PickUpLimes"
        },
        style: {
            backgroundColor: "#e9e3d4"
        },
        id: "IQ38s"
    },
    {
        type: "NoteTodos",
        createdAt: 1729365370534,
        isPinned: true,
        info: {
            title: "dad's retirement party",
            todos: [
                {
                    isChecked: false,
                    text: "write card"
                },
                {
                    isChecked: false,
                    text: "choose gift"
                },
                {
                    isChecked: false,
                    text: "buy gift"
                },
                {
                    isChecked: false,
                    text: "catch them all"
                }
            ]
        },
        style: {
            backgroundColor: "#f6e2dd"
        },
        id: "P4D17"
    },
    {
        type: "NoteTxt",
        createdAt: 1729365596850,
        isPinned: false,
        info: {
            title: "חבילות בדואר",
            txt: "לאסוף חבילה + לברר מחירים"
        },
        style: {
            backgroundColor: "#f39f76"
        },
        id: "VBXmQ"
    },
    {
        type: "NoteImg",
        createdAt: 1729365828725,
        isPinned: false,
        info: {
            title: "flowers",
            url: "https://cdn.shopify.com/s/files/1/0780/3119/2375/files/7_97877187-c6e1-4d8f-b26b-745e3a6f56e0_1024x1024.jpg?v=1712895726"
        },
        style: {
            backgroundColor: "#faafa8"
        },
        id: "wrndH"
    }
]

localStorage.setItem(NOTES_KEY, JSON.stringify(demoData))

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
                notes = notes.filter(note => regExp.test(note.info.txt) || regExp.test(note.info.title))
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
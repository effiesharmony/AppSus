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
        type: "NoteTxt",
        createdAt: 1729362774661,
        isPinned: false,
        info: {
            title: "Sprint 3",
            txt: "We fucking got thisss!!!"
        },
        style: {
            backgroundColor: "#b4ddd3"
        },
        id: "vJOyv"
    },
    {
        type: "NoteTodos",
        createdAt: 1729381593459,
        isPinned: false,
        info: {
            title: "Things to finish",
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
                    isChecked: true,
                    text: "add homepage and info"
                }
            ]
        },
        style: {
            backgroundColor: "#e2f6d3"
        },
        id: "v6TFm"
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
        isPinned: true,
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
        createdAt: 1729381574157,
        isPinned: false,
        info: {
            title: "",
            url: "https://i.pinimg.com/736x/c5/f8/17/c5f8177f3f415098be91ae45f01040c0.jpg"
        },
        style: {
            backgroundColor: "#fff8b8"
        },
        id: "GPmZp"
    },
    {
        type: "NoteImg",
        createdAt: 1729381646086,
        isPinned: true,
        info: {
            title: "pink lillies",
            url: "https://i.pinimg.com/enabled/564x/51/e5/98/51e59816ed7c526b8bf3693ff3c5e2a1.jpg"
        },
        style: {
            backgroundColor: "#faafa8"
        },
        id: "ZrGIF"
    },
    {
        type: "NoteVid",
        createdAt: 1729381696531,
        isPinned: false,
        info: {
            title: "cocolate-chip cookies",
            url: "https://www.youtube.com/watch?v=hqd8i8eXDsQ&ab_channel=PickUpLimes"
        },
        style: {
            backgroundColor: "#efeff1"
        },
        id: "Xqb54"
    },
    {
        type: "NoteImg",
        createdAt: 1729381793182,
        isPinned: true,
        info: {
            title: "Hydrangea",
            url: "https://i.pinimg.com/enabled/564x/e6/86/d1/e686d1e3ee96eb4635dfb6560a354f9c.jpg"
        },
        style: {
            backgroundColor: "#d3bfdb"
        },
        id: "kd5SJ"
    },
    {
        type: "NoteImg",
        createdAt: 1729382187396,
        isPinned: true,
        info:
        {
            title: "✨sparkle kitty✨",
            url: "https://i.pinimg.com/736x/bb/b7/62/bbb7623b5a5a3de5b004bec14b02c5d6.jpg"
        },
        style: {
            backgroundColor: "#aeccdc"
        },
        id: "beBbV"
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
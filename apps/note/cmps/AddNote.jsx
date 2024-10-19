// parent form for all cmps (title, content, btns).
const { useState, useEffect } = React
import { notesService } from "../services/note.service.js"
import { NoteTitle } from "./NoteTitle.jsx"
import { AddNoteBtns } from "./AddNoteBtns.jsx"
import { emptyNote } from "../services/note.service.js"

import { TextNote } from "./TextNote.jsx"
import { TodosNote } from "./TodosNote.jsx"
import { ImageNote } from "./ImageNote.jsx"
import { VideoNote } from "./VideoNote.jsx"

export function AddNote({ note, setNote }) {

    const [isColorInputShown, setIsColorInputShown] = useState(false)

    function onSetColor(color) {
        let newNote = { ...note }
        newNote.style.backgroundColor = color
        setNote(newNote)
    }

    function onCancel() {
        setNote(emptyNote)
    }

    function onSetNoteType(type) {
        let newNote = { ...note }
        newNote.type = type
        setNote(newNote)
    }

    function onSetNoteTitle(ev) {
        let newNote = { ...note }
        newNote.info['title'] = ev.target.value
        setNote(newNote)
    }

    // function onSetNoteTitle(ev) {
    //     const { value } = ev.target
    //     setNote(prevNote => ({ ...prevNote, info: { title: value }}))
    // }

    function onSaveNote(ev) {
        // ev.preventDefault()
        let newNote = { ...note }
        newNote.createdAt = Date.now()
        setNote(newNote)
        notesService.save(newNote)
        setNote(emptyNote)
    }

    function onAddInfo(value) {
        let newNote = { ...note }
        switch (note.type) {
            case 'NoteTxt':
                newNote.info['txt'] = value
                break
            case 'NoteTodos':
                newNote.info['todos'] = value
                break
            case 'NoteImg':
                newNote.info['url'] = value
                break
            case 'NoteVid':
                newNote.info['url'] = value
                break
        }
        setNote(newNote)
    }

    return (
        <section className="add-note-container">
            <form style={{ backgroundColor: note.style.backgroundColor }} className="add-note">
                <NoteTitle onSetNoteTitle={onSetNoteTitle} onSetNoteType={onSetNoteType} note={note}/>
                {note.type === 'NoteTxt' && <TextNote onAddInfo={onAddInfo} note={note}/>}
                {note.type === 'NoteTodos' && <TodosNote onAddInfo={onAddInfo} note={note}/>}
                {note.type === 'NoteImg' && <ImageNote onAddInfo={onAddInfo} note={note} />}
                {note.type === 'NoteVid' && <VideoNote onAddInfo={onAddInfo} note={note} />}
                {note.type &&
                    <div className="add-note-btns-container">
                        <AddNoteBtns onCancel={onCancel} onSetColor={onSetColor}
                            backgroundColor={note.style.backgroundColor} isColorInputShown={isColorInputShown}
                            setIsColorInputShown={setIsColorInputShown} onSaveNote={onSaveNote}/>
                    </div>}
            </form>
        </section>
    )
}
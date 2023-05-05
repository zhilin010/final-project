// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import AddNoteDialog, { completion, prevCompletion } from '../components/AddNoteDialog';
import { Note as NoteModel } from '../models/note';
import * as NotesApi from '../network/notes_api';
import styles from '../styles/Notespage.module.css';
import styleUtils from '../styles/utils.module.css';
import CreateNoteDialog from "./CreateNoteDialog";
import ExpandedNote from "./ExpandedNote";
import Note from "./Note";

const NotesPageLoggedInView = () => {

    // This will be a reusable component for the logged in view of the notes page.

    useEffect(() => {
        async function loadNotes() {
            try {
                const notes = await NotesApi.fetchNotes()
                setNotes(notes); // update state 
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        loadNotes();
    }, []); // adding empty arrary to make sure that useEffect() only executes on load. 


    const [notes, setNotes] = useState<NoteModel[]>([]); // set initial state to empty array
    const [showAddNoteDialog, setShowAddNoteDialog] = useState<Boolean>(false); // set initial state to false
    const [showCreateNoteDialog, setShowCreateNoteDialog] = useState<Boolean>(false); // set initial state to false
    const [expandNoteBool, setExpandNoteBool] = useState<Boolean>(false); // set initial state to false
    const [expandedNote, setExpandedNotes] = useState<NoteModel>(); // set initial state to empty array

    function handleModals() {
        setShowAddNoteDialog(false);
        if (completion !== prevCompletion) {
            setShowCreateNoteDialog(true);
        }
    }

    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id)) // if same id as note, remove it from the list
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function expandNote(note: NoteModel) {
        try {
            await NotesApi.expandNote(note._id); // get note id 
            setExpandNoteBool(true);
            setExpandedNotes(note);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        // Return the notes page.
        <>
            <h1 className={styles.title}>
                Welcome back.
            </h1>
            <Button variant='primary' className={`${styleUtils.blockCenter} mb-4`}
                onClick={() => setShowAddNoteDialog(true)}>
                New Daily Reflection
            </Button>
            <Row xs={1} md={2} lg={3} className='g-4'>
                {notes.map(note => (
                    <Col key={note._id}>
                        <Note
                            note={note}
                            className={styles.note}
                            onDeleteNoteClick={deleteNote}
                            onExpandNoteClick={expandNote}
                        />
                    </Col>
                ))}
            </Row>
            {/* Show modal to create daily reflection */}
            {showAddNoteDialog &&
                <AddNoteDialog
                    onDismiss={handleModals}
                />
            }
            {/* Show modal to create daily reflection */}
            {showCreateNoteDialog &&
                <CreateNoteDialog
                    onDismiss={() => setShowCreateNoteDialog(false)}
                />
            }
            {/* Show modal when user clicks to expand note */}
            {expandNoteBool &&
                <ExpandedNote
                    note={expandedNote!}
                    onDismiss={() => setExpandNoteBool(false)}
                />
            }
        </>
    );
}

export default NotesPageLoggedInView;
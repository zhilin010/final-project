// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";
import {MdDelete} from "react-icons/md";
import React from "react";

interface NoteProps {
    note: NoteModel,
    className?: string,
    onDeleteNoteClick: (note: NoteModel) => void, 
    onExpandNoteClick: (note: NoteModel) => void,
}

const Note = ({ note, className, onDeleteNoteClick, onExpandNoteClick }: NoteProps) => {
    // This will be a reusable component for all notes in the app.
    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note; // destructuring 

    // If the note was updated, show the updated date, otherwise show the created date.
    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated " + formatDate(updatedAt);
    } else {
        createdUpdatedText = formatDate(createdAt);
    };

    return (
        // Return a note.
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody} onClick={(e: React.MouseEvent) => {
                onExpandNoteClick(note);
                e.stopPropagation(); // stop event from bubbling up to parent elements
            }}>
                <Card.Title className={`${styles.cardTitle} ${styleUtils.flexCenter}`}>
                    {title}
                    <MdDelete className={`text-muted ms-auto`} onClick={(e) => {
                        onDeleteNoteClick(note);
                        e.stopPropagation(); // stop event from bubbling up to parent elements
                    }}/>
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
};

export default Note; 
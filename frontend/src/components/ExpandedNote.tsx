// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import {Note as NoteModel} from '../models/note';
import { Button, Modal } from "react-bootstrap";


interface ExpandedNoteProps { 
    className?: string,
    onDismiss: () => void,
    note: NoteModel
}

const ExpandedNote = ({note, className, onDismiss }: ExpandedNoteProps) => {
    // This will be a reusable component for all expanded notes in the app. 

    const {
        title,
        text,
    } = note;

    let formatedText = text!.split("\n").map((line, index) => {
        return <p key={index}>{line}</p>
    });

    return (
        <Modal show onHide={onDismiss} className={`${className}`}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formatedText}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onDismiss}> Dismiss </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ExpandedNote;
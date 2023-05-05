// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Modal, Form, Button } from "react-bootstrap";
import { completion, currDate } from "./AddNoteDialog";
import React, { useEffect, useState } from "react";
import * as NotesApi from '../network/notes_api';

interface CreateNoteDialogProps {
    onDismiss: () => void
}

const CreateNoteDialog = ({onDismiss}: CreateNoteDialogProps) => {

    const [questionFields, setQuestionFields] = useState<string[]>([]); // array of questions
    const [userResponses, setUserResponses] = useState<{[question: string]: string}>({}); // map of question to user response

    function formatCompletion(completion: string) {
        // split the string by new line and remove the number and period, if any.
        const lines = completion.split("\n");  // split by new line
        const listItems = lines.map(line => line.replace(/^\d+\.\s*/, "")); // remove number and period
        return listItems; 
    }

    function formatUserResponse(userResponses: {[question: string]: string} = {}) {
        // format the user responses into a string
        let formattedResponse = ""; 
        for (const question in userResponses) {
            // add question and response to formattedResponse
            formattedResponse += `${question}\n\n${userResponses[question]}\n\n`;
        }
        return formattedResponse;
    }

    const handleResponseChange = (question: string, response: string) => {
        // update the userResponses map from the user's input
        setUserResponses((prevResponses) => ({
            // copy the previous responses
            ...prevResponses,
            // update the response for the question
            [question]: response,
        }));
    }

    const handleSubmit = async (e: React.MouseEvent) => {
        if (Object.keys(userResponses).length < questionFields.length) {
            // if the user has not answered all the questions, alert the user
            alert("Please answer all the questions.");
            return;
        }
        e.preventDefault(); // prevent default behavior
        await NotesApi.createNote({
            title: currDate,
            text: formatUserResponse(userResponses),
        }) // create a note with the user's responses
        onDismiss(); // dismiss the modal
        window.location.reload(); // reload the page
    }
    
    useEffect(() => {
    setQuestionFields(formatCompletion(completion)); // prevent page reloading to set the question fields
    }, []);

    return (
        // Return a modal with a form for the user to answer the questions.
        <Modal show onHide={onDismiss} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Your Daily Reflection
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* for each question in questionFields, generate an input field for the question. */}
                    {questionFields.map((question, index) => (
                        <Form.Group key={`question + ${index}`}>
                            <Form.Label>{question}</Form.Label>
                            <Form.Control type="text" placeholder="Your answer here"
                            // when the user types in the input field, update the userResponses map
                            onChange={(e) => handleResponseChange(question, e.target.value)} 
                            // set the value of the input field to the user's response
                            value={userResponses[question] || ""}
                            />
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
            
        </Modal>
    );    
};

export default CreateNoteDialog;

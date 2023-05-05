// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import * as GPTAPI from "../network/gptRequest_api";

interface AddNoteDialogProps {
    onDismiss: () => void, 
}

let completion = "";
let prevCompletion = "";
let currDate = "";

const AddNoteDialog = ({onDismiss}: AddNoteDialogProps) => {

    currDate = new Date().toUTCString().slice(5, 16); // get current date in format "Mon DD YYYY"
    const [userEmotion, setUserEmotion] = useState<String>(""); // emotion user selects
    const [formAdditionalInfo, setFormAdditionalInfo] = useState<String>(""); // additional info user wants to add
    const [nQuestions, setNQuestions] = useState<String>(""); // number of questions to ask user
    const [disabled, setDisabled] = useState<Boolean>(true); // disable submit button until user selects an emotion
    const [submitButtonStatus, setsubmitButtonStatus] = useState<String>("Submit"); // text on submit button

    const handleEmotionChange = (newEmotion: String) => {
        // set userEmotion to the emotion the user selects
        setUserEmotion(newEmotion);
    }

    const handleAddtionalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set formAdditionalInfo to the additional info the user enters
        setFormAdditionalInfo(e.target.value);
    }

    const handleNQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set nQuestions to the number of questions the user wants to answer
        setNQuestions(e.target.value);        
    }

    const handleSubmit = async (e: any) => {

        const gptConfig = "You are a helpful mindfulness coach that will ask insightful questions to help me reflect on my day. Please only answer in the form of a bullet point list like 1. 2. 3.";

        if (formAdditionalInfo !== "None") {
            var userMessage = userEmotion + " " + formAdditionalInfo + " Please ask me " + nQuestions + " questions to help me reflect on my day.";
        } 
        else { 
            userMessage = userEmotion + " Please ask me " + nQuestions + " questions to help me reflect on my day.";
        }

        // handle userEmotion errors
        if (!userEmotion) {
            alert(`Please select an emotion.`);
        }
        // handle formAdditionalInfo errors
        else if (!formAdditionalInfo) {
            alert(`Please enter additional information.`);
        }
        // handle nQuestions errors 
        else if (Number(nQuestions) > 10 || Number(nQuestions) < 1) {
            alert(`Please enter a number between 1 and 10.`);
        } 
        // everything is OK 
        else {
            const input: GPTAPI.GPTRequest = {
                messages: [gptConfig, userMessage]
            } // create GPTRequest object

            e.preventDefault(); // prevent page from reloading
            setDisabled(false); // disable submit button
            setsubmitButtonStatus("Loading..."); // change submit button text to "Loading..."
            prevCompletion = completion; // save previous completion
            completion = await GPTAPI.createGPTRequest(input); // get GPT3 response
            onDismiss(); // close modal
        }

    }
    

    return ( 
        // Return a modal that asks the user to select an emotion, enter additional info, and enter the number of questions they want to answer
        <Modal show onHide={onDismiss} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>New Daily Reflection</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formNoteTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control disabled type="text" placeholder={currDate}/>
                    </Form.Group>

                    <Form.Label>How are you feeling today?</Form.Label>

                    <Form.Group className="mb-3">
                        <ButtonGroup aria-label="User Emotion">
                            <Button variant="primary" 
                                onClick={() => handleEmotionChange("I am feeling great and happy today.")}>
                                Great
                            </Button>
                            <Button variant="primary" 
                                onClick={() => handleEmotionChange("I am feeling just okay today, not bad but not great.")}>
                                Just Okay
                            </Button>
                            <Button variant="primary" 
                                onClick={() => handleEmotionChange("I am feeling very bad today.")}>
                                Bad
                            </Button>
                        </ButtonGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAdditionalInfo">
                        <Form.Label>Is there anything specific you'd like to reflect on?</Form.Label>
                        <Form.Control type="text" placeholder="I want to reflect on happiness" onChange={handleAddtionalInfoChange} />
                        <Form.Text className="text-muted">
                            If you don't have anything specific to reflect on, please write "None"
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNQuestions">
                        <Form.Label>How many questions would you wish to answer?</Form.Label>
                        <Form.Control type="text" placeholder="5" onChange={handleNQuestionsChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onDismiss} disabled={!disabled}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit} disabled={!disabled}>{submitButtonStatus}</Button>
            </Modal.Footer>
        </Modal>
        
     );
}

export { completion, currDate, prevCompletion};
export default AddNoteDialog;

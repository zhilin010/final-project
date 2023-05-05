// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LogInCredentials, SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Modal, Form, Button } from "react-bootstrap";
import TextInputField from "./form/textInputField";
import styleUtils from '../styles/utils.module.css';

interface LogInModalProps {
    onDismiss: () => void;
    onLogInSuccessful: (user: User) => void,
}

const LogInModal = ({onDismiss, onLogInSuccessful}: LogInModalProps) => {
    // This will be a reusable component for all log in modals in the app.
    
    // This is a custom hook from react-hook-form that handles form state and validation.
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>(); 
    

    async function onSubmit(credentials: LogInCredentials) {
        // This function is called when the user submits the form.
        try {
            const user = await NotesApi.logIn(credentials);
            onLogInSuccessful(user);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return ( 
        // Return the modal.
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                Log In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button 
                    variant="primary" 
                    type="submit"
                    className={styleUtils.width100}
                    disabled={isSubmitting}>
                    Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>


     );
}
 
export default LogInModal;
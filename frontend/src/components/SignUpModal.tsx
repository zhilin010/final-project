// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Modal, Form, Button} from "react-bootstrap";
import TextInputField from "./form/textInputField";
import styleUtils from '../styles/utils.module.css';

interface SignUpModalProps {
    onDismiss: () => void;
    onSignUpSuccessful: (user: User) => void, 
}

const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {
    // This will be a reusable component for all sign up modals in the app.
    
    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NotesApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };
        
    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                Sign Up
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
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
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
                    type="submit" 
                    variant="primary"
                    disabled={isSubmitting}
                    className={`${styleUtils.width100}`}>
                    Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default SignUpModal;
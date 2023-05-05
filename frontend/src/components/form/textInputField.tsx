// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps { 
    name: string, 
    label?: string,
    register: UseFormRegister<any> 
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any // pass any other props even if not defined in interface.
}

const TextInputField = ({name, label, register, registerOptions, error, ...props}: TextInputFieldProps) => {
    // This will be a reusable component for all text input fields in the app.
    return ( 
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
            {...props}
            {...register(name, registerOptions)}
            isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
     );
}
 
export default TextInputField;
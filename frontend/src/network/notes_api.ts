// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Note } from "../models/note";
import { User } from "../models/user"; 

export async function fetchData(input: RequestInfo, init?: RequestInit) {
    // fetch data from the backend
    const response = await fetch(input, init);
    if (response.ok) { 
        // if the response is ok, return the response
        return response;
    } else {
        const errorBody = await response.json(); // parse the response body as JSON
        const errorMessage = errorBody.error; // extract the error message
        throw Error(errorMessage);
    }
}

const backendURL = process.env.REACT_APP_BACKEND_URL;

export async function getLoggedInUser(): Promise<User> {
    // This function returns the logged in user.
    const response = await fetch(backendURL + "/api/users/", { 
        credentials: "include",
        method: "GET" });
    return response.json();
}

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    // This function signs up a new user.
    const response = await fetch(backendURL + "/api/users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
    return response.json(); 
}

export interface LogInCredentials { 
    username: string;
    password: string;
}

export async function logIn(credentials: LogInCredentials): Promise<User> {
    // This function logs in a user.
    const response = await fetch(backendURL + "/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logOut() {
    // This function logs out a user.
    await fetch("/api/users/logout", { method: "POST" });
}

export async function fetchNotes(): Promise<Note[]> {
    // This function fetches the notes from the backend.
    const response = await fetch(backendURL + "/api/dailynotes", { method: "GET" });  
    return response.json();
}

export interface NoteInput { 
    title: string,
    text?: string, 
}

export async function createNote(note: NoteInput): Promise<Note> { 
    // This function creates a new note.
    const response = await fetch(backendURL + "/api/dailynotes", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
};

export async function deleteNote(noteId: string) { 
    // This function deletes a note.
    await fetch(backendURL + "/api/dailynotes/" + noteId, { method: "DELETE" });
}

export async function expandNote(noteId: string) {
    // This function expands a note.
    const response = await fetch(backendURL + "/api/dailynotes/" + noteId, {method: "GET"})
    return response.json();
}
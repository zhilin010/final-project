// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { RequestHandler } from "express";
import dailyNoteModel from "../models/dailynote";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
    // This function gets all notes from the database
    
    const authenticatedUserId = req.session.userId; // get the userId from the session
    try {
        assertIsDefined(authenticatedUserId); // check if the userId is defined

        const dailyNotes = await dailyNoteModel.find({userId: authenticatedUserId}).exec(); // find all notes with the userId
        res.status(200).json(dailyNotes); // return the notes
    } catch (error) {
        next(error); // call the middleware function passing in the error
    }     
};


export const getNote: RequestHandler = async (req, res, next) => {
    // This function gets a note by ID from the database

    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId; // get the userId from the session

    try {
        assertIsDefined(authenticatedUserId); // check if the userId is defined

        if (!mongoose.isValidObjectId(noteId)) {
            // if the noteId is not a valid mongoose ID
            throw createHttpError(400, "Invalid Note ID");
        }

        const note = await dailyNoteModel.findById(noteId).exec(); // find the note by ID

        if(!note) {
            // if the note is null or undefined
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(authenticatedUserId)) {
            // check if the note's userId matches the authenticated user's userId
            throw createHttpError(401, "You cannot access this note");
        }

        res.status(201).json(note); // return the note
    } catch (error) {
        // forward error to the error handler middleware
        next(error);
    }
};

interface CreateNoteBody {
    userId?: string, // userId is not required for a note
    title?: string, // title might be missing from the request
    text?: string // text is not required for a note
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    // This function creates a note in the database

    const title = req.body.title; 
    const text = req.body.text;
    const authenticatedUserId = req.session.userId; // get the userId from the session

    try {

        assertIsDefined(authenticatedUserId);

        if (!title) {
            // if the title is missing from the request
            throw createHttpError(400, "Note must have a title")
        }

        const newNote = await dailyNoteModel.create({ 
            userId: authenticatedUserId, // get the userId from the session
            title: title, 
            text: text,
         });

         res.status(201).json(newNote); // send back 201 CREATED response if success
    } catch (error) {
        next(error);
    }
};


// TS interface to get params of note for updateNotes functionality
interface UpdateNoteParams {
    noteId: string // no ? because we know it will be defined. 
}

// TS interface to check note body for updateNotes functionality 
interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNotes: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {
    const noteId = req.params.noteId; // get the noteId from the request parameters
    const newTitle = req.body.title; // get the new title from the request body
    const newText = req.body.text; // get the new text from the request body
    const authenticatedUserId = req.session.userId; // get the userId from the session

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            // checks whether req.noteID matches the form of a mongoose ID. 
            throw createHttpError(400, "Invalid note Id"); 
        }

        if (!newTitle) {
            // if the title is missing from the request
            throw createHttpError(400, "Note must have a title");
        }

        const note = await dailyNoteModel.findById(noteId).exec(); // find the note by ID

        if (!note) {
            // valid ID, but check if null or undefined
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(authenticatedUserId)) {
            // check if the note's userId matches the authenticated user's userId
            throw createHttpError(401, "You cannot access this note");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save() // saves the changes to the note without fetching  

        res.status(200).json(updatedNote);
    } catch (error) {
        // forward error to the error handler middleware
        next(error);
    }
};


export const deleteNote: RequestHandler = async(req, res, next) => {
    // This function deletes a note by ID 
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId; // get the userId from the session
    try {

        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            // checks whether req.noteID matches the form of a mongoose ID. 
            throw createHttpError(400, "Invalid Note Id");
        }

        const note = await dailyNoteModel.findById(noteId).exec();

        if (!note) {
            // valid ID, but check if null or undefined
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(authenticatedUserId)) {
            // check if the note's userId matches the authenticated user's userId
            throw createHttpError(401, "You cannot access this note");
        }

        await note.deleteOne(); // delete the note from the database

        res.sendStatus(204); // Deletion Successful. Use sendStatus() to not send json body but only the code. 

    } catch (error) {
        next(error);
    }
};
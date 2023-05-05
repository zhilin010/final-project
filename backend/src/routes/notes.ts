// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import * as NotesController from "../controllers/notes";
import express from "express"

// initiate router to set up endpoints
const router = express.Router();

router.get("/", NotesController.getNotes); // call the getNotes function 

router.get("/:noteId", NotesController.getNote); // get one single note by ID 

router.post("/", NotesController.createNotes); // call the createNotes function

router.patch("/:noteId", NotesController.updateNotes); // call the updateNotes function

router.delete("/:noteId", NotesController.deleteNote);  // call the deleteNote function

export default router;
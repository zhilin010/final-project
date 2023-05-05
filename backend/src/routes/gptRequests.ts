// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import * as GptRequestController from "../controllers/gptRequest";
import express from "express"

// initiate router to set up endpoints
const router = express.Router();

router.post("/", GptRequestController.createGptResponse); // call the createGptResponse function

export default router; 
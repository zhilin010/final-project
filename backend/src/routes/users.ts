// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import express from "express";
import * as UserController from '../controllers/users';
import { requiresAuth } from "../middleware/auth";

const router = express.Router(); 

router.get("/", requiresAuth, UserController.getAuthenticatedUser); // call the getAuthenticatedUser function

router.post("/signup", UserController.signUp); // call the signUp function

router.post("/login", UserController.login); // call the login function

router.post("/logout", UserController.logout); // call the logout function

export default router;
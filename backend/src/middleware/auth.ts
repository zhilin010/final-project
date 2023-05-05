// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        // if the user is logged in 
        next(); // continue with the next middleware
    } else { 
        // if the user is not logged in
        next(createHttpError(401, "Not authenticated."));
    }
};
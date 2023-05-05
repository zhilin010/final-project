// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import mongoose from "mongoose";

// declare a new type for the Session object for the express-session library
declare module "express-session" {
    interface Session extends SessionData {
        userId: mongoose.Types.ObjectId
    }
}



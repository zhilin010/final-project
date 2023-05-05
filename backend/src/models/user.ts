// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { InferSchemaType, model, Schema } from "mongoose";

const userSchema: Schema = new Schema({
    username: { 
        type: String,
        required: true,
        unique: true
     },
     email: {
     type: String,
        required: true,
        select: false,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

type User = InferSchemaType<typeof userSchema>; // create a type from the userSchema object 

export default model<User>("User", userSchema); // export the model with the type
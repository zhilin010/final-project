// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Schema, model, InferSchemaType } from 'mongoose';

const dailyNoteSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String
    },
}, { timestamps: true });

type dailyNote = InferSchemaType<typeof dailyNoteSchema>; // create a type from the dailyNoteSchema

export default model<dailyNote>("dailyNote", dailyNoteSchema); // export a model of the dailyNote

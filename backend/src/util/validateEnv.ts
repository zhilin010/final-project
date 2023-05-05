// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { cleanEnv } from "envalid";
import { port, str } from "envalid";

export default cleanEnv(process.env, {
    // This file is used to validate the environment variables.
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    OPENAI_API_KEY: str(),
    OPENAI_ORG_ID: str(),
    SESSION_SECRET: str(),
});

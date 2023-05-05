// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import app from "./app";
import env from "./util/validateEnv"
import mongoose from "mongoose";

const PORT = env.PORT; // 8080 

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to Mongoose");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(console.error);



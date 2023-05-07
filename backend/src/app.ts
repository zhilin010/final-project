// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import gptRoutes from "./routes/gptRequests";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import cors from "cors";

const app = express();

app.use(morgan("dev")); // morgan package to log all accessed endpoints

// middleware to create notes
app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET, // secret key to assign the cookie to the user
    resave: false, // don't save the session if nothing is modified
    saveUninitialized: false, // don't save the session if it's not initialized
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
    },
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING,
    })
}));

app.use(cors({
    origin: 'https://lustrous-gelato-12b510.netlify.app', // Allow the frontend to access this server
    credentials: true, // Allow credentials (session cookies, in this case)
})); // enable CORS

app.use("/api/users", userRoutes) // get users from api/users and forward to userRoutes

app.use("/api/dailynotes", requiresAuth, notesRoutes) // get notes from api/dailynotes and forward to notesRoutes 

app.use("/api/gptRequest", gptRoutes) // get gptRequest from api/gptRequest and forward to gptRoutes

// middleware handler for inexistant endpoints (404)
app.use((req, res, next) => {
    next(createHttpError(404, "Page not found"));
});

// implementation of an error handler in Express, all other types from the Express package. 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    // first log error, then check if the error is of type Error, 
    // return the corresponding message then execute a function.
    console.error(error);
    let errorMessage = "An unknown error occured."; // default error message
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage }); // return the error messages
});

export default app; 
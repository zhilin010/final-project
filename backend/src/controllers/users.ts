// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    // This function gets the authenticated user from the database
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec(); // find the user by the userId
        res.status(200).json(user); // return the user
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    // This function creates a new user in the database
    const username= req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            // if one of the parameters is missing
            throw createHttpError(400, "Parameters missing.");
        }
        
        const existingUsername = await UserModel.findOne({ username: username }).exec();
        if (existingUsername) {
            // if the username already exists
            throw createHttpError(409, "Username already exists. Please choose another one or log in.");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if (existingEmail) {
            // if the email already exists
            throw createHttpError(409, "An user with this email already exists.");
        }

        const hashedPassword = await bcrypt.hash(passwordRaw, 10); // hash the password

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        req.session.userId = newUser.id; // set the userId in the session to the new user's id

        res.status(201).json(newUser); // return the new user

    } catch (error) {
        next(error);
    }
}

interface LoginBody {
    username?: string;
    password?: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    // This function logs in a user
    const username = req.body.username;
    const password = req.body.password; 

    try {
        if(!username || !password) {
            // if one of the parameters is missing
            throw createHttpError(400, "Parameters missing.");
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec(); // select the password and email fields

        if (!user) {
            // if the user doesn't exist
            throw createHttpError(401, "Wrong username or password.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password); // compare the password with the hashed password
        if (!passwordMatch) {
            // if the password doesn't match
            throw createHttpError(401, "Wrong username or password.");
        }

        req.session.userId = user.id // set the userId in the session to the user's id
        res.status(201).json(user); // return the user

        //DEBUG 
        console.log("LOGIN SUCCESS" + req.session.userId);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = async (req, res, next) => {
    // This function logs out a user
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    }); // destroy the session
}
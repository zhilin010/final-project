// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Configuration, OpenAIApi } from "openai";
import env from "../util/validateEnv";
import { RequestHandler } from "express";

const configuration = new Configuration({
    // the API key is stored in the .env file. Necessary for sending requests.
    apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration); // create a new instance of the OpenAI API

export const createGptResponse: RequestHandler = async (req, res) => {
    // this function is called when a POST request is sent to /api/gptRequest. 
    // It will generate a response from the GPT-3 API.
    const messages = req.body; // get the messages from the request body

    const completion = await openai.createChatCompletion({
        // configuration for the GPT-3 API
        model: "gpt-3.5-turbo",
        messages: messages,
    })

    res.json({
        completion: completion.data.choices[0].message, // return the generated response
    });
};
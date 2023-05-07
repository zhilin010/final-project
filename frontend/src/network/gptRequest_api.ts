// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

export interface GPTRequest {
    messages: string[],
}

const backendURL = process.env.REACT_APP_BACKEND_URL;

export async function createGPTRequest(gptRequest: GPTRequest): Promise<string> {
    // This function sends a POST request to the backend server, which then sends a POST request to the OpenAI API.
    const response = await fetch(backendURL + "/api/gptRequest",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([
                {'role': 'system', 'content': gptRequest.messages[0]}, 
                {'role': 'user', 'content': gptRequest.messages[1]}]),
        });
    const JSONresponse = await response.json();
    return JSONresponse.completion.content;
}

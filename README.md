Overview of the website

User Manual

DIAIRY is a small website with the goal of providing users with rich, insightful and highly personalized reflection questions to complete their daily journaling based on the user’s inputs such as the current emotion and the user’s choice of specific topics. It is also possible to customize the number of questions that would need to be filled in.

1 Creating your account

To begin using DIAIRY, you will need to create an account. Please choose an username, a valid email address and your password. For testing the project, an example account is provided to avoid disclosing email addresses or usernames. If you wish, please log in with the following information. The log in button is on the top right of the navigation bar:
Username: testuser 
Password: testpassword
An account is needed to ensure that notes and reflection requests created by the specific user is not shared across accounts.

2 Creating a Note

It is normal that on your first log in, the page appears to be blank. This is normal, as the page will be updated to show a history of your previously created daily reflections. To begin a daily reflection, please click on the “New Daily Reflection” button on the top of the screen. The website will prompt you with 3 questions that are required in order to successfully generate a daily reflection:
1. How are you feeling today?: Please click on a button that best describes your mood.
2. Is there anything specific you’d like to reflect on?: Please respond by writing in the first
person to ensure the most accurate results, such as “I want to reflect on...”
3. How many questions would you wish to answer?: Note that a question limit is set (1-10).
Once all completed, please click on “Submit” so that a daily reflection prompt can be generated. Please note that creating the reflection might take a few moments.

3 Completing Your Daily Reflection

Once the daily reflection prompt is ready, you can begin your journaling by providing answers in the corresponding fields. Once done, please click “Submit,” and the website will automatically generate a rectangular box that will have the current date as the title. This is the note that is generated according to store your daily reflection. It will not be possible to return to a note to modify its contents to ensure that answers are as genuine as possible, so write carefully! Clicking on a specific note will show its full contents. You may also delete a note by clicking on the “trash” button on the top right of a note.

Tech Stack

This website was built using the popular MERN stack. The backend consists of ExpressJS for route handling, notably for note creation and request to ChatGPT API. Node.js to provide JavaScript runtime and MongoDB for the storing of users’ notes. However, instead of vanilla JavaScript, TypeScript was used instead to ensure future scalability and avoid type errors in functions by providing specific types of input and output. The frontend is created using React, where most components were created using React Bootstrap for simplicity and unified design language. The frontend also utilizes TypeScript for the same reason as provided before.
Configuring the backend
The backend folder mostly consists of folders: controllers, middleware, models, routes, util. The controllers folder possesses all the necessary files to ensure functionality of the website, such as creating ChatGPT completions, creating, modifying and deleting notes. It also ensures the user authentication. The middleware folder contains a personalized file to ensure that the user can only access its own notes. The models folder contains the schema on how the notes and user information are stored in the database. The user’s password is hashed with salt for safety. The routes folder contains the Express middleware functions to handle all HTTP requests, such as creating notes, logging in, creating chat completion, etc.

Configuring the frontend

The frontend is built using React and the UI is configured by React Bootstrap elements for simplicity and an unified design. It also contains several folders: components, models, network and styles. The components folder contains all React Bootstrap elements to display the notes accordingly, the modals to sign up, sign in and log out, the chat completion and the navigation bar. The models folder, just like the backend, defines the interfaces TypeScript will check when necessary information is accessed from the User or the Notes. The network folder contains the frontend functions to handle posting requests to the backend server, such as the GPT chat completion request, user authentication and notes manipulation. Finally, the styles folder contains all necessary CSS files that were used to style the modals and the main page. The components are all then imported to App.tsx, where they will be rendered.
Online Resources Used
To complete this project, many online resources were consulted.
1. React Bootstrap Official Documentation: https://react-bootstrap.github.io/
2. OpenAi Official Documentation: https://platform.openai.com/docs/
3. React API Reference: https://react.dev/reference/react
4. Express Official Documentation: https://expressjs.com/en/api.html
5. MongoDB Tutorial For Beginners by Amigoscode: https://youtube.com/watch?v=Www6cTUymCY
6. How to Integrate ChatGPT with Node.js App using the OpenAI API | JSON Formatted Responses: https://youtube.com/watch?v=_gQITRGs4y0
7. Node.js Ultimate Beginner’s Guide in 7 Easy Steps: https://youtube.com/watch? v=ENrzD9HAZK4
8. TypeScript - The Basics: https://youtube.com//watch?v=ahCwqrYpIuM
9. Miscellaneous questions on StackOverflow
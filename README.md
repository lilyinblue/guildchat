# GuildChat

## Introduction
GuildChat is React-Based demo of a chat application run on a Node Express server.

## Getting Started
### Requirements
* npm ^7.19.0
* node ^14.17.3

### Installation
1. Install the Node Express server by running "npm install" in the root folder.
2. Install the React App by running "npm install" in the ./guildchat folder.

### Run GuildChat
1. Open a terminal in the root folder and run "npm start".
2. Wait for the terminal to tell you to do so, then open a second terminal window in the ./guildchat folder.  In this terminal window, run "npm start".
3. A browser window should automatically open to http://localhost:3000.  If it does not, open a new window/tab and go to this URL.
4. Open a second window.  This should either be an incognito window in your current browser or a window in a different browser.  Go to http://localhost:3000 in this browser window as well.

## Using GuildChat
As GuildChat is merely a demo, only two hardcoded user profiles exist.  On the opening screen, select one of the users in your first browser window, and the other user in your second.  Now, these two users should be able to talk to each other.  From this point forward, chat as you would in any chat app by submitting your message either by hitting enter or clicking on the send button.

As an extra feature, the option to run GuildChat in light or dark mode is included.  Given that the user base of nearly every chat app that exists squabbles over which mode is better... it seemed only fair to provide the choice here as well.  This can be toggled in the upper righthand corner.

## How Does GuildChat Work?
GuildChat runs on a local Node Express server, with an additional CORS package to allow requests to be made between two different ports (8080 for the server and 3000 for the app).  Data is stored in a single .json file, .data/chatdata.json, which contains both the list of users and the message history.  (Note: some existing message history is included to demonstrate how it might load.)  Interactions with the file system are handled on the server level, using the Node.js File System Callback API.  (See: server.js.)

When the main component of the React app is first mounted, its first request to the server is made to make the initial load of the chat data from server.  This will include the user profiles and all existing chat history.  This is stored in the main component's state.

On this first screen, a user will be given the choice between two user profiles.  At this time, these two profiles are hardcoded, thus once a profile has been selected, the other one is automatically set to be target user.  The objects containing the user data are then added to the state of the main component.  (See: components/login.)

Once a user is selected, the action truly begins.  User selection triggers a function that requests the chat data from the json file on a one-second interval.  This creates an approximation of real-time communication.  The json data is processed by the history component and mapped into individual "bubble" components.  In the bubbles, each message from the chat data is formatted to display the name of the sender, the time stamp, and the message contents.

Now, a user can begin chatting.  As the user types in the input field, the input component's (components/inputbar) state is continually updated with what is typed.  The user can submit their message either by hitting enter or clicking on the "send" button to the right of the input field.  When this occurs, the first of two functions involved in the sending the new message is invoked.

This first function creates a new object to contain the components of the new message: to, from, timestamp, and content.  It then copies the existing chat data and appends the new object into the messages array.  Then, the second function is invoked.  This function makes a post request, sending this updated data to the server.  At this point the functionality is back to occuring on the Express Server level and outside of the React app.  The server receives the data and overwrites the existing chatdata.json file with the new json array produced by the app, which will then be received by the other user in the other browser window upon its next request to the server.

Note: Given that the chatdata.json is continually written to, it is bound to become cluttered during testing.  A "clean" copy of the original .json is also included in a backup file in the same folder than can be used to manually restore the chatdata to its original state.

## What are the Potential Issues/Weaknesses?

## Ideas for Future Improvements/Additional Features

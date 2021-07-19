# GuildChat

## Introduction
GuildChat is React-based demo of a chat application run on a Node Express server.


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
3. A browser window should automatically open to http://localhost:3000.  If it does not, open a new window and go to this URL.
4. Open a second window.  This should either be an incognito window in your current browser or a window in a different browser.  Go to http://localhost:3000 in this browser window as well.

## Using GuildChat
As GuildChat is merely a demo, only two hardcoded user profiles exist.  On the opening screen, select one of the users in your first browser window, and the other user in your second.  Now, these two users should be able to talk to each other.  From this point forward, chat as you would in any chat app by submitting your message either by hitting enter or clicking on the send button.

As an extra feature, the option to run GuildChat in light or dark mode is included.  Given that the user base of nearly every chat app that exists squabbles over which mode is better... it seemed only fair to provide the choice here as well.  This can be toggled in the upper righthand corner.


## How Does GuildChat Work?
GuildChat runs on a local Node Express server, with an additional CORS package to allow requests to be made between two different ports (8080 for the server and 3000 for the app).  Data is stored in a single .json file, .data/chatdata.json, which contains both the list of users and the message history.  (Note: some existing message history is included to demonstrate how it might load.)  Interactions with the file system are handled on the server level, using the Node.js File System Callback API.  (See: server.js.)

When the main component of the React app is first mounted, its first request to the server is made to make the initial load of the chat data from server.  This will include the user profiles and all existing chat history.  This is stored in the main component's state.

On this first screen, a user will be given the choice between two user profiles.  At this time, these two profiles are hardcoded, thus once a profile has been selected, the other one is automatically set to be target user.  The objects containing the user data are then added to the state of the main component.  (See: components/login.)

Once a user is selected, the action truly begins.  User selection triggers a function that requests the chat data from the json file on a one-second polling interval.  This creates an approximation of real-time communication.  The json data is processed by the history component and mapped into individual "bubble" components.  In the bubbles, each message from the chat data is formatted to display the name of the sender, the time stamp, and the message contents.

Now, a user can begin chatting.  As the user types in the input field, the input component's (components/inputbar) state is continually updated with what is typed.  The user can submit their message either by hitting enter or clicking on the "send" button to the right of the input field.  When this occurs, the first of two functions involved in the sending of the new message is invoked.

This first function creates a new object to contain the components of the new message: to, from, timestamp, and content.  It then copies the existing chat data and appends the new object into the messages array.  Then, the second function is invoked.  This function makes a post request, sending this updated data to the server.  At this point the functionality is back to occuring on the Express server level and outside of the React app.  The server receives the data and overwrites the existing chatdata.json file with the new json array produced by the app, which will then be received by the other user in the other browser window upon its next request to the server.

Note: Given that the chatdata.json is continually written to, it is bound to become cluttered during testing.  A "clean" copy of the original .json is also included in a backup file in the same folder than can be used to manually restore the chatdata to its original state.

## What are the Potential Issues/Weaknesses?
The single greatest weakness within GuildChat is the method of data storage.  Storing all of the data for a chat application in a single .json file has no scalability.  It is sufficient for the purposes of this two-user demo, however a real-world scenario would be better suited with a database-driven solution.  As-is, with every update, the app must process the *entire* chat history rather than only new messages, which will grow increasingly inefficient as the chat history grows longer.  Likewise, if an additional user were to enter the picture, the app would potentially have to process chat data for messages a user is not necessarily a participant in.  (This would present a security risk in addition to the inefficiency.)  Without a shift to a true database solution, this could be improved upon by breaking the data up into multiple json files - perhaps one per user.  This would be an improvement over the current set-up, but still not suitable for a real-world scale.

A second weakness in the design of GuildChat involves the handling of timestamps.  The current implementation creates two different issues.  The first of these again relates to scale.  The history component maps each message using the timestamp as the unique key.  In a real-world scenario with thousands, or even millions, of users, the likelihood of two messages being sent in the exact same millisecond increases dramatically.  Thus, there is a significant chance that duplicate timestamps might occur.  The second issue is that once a new date object is created, it is not processed in any way, save for converting it into a string.  This means users will see timezone of the sender, and the timestamps will not be localized to the user.  This could be solved by converting the date objects to epoch time and storing them in the json in that form.

Note: Details on some of the technical shortcuts taken during the development of GuildChat are also available as comments within the individual component files.

## Ideas for Future Improvements/Additional Features
The following features were all considered during the design and build of GuildChat, but not pursued due to time-constraints:

* User Profiles
  * Adding the ability to "log out" and switch to the other user profile, rather than forcing the user to refresh to do so.
  * Loading the actual user profiles from the json data to populate the login dropdown rather than hardcoding them.
  * Adding a third user profile so that the user must select who they wish to speak to rather than automatically selecting them.  (Thus, leveraging the "to" item in every message object that is presently unused.)
  * Adding avatars to the user profile.
* Message History/Chat Window
  * Processing the time stamps so that they are shown in the user's local timezone rather than the timezone of the sender.
  * Separating existing messages from new messages and adding a visual signifier of this, or visually separating messages by date.
 * ADA/WCAG compliance.
 * Adding proper unit tests.

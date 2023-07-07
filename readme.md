# OpenInApp Backend Assessment

A Node.js-based application that automates email responses for a specific Gmail mailbox while the user is away on vacation.

## Table of Contents

- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Improvements](#improvements)
- [Application Description](#application-description)

## Installation

To run this project, follow these steps:

1. Navigate to the `app` directory: `cd app`
2. Start the application: `npm start`

## Technologies Used

The project utilizes the following technologies:

- `nodemon` (version 2.0.22): Nodemon is a tool that helps with development workflow by automatically restarting the application whenever changes are detected. It is a devDependency, meaning it is not required for production environments.

- `@google-cloud/local-auth` (version 2.1.0): This package provides local authentication for applications using Google Cloud services. It simplifies the authentication process by handling the necessary steps to authenticate with Google APIs locally.

- `express` (version 4.18.2): Express is a popular and lightweight web framework for Node.js. It simplifies the process of building web applications by providing a set of features and utilities for handling routing, middleware, and HTTP requests.

- `googleapis` (version 105.0.0): The googleapis package allows developers to interact with various Google APIs. It provides a simple and consistent interface for making API requests and handling responses from Google services.

## Code Improvements

Based on the provided information, here are some areas where the code can be improved:

- I can improve the error handling part in the services functions and make it easy to debug .
- Quering of threads can be made more specific by tweaking some more query parameters .

## Application Description

This Node.js-based application is designed to automate email responses for a specific Gmail mailbox while the user is away on vacation. The application performs the following technical tasks:

1. **Email Retrieval**: The app utilizes the "Login with Google" API to authenticate and fetch new emails from the specified Gmail ID. It periodically checks for incoming emails using the Gmail API.

2. **Reply Generation**: Using email threading algorithms, the app identifies email threads that have no prior replies from the user. It generates a reply email with customizable content and sends it as a response to these first-time email threads.

3. **Labeling and Moving**: After sending the reply, the app interacts with the Gmail API to add a specified label to the email and move it to the labeled section within the Gmail mailbox. If the label does not exist, the app creates it using the Gmail API.

4. **Periodic Execution**: To ensure continuous email monitoring, the app repeats this sequence of tasks at random intervals ranging from 45 to 120 seconds. This periodic execution is achieved through scheduling mechanisms or timers within the Node.js environment.

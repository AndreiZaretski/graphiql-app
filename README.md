[![Header](./public/banner.jpg 'Header')](url)

## About

The Mission Impossible team is glad to see you! We will make a project of any complexity according to the requirements of the terms of reference, within the agreed time frame.

We will provide technical support for the project and further product development. Individual approach to each client. If you have any questions, you can contact any of us. GraphiQL is a playground/IDE for graphQL requests.

You can use any API that supports CORS to work. We hope you will be satisfied with the quality of our application.

Please send all suggestions for improving the operation of the application to the developers.

## Technologies

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Redux](https://img.shields.io/badge/redux-%23593d88.svg?logo=redux&logoColor=white)](https://redux.js.org/)
[![SCSS](https://img.shields.io/badge/SASS-hotpink.svg?logo=SASS&logoColor=white)](https://sass-lang.com/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/-vitest-%dab40b.svg?logo=vitest&logoColor=white)](https://vitest.dev/)

## How to run locally

#### Requirements

- Node.js
- NPM

Simply clone this project to user's machine, navigate to project's folder under a terminal of his/her choice and then run the following commands:

```bash
# Install dependencies
npm install

# Run local server
npm run dev

# Run in production mode
npm run build
```

#### Configuring the .env file

If you want to run locally you need to configure the .env file with the settings for connecting to Firebase. Put it in the root of the project.

If you can't configure the .env file, contact any project's developer to help and provide a test .env file.

```bash
# Example .env file
VITE_REACT_APP_FIREBASE_API_KEY=Your API key for accessing Firebase services.
VITE_REACT_APP_FIREBASE_AUTH_DOMAIN=Your authentication domain for Firebase.
VITE_REACT_APP_FIREBASE_PROJECT_ID=Your Firebase project ID.
VITE_REACT_APP_FIREBASE_STORAGE_BUCKET=Your storage bucket for Firebase.
VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID=Your messaging sender ID for Firebase Cloud Messaging.
VITE_REACT_APP_FIREBASE_APP_ID=Your Firebase application ID.
```

## Available scripts

For running ESLint, Prettier, and Jest tests run the following commands:

```bash
# Run ESLint
npm run lint

# Run Prettier
npm run prettier-fix

# Run Vitest tests
npm run test:coverage
```

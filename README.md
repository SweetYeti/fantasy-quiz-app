# Magical Portrait Commission App

This project is a full-stack application for commissioning magical portraits, built with React for the frontend and Node.js/Express for the backend.

## Technical Overview

### Frontend (React)
- **Framework**: Create React App
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useEffect)
- **API Calls**: Axios
- **Styling**: CSS Modules
- **Deployment**: GitHub Pages

### Backend (Node.js/Express)
- **Server**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Uploads**: Multer
- **Email Service**: Nodemailer
- **API Integration**: OpenAI API for generating magical profiles
- **Environment Variables**: dotenv
- **CORS**: Enabled for frontend domains
- **Deployment**: Heroku

### API Endpoints
- `/api/quiz/submit`: POST - Submit quiz answers and generate magical profile
- `/api/commission/submit`: POST - Submit commission details with file upload

### Database Schema
- **QuizResponse**: Stores user quiz answers and generated magical profiles
- **Commission**: Stores commission details including reference to QuizResponse

### File Structure

project-root/
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ ├── utils/
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── README.md
├── backend/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── utils/
│ ├── server.js
│ ├── package.json
│ └── .env
└── README.md

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `OPENAI_API_KEY`: OpenAI API key for generating profiles
- `EMAIL_USER`: Email for sending commission notifications
- `EMAIL_PASS`: Password for the email account
- `REACT_APP_API_URL`: Backend API URL for frontend requests

### Deployment
- Frontend: GitHub Pages
- Backend: Heroku

### Security Measures
- CORS configuration to allow only specific origins
- Environment variables for sensitive information
- File upload size and type restrictions

## Dummy's Guide to Updating and Deploying

Follow these steps whenever you make changes to your project:

### 1. Making Changes
1. Open your project in your code editor.
2. Make the necessary changes to your files.
3. Save all modified files.

### 2. Testing Locally
1. Open a terminal in your project root directory.
2. Run `npm start` to start the development server.
3. Open `http://localhost:3000` in your browser to test your changes.
4. Make sure everything works as expected.

### 3. Committing Changes
1. Open a terminal in your project root directory.
2. Run `git status` to see which files have been modified.
3. Run `git add .` to stage all changes.
4. Run `git commit -m "Brief description of your changes"` to commit the changes.

### 4. Pushing Changes to GitHub
1. Run `git push origin main` to push your changes to the main branch on GitHub.

### 5. Deploying Frontend to GitHub Pages
1. In the project root directory, run `npm run deploy`.
2. This will build your React app and deploy it to the gh-pages branch.

### 6. Deploying Backend to Heroku (if applicable)
1. If you've made changes to the backend, commit those changes as well.
2. Run `git push heroku main` to deploy your backend to Heroku.

### Important Notes
- Always make sure you're in the correct directory when running commands.
- If you're unsure about any step, it's okay to ask for help or double-check before proceeding.
- Regularly pull changes from the remote repository before making your own changes to avoid conflicts.

By following these steps, you'll ensure that your changes are properly saved, committed, and deployed to the correct locations.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB account and database

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Magical Portrait Commission Process

### Overview
This section outlines the step-by-step process for commissioning a magical portrait from Hanna, ensuring a smooth user experience and GDPR compliance.

### Commission Process Steps

1. Commission Details
2. Custom Requests
3. Reference Image Upload
4. Quiz Answer Review
5. Contact Information
6. Terms, Conditions, and Consent
7. Payment

### Additional Features
- Email Opt-in
- Data Handling
- Confirmation

### GDPR Compliance Measures
- Explicit consent for data sharing
- Option to edit personal information before submission
- Clear explanation of data usage in terms and conditions

### Technical Considerations
- Multi-step form with progress indicator
- Mobile responsiveness
- Secure file upload handling
- Integration with backend API for data processing and email sending

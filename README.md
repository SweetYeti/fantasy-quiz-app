# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Magical Portrait Commission Process

## Overview
This section outlines the step-by-step process for commissioning a magical portrait from Hanna, ensuring a smooth user experience and GDPR compliance.

## Commission Process Steps

### 1. Commission Details
- Select portrait type (e.g., watercolor, tarot-inspired)
- Choose size and other basic options

### 2. Custom Requests
- Text area for additional notes or special requests
- Predefined options for common requests (e.g., color preferences, style preferences)

### 3. Reference Image Upload
- Multiple image upload functionality
- File size limit: 5MB per image
- Supported formats: JPEG, PNG, GIF
- Maximum of 5 images

### 4. Quiz Answer Review
- Display quiz answers relevant to the portrait
- Allow users to edit or remove sensitive information
- Option to select which answers to share with Hanna

### 5. Contact Information
- Name
- Email address
- Phone number (optional)
- Preferred contact method
- Option for discovery call or proceeding based on provided information

### 6. Terms, Conditions, and Consent
- Clear explanation of data usage and sharing
- Checkbox for accepting terms and conditions
- Checkbox for GDPR consent to share data with Hanna
- Link to full privacy policy

### 7. Payment
- Option for full payment or deposit
- Integration with secure payment gateway

## Additional Features

### Email Opt-in
- Checkbox for subscribing to special deals and news (if not already subscribed)

### Data Handling
- Format user inputs into a well-structured email for Hanna
- Generate PDF attachment with detailed commission information

### Confirmation
- Send confirmation email to user with order details and next steps

## GDPR Compliance Measures
- Explicit consent for data sharing
- Option to edit personal information before submission
- Clear explanation of data usage in terms and conditions

## Technical Considerations
- Implement as a multi-step form with progress indicator
- Ensure mobile responsiveness
- Implement secure file upload handling
- Integrate with backend API for data processing and email sending

## Future Enhancements
- Integration with a CRM system for Hanna to manage commissions
- Automated follow-up emails for project updates
- Gallery of completed commissions (with user permission)
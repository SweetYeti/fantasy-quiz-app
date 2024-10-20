import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Information We Collect</h2>
      <p>We collect the following information:</p>
      <ul>
        <li>Quiz answers you provide for generating your magical reading</li>
        <li>Email address (if you choose to provide it)</li>
        <li>Commission form data (if you submit a commission request)</li>
      </ul>
      
      <h2>2. How We Use Your Information</h2>
      <p>We use your information in the following ways:</p>
      <ul>
        <li>Quiz answers are sent to an external AI service (OpenAI) to generate your magical reading</li>
        <li>Email address is used to send you your reading results (if provided)</li>
        <li>Commission form data is used to process your commission request and is shared with our artist, Hanna</li>
      </ul>
      
      <h2>3. Data Retention</h2>
      <p>We handle your data as follows:</p>
      <ul>
        <li>Quiz answers are deleted immediately after your reading is generated</li>
        <li>Reading results are only stored if you submit a commission request</li>
        <li>Commission form data is stored and shared with Hanna for the duration of the commission process</li>
      </ul>
      
      <h2>4. Data Sharing</h2>
      <p>We share your data with the following third parties:</p>
      <ul>
        <li>OpenAI: To process your quiz answers and generate your reading</li>
        <li>Hanna (our artist): If you submit a commission request, we share your reading results and commission form data</li>
      </ul>
      
      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction or deletion of your personal data</li>
        <li>Object to or restrict the processing of your personal data</li>
        <li>Request a copy of your personal data in a portable format</li>
      </ul>
      
      <h2>6. Session Data</h2>
      <p>Your magical reading is stored locally in your browser during your session. This data is only sent to our servers if you choose to submit a commission request. The data is automatically deleted when you close your browser or navigate away from our site.</p>
      
      <p>For any questions about this policy or to exercise your rights, please contact us at scott@skobo.co.uk</p>
    </div>
  );
};

export default PrivacyPolicy;
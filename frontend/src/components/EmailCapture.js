import React, { useState } from 'react';

const EmailCapture = ({ onSubmit, onSkip, onBack }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting email capture:', { email, firstName });
    onSubmit({ email, firstName });

    // Submit the form to Mailchimp
    const form = e.target;
    const url = form.action;
    const formData = new FormData(form);

    fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    }).then(() => {
      console.log('Mailchimp form submitted');
    }).catch(error => {
      console.error('Error submitting to Mailchimp:', error);
    });
  };

  return (
    <div className="email-capture">
      <div className="content-frame">
        <h2>Stay Updated with Hanna's Magical Art</h2>
        <p>Sign up for exclusive updates and art deals from Hanna:</p>
        <form
          action="https://hanna-nygren.us8.list-manage.com/subscribe/post?u=0abc8b368ac61d6b33afd6524&amp;id=0b28e946d0&amp;f_id=001018e0f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="mc-field-group">
            <label htmlFor="mce-FNAME">First Name </label>
            <input 
              type="text" 
              name="FNAME" 
              className="required" 
              id="mce-FNAME" 
              required 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mc-field-group">
            <label htmlFor="mce-EMAIL">Email Address </label>
            <input 
              type="email" 
              name="EMAIL" 
              className="required email" 
              id="mce-EMAIL" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            name="subscribe" 
            id="mc-embedded-subscribe" 
            className="subscribe-button"
          >
            Subscribe
          </button>
        </form>
        <div className="button-container">
          <button type="button" onClick={onBack} className="back-button">Back</button>
          <button type="button" onClick={onSkip} className="skip-button">Just show my reading</button>
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;
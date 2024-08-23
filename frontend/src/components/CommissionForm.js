import React, { useState } from 'react';
import './CommissionForm.css';

const CommissionForm = ({ onBack, profile, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    portraitType: '',
    customRequests: '',
    referenceImages: [],
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      preferredContact: ''
    },
    selectedQuizAnswers: {},
    dataProcessingConsent: false,
    termsAccepted: false,
    marketingConsent: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      contactInfo: {
        ...prevState.contactInfo,
        [name]: value
      }
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxFiles = 5;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const validFiles = files.slice(0, maxFiles).filter(file => 
      file.size <= maxSize && acceptedTypes.includes(file.type)
    );

    const invalidFiles = files.filter(file => 
      file.size > maxSize || !acceptedTypes.includes(file.type)
    );

    setFormData(prev => ({
      ...prev,
      referenceImages: [...prev.referenceImages, ...validFiles].slice(0, maxFiles)
    }));

    if (invalidFiles.length > 0 || files.length > maxFiles) {
      let message = '';
      if (invalidFiles.length > 0) {
        message += `${invalidFiles.length} file(s) were not uploaded due to size or format restrictions. `;
      }
      if (files.length > maxFiles) {
        message += `Only the first ${maxFiles} files were accepted.`;
      }
      alert(message);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.dataProcessingConsent || !formData.termsAccepted) {
      alert('Please accept the Privacy Policy and Terms & Conditions to proceed.');
      return;
    }
    // Proceed with form submission
    onSubmit(formData);
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.portraitType !== '';
    }
    const { name, email, preferredContact } = formData.contactInfo;
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      preferredContact !== '' &&
      formData.dataProcessingConsent &&
      formData.termsAccepted
    );
  };

  const renderNavigationButtons = () => (
    <div className="form-navigation">
      {step > 1 && (
        <button type="button" onClick={onBack} className="back-button">
          Back to Reading
        </button>
      )}
      {step > 1 && (
        <button type="button" onClick={() => setStep(step - 1)} className="back-button">
          Back
        </button>
      )}
      {step < 4 && (
        <button 
          type="button" 
          onClick={() => setStep(step + 1)} 
          className="skip-button"
          disabled={canProceed() && step !== 1}
        >
          Skip
        </button>
      )}
      {step < 4 ? (
        <button 
          type="button" 
          onClick={() => setStep(step + 1)} 
          className="next-button"
          disabled={!canProceed()}
        >
          {step === 3 ? 'Upload' : 'Next'}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          className="submit-button"
          disabled={!canProceed()}
        >
          Submit
        </button>
      )}
    </div>
  );

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="commission-step">
            <h2>Choose Your Portrait Type</h2>
            <div className="portrait-options">
              <label>
                <input
                  type="radio"
                  name="portraitType"
                  value="watercolor"
                  checked={formData.portraitType === 'watercolor'}
                  onChange={handleInputChange}
                />
                Watercolor Illustration
              </label>
              <label>
                <input
                  type="radio"
                  name="portraitType"
                  value="tarot"
                  checked={formData.portraitType === 'tarot'}
                  onChange={handleInputChange}
                />
                Tarot-Inspired Watercolor
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="commission-step">
            <h2>Custom Requests</h2>
            <textarea
              name="customRequests"
              value={formData.customRequests}
              onChange={handleInputChange}
              placeholder="Describe any specific elements or themes you'd like included in your portrait..."
              rows={5}
            />
          </div>
        );
      case 3:
        return (
          <div className="commission-step">
            <h2>Reference Images (Optional)</h2>
            <p className="file-upload-note">
              You can provide up to 5 images (max 5MB each, JPG, PNG, or GIF) to help Hanna understand your vision. 
              This step is entirely optional - you can skip it or discuss image ideas with Hanna later.
            </p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              multiple
              onChange={handleFileUpload}
              className="file-input"
            />
            <div className="uploaded-images">
              {formData.referenceImages.map((image, index) => (
                <div key={index} className="image-container">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Reference ${index + 1}`} 
                  />
                  <button onClick={() => removeImage(index)} className="remove-image">×</button>
                </div>
              ))}
            </div>
            <p>{formData.referenceImages.length} of 5 images uploaded</p>
          </div>
        );
      case 4:
        return (
          <div className="commission-step">
            <h2>Contact Information</h2>
            <input
              type="text"
              name="name"
              value={formData.contactInfo.name}
              onChange={handleContactInfoChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.contactInfo.email}
              onChange={handleContactInfoChange}
              placeholder="Your Email"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.contactInfo.phone}
              onChange={handleContactInfoChange}
              placeholder="Your Phone (optional)"
            />
            <select
              name="preferredContact"
              value={formData.contactInfo.preferredContact}
              onChange={handleContactInfoChange}
              required
            >
              <option value="">Preferred method for Hanna to contact you about commissions</option>
              <option value="email">Email</option>
              <option value="phone">Phone (UK only)</option>
            </select>
            <div className="consent-checkboxes">
              <label>
                <input
                  type="checkbox"
                  name="dataProcessingConsent"
                  checked={formData.dataProcessingConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataProcessingConsent: e.target.checked }))}
                  required
                />
                <span>I consent to the processing of my personal data as described in the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  required
                />
                <span>I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>.</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, marketingConsent: e.target.checked }))}
                />
                <span>Yes, I'd like to receive updates about magical portraits and special offers. You can unsubscribe at any time.</span>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="commission-form content-frame">
      <h2>Commission Your Magical Portrait</h2>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        {renderNavigationButtons()}
      </form>
    </div>
  );
};

export default CommissionForm;
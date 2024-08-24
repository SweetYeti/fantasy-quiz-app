import React, { useState } from 'react';
import './CommissionForm.css';

const CommissionForm = ({ onBack, profile, onSubmit, onShowPrivacyPolicy, onShowTermsAndConditions }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commissionType: '',
    additionalDetails: '',
    dataProcessingConsent: false,
    termsAccepted: false,
    marketingConsent: false,
    referencePhotos: []
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        referencePhotos: Array.from(files).slice(0, 5)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit
    setUploadedFiles(prevFiles => [...prevFiles, ...validFiles].slice(0, 5));
  };

  const removeFile = (index) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.dataProcessingConsent || !formData.termsAccepted) {
      alert('Please accept the Privacy Policy and Terms & Conditions to proceed.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/commission/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, magicalProfile: profile }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit commission request');
      }

      await response.json();
      alert('Commission request submitted successfully! Hanna will review your request and contact you soon.');
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting commission request:', error);
      alert('Failed to submit commission request. Please try again.');
    }
  };

  return (
    <div className="commission-form-container">
      <form onSubmit={handleSubmit} className="commission-form">
        <h2 className="form-title">Request Your Magical Artwork</h2>
        <p className="form-description">
          Bring your vision to life with a custom watercolor or tarot-inspired piece. 
          Fill out the form below to start your magical journey. Please note that 
          submitting a request does not guarantee acceptance, as Hanna carefully 
          selects each project. A 50% deposit will be required before work begins.
        </p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone Number (optional, UK only)"
          pattern="^\+?44\d{10}$|^0\d{10}$"
        />
        <select
          name="commissionType"
          value={formData.commissionType}
          onChange={handleChange}
          required
        >
          <option value="">Select Commission Type</option>
          <option value="watercolor">Watercolor Illustration ($200)</option>
          <option value="tarot">Tarot-Inspired Watercolor ($250)</option>
        </select>
        <textarea
          name="additionalDetails"
          value={formData.additionalDetails}
          onChange={handleChange}
          placeholder="Custom Instructions"
        />
        <div className="file-upload-section">
          <label className="file-upload-label">Upload Reference Photos (up to 5, max 5MB each)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <div className="uploaded-images">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="image-thumbnail">
                <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                <button onClick={() => removeFile(index)} className="remove-image">×</button>
              </div>
            ))}
          </div>
        </div>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="dataProcessingConsent"
              checked={formData.dataProcessingConsent}
              onChange={handleChange}
            />
            <span>
              I consent to the processing of my personal data (
              <button type="button" onClick={onShowPrivacyPolicy} className="inline-link">
                Privacy Policy
              </button>
              )
            </span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <span>
              I accept the <button type="button" onClick={onShowTermsAndConditions} className="inline-link">
                Terms and Conditions
              </button>
            </span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
            />
            <span>I'd like to receive magical updates and offers</span>
          </label>
        </div>
        <div className="form-navigation">
          <button type="button" onClick={onBack} className="back-button">Back</button>
          <button type="submit" className="submit-button">Request Commission</button>
        </div>
      </form>
    </div>
  );
};

export default CommissionForm;
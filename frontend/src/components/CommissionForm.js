import React, { useState } from 'react';
import './CommissionForm.css';

const CommissionForm = ({ onBack, profile, onSubmit, onShowPrivacyPolicy, onShowTermsAndConditions }) => {
  console.log('CommissionForm profile prop:', profile);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commissionType: '',
    additionalDetails: '',
    dataProcessingConsent: false,
    termsAccepted: false,
    marketingConsent: false,
    referencePhotos: [],
    dataSharingPreference: 'full'
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [fileSizeWarning, setFileSizeWarning] = useState('');

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
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = files.filter(file => file.size <= maxSize);
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setFileSizeWarning(`${oversizedFiles.length} file(s) exceeded the 5MB limit and were not added.`);
    } else {
      setFileSizeWarning('');
    }

    setUploadedFiles(prevFiles => [...prevFiles, ...validFiles].slice(0, 5));
    setFormData(prevState => ({
      ...prevState,
      referencePhotos: [...prevState.referencePhotos, ...validFiles].slice(0, 5)
    }));
  };

  const removeFile = (index) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key === 'referencePhotos') {
        formData[key].forEach((file, index) => {
          dataToSubmit.append('referencePhotos', file);
        });
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    // Add profile and quizAnswers to the FormData
    dataToSubmit.append('magicalProfile', JSON.stringify(profile));
    dataToSubmit.append('quizAnswers', localStorage.getItem('quizAnswers'));
    
    console.log('Submitting formData:', Object.fromEntries(dataToSubmit));
    onSubmit(dataToSubmit);
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
          <option value="watercolor">Magical Portrait: Standard</option>
          <option value="tarot">Magical Portrait: Tarot Edition</option>
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
          {fileSizeWarning && <p className="file-size-warning">{fileSizeWarning}</p>}
          <div className="uploaded-images">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="image-thumbnail">
                <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                <button onClick={() => removeFile(index)} className="remove-image">×</button>
              </div>
            ))}
          </div>
        </div>
        <div className="data-sharing-preferences">
          <h3>Data Sharing Preferences</h3>
          <p>Choose how much of your magical profile you'd like to share with Hanna. Sharing more information allows for a more personalized artwork, but the choice is yours:</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="dataSharingPreference"
                value="full"
                checked={formData.dataSharingPreference === 'full'}
                onChange={handleChange}
              />
              Share your Magical Reading with Hanna
            </label>
            <label>
              <input
                type="radio"
                name="dataSharingPreference"
                value="custom"
                checked={formData.dataSharingPreference === 'custom'}
                onChange={handleChange}
              />
              Custom Instructions Only: Share only the information you provide in this form
            </label>
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
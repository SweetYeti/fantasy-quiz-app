import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions">
      <h1>Terms and Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By using our magical portrait commission service, you agree to be bound by these Terms and Conditions.</p>

      <h2>2. Commission Process</h2>
      <p>We will create your magical portrait based on the information you provide. The final product may vary slightly from any examples shown.</p>

      <h2>3. Payment</h2>
      <p>Payment is due in full before we begin work on your commission. Prices are as stated on our website unless otherwise agreed in writing.</p>

      <h2>4. Revisions and Refunds</h2>
      <p>We offer one round of minor revisions. If you're unsatisfied with the final product, please contact us to discuss solutions. Refunds are considered on a case-by-case basis.</p>

      <h2>5. Intellectual Property</h2>
      <p>We retain the copyright to all artwork created. You are granted a non-exclusive license to use the commissioned artwork for personal, non-commercial purposes.</p>

      <h2>6. Privacy</h2>
      <p>Your use of our service is also governed by our Privacy Policy.</p>
    </div>
  );
};

export default TermsAndConditions;
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="modal-body">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
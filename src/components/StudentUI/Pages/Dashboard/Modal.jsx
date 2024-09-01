import React from 'react';
import './Modal.css'
const Modal = ({ notifications, onClose }) => {
  return (
    <div className="modal-overlay" >
      <div className="modal-content">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.notificationId}>
             <b>{new Date(notification.createdAt).toDateString()}</b>: {notification.message}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

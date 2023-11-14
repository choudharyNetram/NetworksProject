import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/all.css';
import '../styles/visitorform.css' ; 

const StudentVisitorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    address: '',
    studentName: '',
    studentMobileNo : '' , 
    department: '', 
    hostelRoomNo: '' , 
    inTime: '',   // Change to 24-hour format, e.g., "14:30"
    outTime: '',  // Change to 24-hour format, e.g., "14:30"
    timestamp: '' , 
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the current date and time
    const currentDateTime = new Date();
    //const currentDate = currentDateTime.toISOString().split('T')[0];
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(currentDateTime.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const currentTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create a data object to send to the server
    const data = {
      date: formattedDate,
      name: formData.name,
      mobileNo: formData.mobileNo,
      address: formData.address,
      studentName: formData.studentName,
      studentMobileNo: formData.studentMobileNo,
      department: formData.department, 
      hostelRoomNo: formData.hostelRoomNo , 
      inTime: currentTime,   // Use the user's input
      outTime: "", // Use the user's input
      datetime: currentDateTime , 
    };

    // Send a POST request to the server
    axios
      .post('http://localhost:3001/visitor/add-student-visitor', data)
      .then((response) => {
        // Handle a successful response, e.g., show a success message
        setNotification({ type: 'success', message: 'Entry submitted successfully!' });
        setSuccessMessage('Entry submitted successfully!');
        setErrorMessage('');
         window.location.reload();
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        setNotification({ type: 'error', message: 'Error submitting the form. Please try again.' });
        setSuccessMessage('');
        setErrorMessage('Error submitting the form. Please try again.');
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNotification(null);
    }, 5000); // Notification will disappear after 5 seconds

    return () => clearTimeout(notificationTimeout);
  }, [notification]);

  return (
    <div className="form-container">
      <h2>Student Relatives Visitor Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mobile No.</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </div>
       
        <div className="form-group">
          <label> Student Name </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Student Mobile Number </label>
          <input
            type="text"
            name="studentMobileNo"
            value={formData.studentMobileNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label> Department </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label> Hostel Room Number </label>
          <input
            type="text"
            name="hostelRoomNo"
            value={formData.hostelRoomNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Submit</button>
        {/* Success and error messages */}
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default StudentVisitorForm;

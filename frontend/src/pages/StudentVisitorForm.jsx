import React, { useState } from 'react';
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
  });

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
    };

    // Send a POST request to the server
    axios
      .post('http://localhost:3001/visitor/add-student-visitor', data)
      .then((response) => {
        // Handle a successful response, e.g., show a success message
        console.log('Data saved:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error:', error);
      });
  };

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
      </form>
    </div>
  );
};

export default StudentVisitorForm;

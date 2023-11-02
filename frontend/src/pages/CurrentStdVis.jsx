
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css' ; 
import '../styles/all.css';

const CurrentStudentVisitors = () => {
  const [currentStudentVisitors, setStudentCurrentVisitors] = useState([]);
  const handleCheckout = (visitorId) => {
    // Implement checkout functionality here
    const currentDateTime = new Date();
    const outTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const checkoutData = {
      visitorId: visitorId, // Replace with the actual visitor ID field name
      outTime: outTime,
    };
    
    // Send a request to update the visitor with the checkout data
    axios
      .put(`http://localhost:3001/visitor/checkout/${visitorId}`, checkoutData)
      .then((response) => {
        // Handle a successful response (e.g., update the state)
        console.log('Visitor checked out:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error checking out visitor:', error);
      });
    
  };
  
  useEffect(() => {
    // Fetch data for current visitors from the backend
    axios.get('http://localhost:3001/visitor/student-current').then((response) => {
      setStudentCurrentVisitors(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Currently Inside Campus</h2>
      <table className="visitor-table">
        <thead>
          <tr>
          <th>Date</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Student-Name</th>
            <th>Student Mob. no.</th>
            <th>Department </th>
            <th> Hostel Room no.</th>
            <th>Address </th>
            <th>In Time</th>
            <th>Checkout</th>

          </tr>
        </thead>
        <tbody>
          {currentStudentVisitors.map((visitor) => (
            <tr key={visitor._id}>
               <td>{visitor.date.split('T')[0]}</td>
              <td>{visitor.name}</td>
              <td>{visitor.mobileNo}</td>
              <td>{visitor.studentName}</td>
              <td>{visitor.studentMobileNo}</td>
              <td> {visitor.department} </td>
              <td> {visitor.hostelRoomNo} </td>
              <td>{visitor.address}</td>
              <td>{visitor.inTime}</td>
              <td>
              <button onClick={() => handleCheckout(visitor._id)}>Checkout</button>
            </td>

            </tr>
          ))}
        </tbody>
      </table>
         
     
    </div>
  );
};

export default CurrentStudentVisitors;


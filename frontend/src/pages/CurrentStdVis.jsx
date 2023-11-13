
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css' ; 
import '../styles/all.css';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const CurrentStudentVisitors = () => {
  const [currentStudentVisitors, setStudentCurrentVisitors] = useState([]);
  const[cookies] = useCookies(['token']) ; 
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Get navigate for navigation

  const handleCheckout = (visitorId) => {
    const currentDateTime = new Date();
    const outTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const checkoutData = {
      visitorId: visitorId,
      outTime: outTime,
    };
    
    axios
      .put(`http://localhost:3001/visitor/checkout/${visitorId}`, checkoutData)
      .then((response) => {
        const updatedVisitors = currentStudentVisitors.map(visitor =>
          visitor._id === visitorId ? { ...visitor, outTime } : visitor
        );
        setStudentCurrentVisitors(updatedVisitors);
        console.log('Visitor checked out:', response.data);
      })
      .catch((error) => {
        console.error('Error checking out visitor:', error);
      });
  };

  useEffect(() => {
    const token = cookies.token ; 

    // Fetch data for current visitors from the backend
    if(token){
      axios.get('http://localhost:3001/visitor/student-current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStudentCurrentVisitors(response.data);
      })
      .catch((error)=>{
        console.error(error) ; 
      });
  }
  else {
    navigate('/login');
  }
  }, [cookies, navigate]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const token = cookies.token;
    // Fetch visitors based on the search query
    axios.get(`http://localhost:3001/visitor/search/s?q=${e.target.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setStudentCurrentVisitors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Student Visitors Currently Inside Campus</h2>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={handleSearch} 
      />
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
          {currentStudentVisitors
          .filter(visitor => visitor.outTime === "")
          .map((visitor) => (
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
                <button onClick={() => handleCheckout(visitor._id)} className="customButton">Checkout</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         
     
    </div>
  );
};

export default CurrentStudentVisitors;


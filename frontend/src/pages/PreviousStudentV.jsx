import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css' ; 
import '../styles/all.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

import { useCookies } from 'react-cookie';

const PreviousStudentVisitors = () => {
  const [previousStudentVisitors, setPreviousStudentVisitors] = useState([]);
  const [cookies] = useCookies(['token']);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Get navigate for navigation

  useEffect(() => {
    const token = cookies.token;

    if (token) {
      axios
        .get('http://localhost:3001/visitor/student-previous', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPreviousStudentVisitors(sortedData);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate('/login'); // Redirect to the login page when there's no token
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
        setPreviousStudentVisitors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Students Related Previous Visitors</h2>
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
            <th>Hostel Room no.</th>
            <th>Address </th>
            <th>In Time</th>
            <th>Out Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(previousStudentVisitors) ? (
            previousStudentVisitors
            .filter(visitor => visitor.outTime !== "")
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
                <td>{visitor.outTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousStudentVisitors;

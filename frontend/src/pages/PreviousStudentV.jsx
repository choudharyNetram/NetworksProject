import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css' ; 
import '../styles/all.css';

import { useCookies } from 'react-cookie';

const PreviousStudentVisitors = () => {
  const [previousStudentVisitors, setPreviousStudentVisitors] = useState([]);
  const [cookies] = useCookies(['token']);

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
          setPreviousStudentVisitors(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Handle unauthorized access
    }
  }, [cookies]);

  return (
    <div>
      <h2>Students Related Previous Visitors</h2>
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
            previousStudentVisitors.map((visitor) => (
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

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css' ; 
import '../styles/all.css';

import { useCookies } from 'react-cookie';

const PreviousStudentVisitors = () => {
  const [previousStudentVisitors, setPreviousStudentVisitors] = useState([]);
  const [cookies] = useCookies(['token']);

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
          setPreviousStudentVisitors(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Handle unauthorized access
    }
  }, [cookies]);

  return (
    <div>
      <h2>Students Related Previous Visitors</h2>
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
            <th>Out Time</th>

          </tr>
        </thead>
        <tbody>
          {previousStudentVisitors.map((visitor) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousStudentVisitors;
*/
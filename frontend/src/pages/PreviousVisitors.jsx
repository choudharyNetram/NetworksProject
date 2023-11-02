import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css' ; 
import '../styles/all.css';

import { useCookies } from 'react-cookie';
const PreviousVisitors = () => {
  const [previousVisitors, setPreviousVisitors] = useState([]);
  const [cookies] = useCookies(['adminToken']);

  useEffect(() => {
    const adminToken = cookies.adminToken;

    if (adminToken) {
      axios
        .get('http://localhost:3001/visitor/previous', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })
        .then((response) => {
          setPreviousVisitors(response.data);
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
      <h2>Previous Visitors</h2>
      <table className="visitor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Whom to Meet</th>
            <th>Date</th>
            <th>Coming From</th>
            <th>Vehicle No</th>
            <th>In Time</th>
            <th>Out Time</th>
          </tr>
        </thead>
        <tbody>
          {previousVisitors.map((visitor) => (
            <tr key={visitor._id}>
              <td>{visitor.name}</td>
              <td>{visitor.mobileNo}</td>
              <td>{visitor.whomToMeet}</td>
              <td>{visitor.date.split('T')[0]}</td>
              <td>{visitor.comingFrom}</td>
              <td>{visitor.vehicleNo}</td>
              <td>{visitor.inTime}</td>
              <td>{visitor.outTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousVisitors;

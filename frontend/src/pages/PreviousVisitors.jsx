import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css';
import '../styles/all.css';

import { useCookies } from 'react-cookie';

const PreviousVisitors = () => {
  const [previousVisitors, setPreviousVisitors] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [cookies] = useCookies(['token']);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = cookies.token;

    if (token) {
      axios
        .get('http://localhost:3001/visitor/previous', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPreviousVisitors(response.data);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading to false in case of an error
        });
    } else {
      // Handle unauthorized access
      setLoading(false); // Set loading to false when there's no token
    }
  }, [cookies]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const token = cookies.token;
    // Fetch visitors based on the search query
    axios.get(`http://localhost:3001/visitor/search/v?q=${e.target.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setPreviousVisitors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h2>Previous Visitors</h2>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={handleSearch} 
      />
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
          {Array.isArray(previousVisitors) ? ( // Display a loading message when data is being fetched
           
            previousVisitors
            .filter(visitor => visitor.outTime != "")
            .map((visitor) => (
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
            ))
          )
            : <tr>
            <td colSpan="8">Loading...</td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  );
};

export default PreviousVisitors;

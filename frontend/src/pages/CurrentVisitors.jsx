
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css' ; 
import '../styles/all.css';
import { useCookies } from 'react-cookie';
const CurrentVisitors = () => {
  const [currentVisitors, setCurrentVisitors] = useState([]);
  const [cookies] = useCookies(['token']);
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
    const token = cookies.token;
    if(token){
      axios.get('http://localhost:3001/visitor/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCurrentVisitors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  }, []);

  return (
    <div>
      <h2>Currently Inside Campus</h2>
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
            <th>Checkout</th>

          </tr>
        </thead>
        <tbody>
          {currentVisitors.map((visitor) => (
            <tr key={visitor._id}>
              <td>{visitor.name}</td>
              <td>{visitor.mobileNo}</td>
              <td>{visitor.whomToMeet}</td>
              <td>{visitor.date.split('T')[0]}</td>
              <td>{visitor.comingFrom}</td>
              <td>{visitor.vehicleNo}</td>
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

export default CurrentVisitors;


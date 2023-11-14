import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/visitors.css' ; 
import '../styles/all.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const CurrentVisitors = () => {
  const [currentVisitors, setCurrentVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

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
        const updatedVisitors = currentVisitors.map(visitor =>
          visitor._id === visitorId ? { ...visitor, outTime } : visitor
        );
        setCurrentVisitors(updatedVisitors);
        console.log('Visitor checked out:', response.data);
      })
      .catch((error) => {
        console.error('Error checking out visitor:', error);
      });
  };
  
  const notify = (name, mobileNo) => {
    alert(`The visitor ${name} , ${mobileNo} has exceeded the allotted time!`);
  };

  const checkOutTime = async () => {
    try {
      const currentDateTime = new Date();
      const token = cookies.token;
  
      const response = await axios.get('http://localhost:3001/visitor/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      response.data.forEach((visitor) => {
        const name = visitor.name;
        const visitorInDateTime = new Date(visitor.datetime);
        // Check if the visitor has an empty or null outTime
        if (visitor.outTime === "" || visitor.outTime === null) {
          // Check if the visitor has a timestamp
          if (visitor.timestamp != null) {
            const visitorDuration = (currentDateTime - visitorInDateTime) / (1000 * 60); // Calculate time difference in minutes
            const timeAllotted = visitor.timestamp; // Use the timestamp from the database
            const mobileNo = visitor.mobileNo ; 
            if (visitorDuration > timeAllotted) {
              notify(name,mobileNo);
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching current visitors:', error);
    }
  };
  

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
        setCurrentVisitors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const token = cookies.token;
    if (token) {
      // Fetch current visitors
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
    } else {
      navigate('/login');
    }

    const interval = setInterval(() => {
      checkOutTime();
    }, 60000); // 60000 milliseconds is equal to one minute

    return () => clearInterval(interval);
  }, [cookies.token, navigate]);

 

  return (
    <div>
      <h2>Currently Inside Campus</h2>

      <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={handleSearch} 
      />

      {/* Table to display visitors */}
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
        {currentVisitors
          .filter(visitor => visitor.outTime === "") // Filter visitors with empty outTime
          .map(visitor => (
            <tr key={visitor._id}>
           <td>{visitor.name}</td>
           <td>{visitor.mobileNo}</td>
           <td>{visitor.whomToMeet}</td>
           <td>{visitor.date.split('T')[0]}</td>
           <td>{visitor.comingFrom}</td>
           <td>{visitor.vehicleNo}</td>
           <td>{visitor.inTime}</td>
           <td>
            <button onClick={() => handleCheckout(visitor._id)} className="customButton">Checkout</button>
          </td>


         </tr>
          ))
        }
      </tbody>
       
      </table>
    </div>
  );
};

export default CurrentVisitors;

  




/*
const CurrentVisitors = () => {
  const [currentVisitors, setCurrentVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cookies] = useCookies(['token']);
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
          const updatedVisitors = currentVisitors.map(visitor =>
            visitor._id === visitorId ? { ...visitor, outTime } : visitor
          );
          setCurrentVisitors(updatedVisitors);
          console.log('Visitor checked out:', response.data);
        })
        .catch((error) => {
          console.error('Error checking out visitor:', error);
        });
    };

   
    const VisitorAlert = () => {
      const notify = () => {
        // Define how the notification will be shown
        // This can be a toast, a modal, or any alert component
        alert('The visitor has exceeded the allotted time!');
      };
    
      const checkOutTime = async () => {
        try {
          const currentDateTime = new Date();
          const outTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
          const response = await axios.get('http://localhost:3001/visitor/current'); // Fetch current visitors data
          
          // Consider looping through response.data (assuming the data holds visitor details)
          response.data.forEach(visitor => {
            const visitorInTime = new Date(visitor.inTime);
            const visitorDuration = (currentDateTime - visitorInTime) / (1000 * 60); // Calculate time difference in minutes
    
            const timeAllotted = 60; // Replace with the allotted time in minutes
            if (visitorDuration > timeAllotted) {
              notify();
              // You may add more actions here, like sending an email or other API calls
            }
          });
        } catch (error) {
          console.error(error);
        }
      };


  useEffect(() => {
    const token = cookies.token;
    if (token) {
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
    else {
      navigate('/login');
    }
    const interval = setInterval(() => {
      checkOutTime();
    }, 60000);
  
    return () => clearInterval(interval);
  },
   [cookies.token, navigate]);

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
        setCurrentVisitors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
*/
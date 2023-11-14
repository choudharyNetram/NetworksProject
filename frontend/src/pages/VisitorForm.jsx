import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/all.css';
import '../styles/visitorform.css';

const VisitorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    comingFrom: '',
    vehicleNo: '',
    whomToMeet: '',
    timestamp: '', // Assuming you want to collect time in minutes
    inTime: '',   // Change to 24-hour format, e.g., "14:30"
    outTime: '', 
    
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
  // Convert timestamp to a number
    let timestamp = parseFloat(formData.timestamp);
    if (isNaN(timestamp) || timestamp == null) {
      timestamp = 60 * 24; // Default to 24 hours (1440 minutes)
    }
    // Get the current date and time
    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toISOString().split('T')[0];
    const currentTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create a data object to send to the server
    const data = {
      date: formattedDate,
      inTime: currentTime,   // Change to 24-hour format, e.g., "14:30"
      name: formData.name,
      mobileNo: formData.mobileNo,
      comingFrom: formData.comingFrom,
      vehicleNo: formData.vehicleNo,
      whomToMeet: formData.whomToMeet,
      timestamp:timestamp,
      outTime: '', 
      datetime: currentDateTime , 
    };

    // Send a POST request to the server
    axios
      .post('http://localhost:3001/visitor/add-visitor', data)
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
  }, [formData.timestamp, notification]);

 
  return (
    <div className="form-container">
      <h2>Visitor Information Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Your form fields go here */}
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
          <label>Coming From</label>
          <input
            type="text"
            name="comingFrom"
            value={formData.comingFrom}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Vehicle No</label>
          <input
            type="text"
            name="vehicleNo"
            value={formData.vehicleNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Whom to Meet</label>
          <input
            type="text"
            name="whomToMeet"
            value={formData.whomToMeet}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label> Allocate time to stay in campus (in minutes) </label>
          <input
            type="number"
            name="timestamp"
            value={formData.timestamp}
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

export default VisitorForm;

/*import React, { useState } from 'react';
import axios from 'axios';
import '../styles/all.css';
import '../styles/visitorform.css' ; 
const VisitorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    comingFrom: '',
    vehicleNo: '',
    whomToMeet: '',
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
      time: currentTime,
      name: formData.name,
      mobileNo: formData.mobileNo,
      comingFrom: formData.comingFrom,
      vehicleNo: formData.vehicleNo,
      whomToMeet: formData.whomToMeet,
      inTime: currentTime,   // Use the user's input
      outTime: "", // Use the user's input
    };

    // Send a POST request to the server
    axios
      .post('http://localhost:3001/visitor/add-visitor', data)
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
      <h2>Visitor Information Form</h2>
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
          <label>Coming From</label>
          <input
            type="text"
            name="comingFrom"
            value={formData.comingFrom}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Vehicle No</label>
          <input
            type="text"
            name="vehicleNo"
            value={formData.vehicleNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Whom to Meet</label>
          <input
            type="text"
            name="whomToMeet"
            value={formData.whomToMeet}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label> Allocate time to stay in campus(in minutes) </label>
          <input
            type="text"
            name="timestamp"
            value={formData.timestamp}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VisitorForm;

*/
/*import React, { useState } from 'react';

const VisitorForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    mobileNo: '',
    comingFrom: '',
    vehicleNo: '',
    whomToMeet: '',
    inTime: 'AM',
    outTime: 'AM',
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
    // Handle form submission here
    console.log(formData);
    // You can send this data to your server or perform other actions.
  };

  return (
    <div className="form-container">
      <h2>Visitor Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="name"
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
        </div>

        <div className="form-group">
          <label>Coming From</label>
          <input
            type="text"
            name="comingFrom"
            value={formData.comingFrom}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Vehicle No.</label>
            <input
              type="text"
              name="vehicleNo"
              value={formData.vehicleNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Whom to Meet</label>
            <input
              type="text"
              name="whomToMeet"
              value={formData.whomToMeet}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>In Time</label>
            <input
              type="time"
              name="inTime"
              value={formData.inTime}
              onChange={handleChange}
            />
            <select name="inTime" onChange={handleChange}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        <div className="form-group">
            <label>Out Time</label>
            <input
              type="time"
              name="outTime"
              value={formData.outTime}
              onChange={handleChange}
            />
            <select name="outTime" onChange={handleChange}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
  </div>  
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VisitorForm;
*/
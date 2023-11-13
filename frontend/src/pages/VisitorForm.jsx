import React, { useState } from 'react';
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VisitorForm;


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
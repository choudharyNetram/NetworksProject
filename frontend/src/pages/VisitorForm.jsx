import React, { useState } from 'react';

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
        {  /*   <div className="form-group">
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
  </div>  */} 
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VisitorForm;

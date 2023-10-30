import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the backend
    axios.get('http://localhost:3001/visitor/add-visitor')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Data Set of Visitors</h2>
      <div style={{ height: '20px' }} />

      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Coming From</th>
            <th>Vehicle No.</th>
            <th>Whom to Meet</th>
            <th>In Time</th>
            <th>Out Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="table-row">
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td>{item.mobileNo}</td>
              <td>{item.comingFrom}</td>
              <td>{item.vehicleNo}</td>
              <td>{item.whomToMeet}</td>
              <td>{item.inTime}</td>
              <td>{item.outTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay1;

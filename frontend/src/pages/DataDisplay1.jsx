import React from 'react';

const DataDisplay1 = ({ data }) => {
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

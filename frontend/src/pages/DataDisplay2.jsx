import React from 'react';

const DataDisplay2 = ({ data }) => {
  return (
    <div>
      <h2>Data Set 2</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Address</th>
            <th>Student Name</th>
            <th>Student Mobile No.</th>
            <th>Department</th>
            <th>Hostel Room No.</th>
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
              <td>{item.address}</td>
              <td>{item.studentName}</td>
              <td>{item.studentMobileNo}</td>
              <td>{item.department}</td>
              <td>{item.hostelRoomNo}</td>
              <td>{item.inTime}</td>
              <td>{item.outTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay2;

import React, { useState, useEffect } from 'react';
import DataDisplay1 from './DataDisplay1';
import DataDisplay2 from './DataDisplay2';

const MainComponent = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  // Generate random data for data1
  useEffect(() => {
    const generateRandomData = () => {
      const randomData = [];
      for (let i = 0; i < 5; i++) {
        randomData.push({
          date: '2023-10-14',
          name : "Pankaj Singh" , 
          mobileNo: `+919865568541${i}`,
          comingFrom: `Location ${i}`,
          vehicleNo: `GJ 1234${i}`,
          whomToMeet: `Person ${i}`,
          inTime: '1.00 PM',
          outTime: '-',
        });
      }
      for (let i = 0; i < 10; i++) {
        randomData.push({
          date: '2023-10-14',
          name: 'Rahul Patel' , 
          mobileNo: `+918965533541${i}`,
          comingFrom: `Location ${i}`,
          vehicleNo: `GJ 1234${i}`,
          whomToMeet: `Person ${i}`,
          inTime: '11.00 AM',
          outTime: '4:00 PM',
        });
      }
      return randomData;
    };

    const simulatedData1 = generateRandomData();
    setData1(simulatedData1);
  }, []);

  // Generate random data for data2
  useEffect(() => {
    const generateRandomData = () => {
      const randomData = [];
      for (let i = 0; i < 5; i++) {
        randomData.push({
          date: '2023-10-14',
          name: `Name ${i}`,
          mobileNo: `+919865568541${i}`,
          address: `Address ${i}`,
          studentName: `Student ${i}`,
          studentMobileNo: `+917877568541${i}`,
          department: `Department ${i}`,
          hostelRoomNo: `Room ${i}`,
          inTime: '10:00 AM',
          outTime: '-',
        });
      }
      for (let i = 0; i < 10; i++) {
        randomData.push({
          date: '2023-10-14',
          name: `Name ${i}`,
          mobileNo: `+919186574141${i}`,
          address: `Address ${i}`,
          studentName: `Student ${i}`,
          studentMobileNo: `+918956568541${i}`,
          department: `Department ${i}`,
          hostelRoomNo: `Room ${i}`,
          inTime: '10:00 AM',
          outTime: '5:00 PM',
        });
      }
      return randomData;
    };

    const simulatedData2 = generateRandomData();
    setData2(simulatedData2);
  }, []);

  return (
    <div>
      <DataDisplay1 data={data1} />
     { /*  <DataDisplay2 data={data2} />  */} 
    </div>
  );
};

export default MainComponent;

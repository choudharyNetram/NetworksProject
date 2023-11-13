
const express = require('express');
const router = express.Router();
const Visitor = require('../Models/VisitorsModel'); // Import the Visitor model
const studentVisitor = require('../Models/StudentVisitor'); // Import the Visitor model
const { userVerification } = require('../Middlewares/NewVisitor'); // Import the admin cookie verification middleware


const visitor = require('../Controllers/NewVisitors'); // Create this admin controller if not already done

// Visitor registration route, no admin authentication needed
router.post('/add-visitor', visitor.addVisitor);
router.post('/add-student-visitor', visitor.addStudentVisitor);

/*
router.get('/search', async (req, res) => {
  const searchParams = req.query;

  try {
    const searchCriteria = {};

    // Loop through query parameters and build the search criteria
    Object.keys(searchParams).forEach((param) => {
      if (studentVisitor.schema.obj[param]) {
        // Check if the parameter is a valid field in the schema
        searchCriteria[param] = { $regex: new RegExp(searchParams[param], 'i') };
      }
    });

    const results = await studentVisitor.find(searchCriteria);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
*/


  
// Get current visitors - Requires admin authentication
router.get('/current',userVerification, async (req, res) => {
    try {
        const currentVisitors = await Visitor.find({ outTime: '' }); // Visitors with no outTime
        res.json(currentVisitors);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

// Get previous visitors - Requires admin authentication
router.get('/previous',userVerification,  async (req, res) => {
    try {
        const previousVisitors = await Visitor.find({ outTime: { $ne: '' } }); // Visitors with outTime
        res.json(previousVisitors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
   
});

// Get current visitors - Requires admin authentication
router.get('/student-current',userVerification, async (req, res) => {
  try {
    const currentStudentVisitors = await studentVisitor.find({ outTime: '' }); // Visitors with no outTime
    res.json(currentStudentVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 
);


// Get previous student visitors - Requires user authentication
router.get('/student-previous', userVerification, async (req, res) => {
  try {
    const previousStudentVisitors = await studentVisitor.find({ outTime: { $ne: '' } });
    res.json(previousStudentVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Define the route for visitor checkout

router.put('/checkout/:visitorId',async (req, res) => {
    try {
        const { visitorId } = req.params;

        // Find the visitor in the database by ID
        const visitor = await Visitor.findById(visitorId);
        const stdVisitor = await studentVisitor.findById(visitorId) ; 
        if (!(visitor || stdVisitor)) {
        return res.status(404).json({ message: 'Visitor not found' });
        }

        // Get the current date and time
        const currentDateTime = new Date();
        const outTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Update the visitor's outTime
        if(visitor){
          visitor.outTime = outTime;
          await visitor.save();
        }

        if(stdVisitor) {
          stdVisitor.outTime = outTime;
          await stdVisitor.save();
        }
        // Save the changes to the database
        res.status(200).json({ message: 'Visitor checked out successfully', visitor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error checking out visitor', error: error.message });
    }
});



module.exports = router;

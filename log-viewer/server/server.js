/**
 * Create an Express app and start the server on port 5000.
 * @param {number} port - The port number to start the server on.
 */
// Import the 'express' module and create a new Express app
const express = require('express')
const app = express()

// Define the port number to start the server on
const port = 5000

// Start the server and log a message to the console when it starts
app.listen(port, () => {
    console.log("Server started on port 5000")
  })

  // Import the 'fs' module for working with the file system
 var fs = require('fs')
   // , es = require('event-stream');

      /**
 * Import the 'fs' module and define two endpoints for the Express app.
 * The first endpoint streams data from a log file to the response.
 * The second endpoint returns a JSON object with some test data.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the request-response cycle.
 */
// Define an endpoint for streaming data from a log file
app.get('/getLogData', (req, res, next) => {
  // Create a readable stream from the log file
  const fileStream = fs.createReadStream('./testfile.log'
  );
  fileStream.on('open', () => {
    // Set the response content type to 'application/json' and attachment file name to 'streamed-testfile.json'
    res.attachment('streamed-testfile.json');
    // Stream the file contents to the response object
    fileStream.pipe(res);
  });
  // Handle any errors that occur while reading the file
  fileStream.on('error', err => {
    next(err);
  });
});


// Define an endpoint for returning test data as a JSON object
app.get('/testapi', (req, res) => {
   // Send a JSON response with test data
  res.json({"step":"META","tags":["saas","prod"],"msg":"Loaded existing data for 'Model_ResourceProductGroup'","keyValues":{"runId":"cd18b3aa32e1a16f32a6d22d3f674eadcd5de378","tenant":"vth","flowPath":"vth\/importHazMatIpca","timestamp":"2022-12-24T05:50:07+01:00","identRule":"number","numOfDataset":122,"elapsedSec":0.01665210723876953}})
})

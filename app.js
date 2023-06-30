const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000; // Update the port number if needed

// Enable CORS
app.use(cors());

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'njokoth',
  host: 'localhost',
  database: 'hairbysloane',
  password: 'thisisforresearch',
  port: 5432, // Update the port number
});


pool.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
  } else {
    console.log('Connected to the database.');
  }
});

// Parse JSON bodies
app.use(express.json());

// Handle form submission
app.post('/saveAvailability', (req, res) => {
  const availability = req.body.availability;
  const timeRange = req.body.timeRange;

  // Save the form data to the database
  const query = 'INSERT INTO availability (availability, time_range) VALUES ($1, $2)';
  pool.query(query, [availability, timeRange], (error, results) => {
    if (error) {
      console.error('Error saving availability: ', error);
      res.sendStatus(500); // Internal Server Error
    } else {
      console.log('Availability saved successfully.');
      res.sendStatus(200); // OK
    }
  });
});

// Handle GET request to the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!'); // Send a simple response
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
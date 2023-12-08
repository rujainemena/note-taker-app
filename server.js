const express = require('express');
const path = require('path');
const api = require('./routes/index.js'); // second piece can be found here

// server ID
const PORT = process.env.PORT || 3001;

const app = express();

// client -> middleware (pre-processing) -> server
// Import custom middleware, "cLog"

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to modulize api routes
// http://localhost:3001/api --- api base, first piece, which needs to connect to the second piece
app.use('/api', api);

// middleware to make the homepage public
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to home page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
